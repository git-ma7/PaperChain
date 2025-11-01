from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from web3 import Web3
from pathlib import Path


w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
CONTRACT_ADDRESS_1 = ""
ABI_PATH_1 = Path(__file__).resolve().parent / "ElectionManager.json"

CONTRACT_ADDRESS_2 = ""
ABI_PATH_2 = Path(__file__).resolve().parent / "ShareholderRegistry.json"

with open(ABI_PATH_1) as f:
    data = json.load(f)
    ABI1 = data["abi"] if "abi" in data else data

with open(ABI_PATH_2) as f:
    data = json.load(f)
    ABI2 = data["abi"] if "abi" in data else data


contract1 = w3.eth.contract(address=CONTRACT_ADDRESS_1, abi=ABI1)
contract2 = w3.eth.contract(address=CONTRACT_ADDRESS_2, abi=ABI2)

@method_decorator(csrf_exempt,name='dispatch')
class AddShareholders(APIView):  
    def post(self,request,format=None):
        names = request.data.get('names')
        wallets = request.data.get('wallets')
        shares = request.data.get('shares')

        try:
            contract2.functions.startElection(names,wallets,shares).call()
            return Response(
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(str(e),
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt,name='dispatch')
class CreateElection(APIView):  
    def post(self,request,format=None):
        title = request.data.get('title')
        wallets = request.data.get('wallets')
        startTime = request.data.get('startTime')
        endTime = request.data.get('endTime')

        try:
            eid = contract1.functions.createElectionFromRegisteredCandidates(title,wallets,startTime,endTime).call()
            return Response(
                eid,status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(str(e),
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt,name='dispatch')
class StartElection(APIView):  
    def post(self,request,format=None):
        electionId = request.data.get('eid')

        try:
            contract1.functions.startElection(electionId).call()
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