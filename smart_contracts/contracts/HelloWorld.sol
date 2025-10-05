pragma solidity ^0.8.28;

contract HelloWorld {
    string public greet = "Hello, People!";

    function setGreeting(string memory _greeting) public{
        greet = _greeting;
    }
}