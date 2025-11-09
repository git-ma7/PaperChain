from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from web3 import Web3
from pathlib import Path
import requests
import openpyxl
import io

w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
CONTRACT_ADDRESS_1 = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
ABI_PATH_1 = Path(__file__).resolve().parent / "ElectionManager.json"

CONTRACT_ADDRESS_2 = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
ABI_PATH_2 = Path(__file__).resolve().parent / "ShareholderRegistry.json"

with open(ABI_PATH_1) as f:
    data = json.load(f)
    ABI1 = data["abi"] if "abi" in data else data

with open(ABI_PATH_2) as f:
    data = json.load(f)
    ABI2 = data["abi"] if "abi" in data else data


contract1 = w3.eth.contract(address=CONTRACT_ADDRESS_1, abi=ABI1)
contract2 = w3.eth.contract(address=CONTRACT_ADDRESS_2, abi=ABI2)

address = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
checksum_address = Web3.to_checksum_address(address)

@method_decorator(csrf_exempt,name='dispatch')
class AddShareholders(APIView):  
    def post(self,request,format=None):
        names = request.data.get('names')
        wallets = request.data.get('wallets')
        shares = request.data.get('shares')

        try:
            contract2.functions.addShareholdersBulk(names,wallets,shares).call()
            return Response(
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(str(e),
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@method_decorator(csrf_exempt, name='dispatch')
class AddCandidates(APIView):
    def post(self, request, format=None):
        names = request.data.get('names')
        wallets = request.data.get('wallets')

        try:
            tx_hash = contract1.functions.bulkRegisterCandidates(names, wallets).transact({
                'from': checksum_address
            })
            receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
            return Response({"status": "ok", "txHash": receipt.transactionHash.hex()})
        except Exception as e:
            return Response({"error": str(e)}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class CreateElection(APIView):
    def post(self, request, format=None):
        wallets = request.data.get('wallets')
        startTime = int(request.data.get('startTime'))
        endTime = int(request.data.get('endTime'))

        try:
            # get owner account
            owner = w3.eth.accounts[0]

            # send transaction
            tx_hash = contract1.functions.createElectionFromRegisteredCandidates(
                wallets, startTime, endTime
            ).transact({'from': owner})

            # wait for confirmation
            receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

            # extract the event log
            logs = contract1.events.ElectionCreated().process_receipt(receipt)
            if logs and len(logs) > 0:
                eid = logs[0]['args']['electionId']
            else:
                eid = None
            print(eid)
            return Response(
                {"electionId": eid, "txHash": tx_hash.hex()},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            print("Error while creating election:", e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@method_decorator(csrf_exempt,name='dispatch')
class StartElection(APIView):  
    def post(self,request,format=None):
        electionId = request.data.get('eid')
        print(f"Starting: {electionId}")

        try:
            # get owner account
            owner = w3.eth.accounts[0]

            # send transaction
            tx_hash = contract1.functions.startElection(
                electionId
            ).transact({'from': owner})
            return Response(
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(str(e),
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@method_decorator(csrf_exempt,name='dispatch')
class EndElection(APIView):  
    def post(self,request,format=None):
        electionId = request.data.get('eid')
        print(f"Ending: {electionId}")

        try:
            contract1.functions.endElection(electionId).call()
            return Response(
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(str(e),
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@method_decorator(csrf_exempt,name='dispatch')
class CastVote(APIView):  
    def post(self,request,format=None):
        electionId = request.data.get('eid')
        candidateId = request.data.get('cid')

        try:
            contract1.functions.castVote(electionId,candidateId).call()
            return Response(
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(str(e),
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@method_decorator(csrf_exempt, name='dispatch')
class GetCandidates(APIView):
    def get(self, request, format=None):
        cid = request.GET.get("cid")
        if not cid:
            return Response({"error": "CID not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ipfs_url = f"http://127.0.0.1:8080/ipfs/{cid}"
            res = requests.get(ipfs_url)
            res.raise_for_status()

            # Parse Excel file directly from memory
            file_stream = io.BytesIO(res.content)
            workbook = openpyxl.load_workbook(file_stream)
            sheet = workbook.active

            # Convert Excel rows to JSON
            data = []
            headers = [cell.value for cell in sheet[1]]
            for row in sheet.iter_rows(min_row=2, values_only=True):
                row_dict = dict(zip(headers, row))
                data.append(row_dict)

            return Response({"candidates": data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)