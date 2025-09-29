from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.conf import settings
from moralis import auth
import datetime
import re
import json


api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImE4NzEzM2ZiLWI2MjUtNDhmNC1iYjQ4LTUxNGFlYjBiZTk0MCIsIm9yZ0lkIjoiNDcyNzk4IiwidXNlcklkIjoiNDg2Mzc5IiwidHlwZUlkIjoiNzlmNzMwMDQtNjM5YS00MTBmLWE2MGQtN2JmYzZlNWFmOTJkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTkwNTA3NTEsImV4cCI6NDkxNDgxMDc1MX0.ApkyfjhM0Xja0GIe6WjDWxJ33Sn4rAym7UuVM85mLVU"

def is_valid_ethereum_address(address):
    return bool(re.match(r'^0x[a-fA-F0-9]{40}$', address))

@method_decorator(csrf_exempt, name='dispatch')
class RequestChallenge(APIView):
    def post(self, request, format=None):
        chain = request.data.get('chain')
        address = request.data.get('address')

        if not chain or not address:
            return Response(
                {"error": "chain and address are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not is_valid_ethereum_address(address):
            return Response(
                {"error": "Invalid Ethereum address"},
                status=status.HTTP_400_BAD_REQUEST
            )

        body = {
            'domain': 'paper-chain.dapp',
            'chainId': chain,
            'address': address,
            'statement': 'Do you want to connect to PaperChain?',
            'uri': 'https://paperchain.dapp/',
            'expirationTime': (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=2)).isoformat().replace('+00:00', 'Z'),
            'notBefore': datetime.datetime.now().isoformat().__add__('Z'),
            'resources': ["https://docs.moralis.io/"],
            'timeout': 120  # Timeout in seconds`
        }
        print("Sending to Moralis:\n", json.dumps(body, indent=2))

        try:
            result = auth.challenge.request_challenge_evm(
                api_key=api_key,
                body=body
            )
            return Response(result)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@method_decorator(csrf_exempt, name='dispatch')
class VerifyChallenge(APIView):
    def post(self, request, format=None):
        message = request.data.get('message')
        signature = request.data.get('signature')

        if not message or not signature:
            return Response(
                {"error": "message and signature are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        body = {
            'message': message,
            'signature': signature
        }

        try:
            result = auth.challenge.verify_challenge_evm(
                api_key=api_key,
                body=body
            )
            return Response(result)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )