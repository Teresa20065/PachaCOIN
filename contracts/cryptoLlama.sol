// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoLlama {
    struct Llama {
        uint256 id;
        address owner;
        uint256 birthTime;
        uint8 level;
        bool isAlive;
    }

    mapping(address => Llama) public llamas;
    uint256 public llamaCounter;

    event LlamaCreated(address indexed owner, uint256 id);
    event LlamaFed(address indexed owner, uint8 newLevel);
    event LlamaDied(address indexed owner);

    function createLlama() external {
        require(llamas[msg.sender].owner == address(0), "Ya tienes una llama");

        llamaCounter++;
        llamas[msg.sender] = Llama({
            id: llamaCounter,
            owner: msg.sender,
            birthTime: block.timestamp,
            level: 1,
            isAlive: true
        });

        emit LlamaCreated(msg.sender, llamaCounter);
    }

    function feedLlama() external {
        Llama storage llama = llamas[msg.sender];
        require(llama.isAlive, "Tu llama ha muerto");
        require(llama.owner != address(0), "No tienes una llama");

        llama.level++;
        emit LlamaFed(msg.sender, llama.level);
    }

    function killLlama() external {
        Llama storage llama = llamas[msg.sender];
        require(llama.owner != address(0), "No tienes una llama");
        llama.isAlive = false;

        emit LlamaDied(msg.sender);
    }

    function getMyLlama() external view returns (Llama memory) {
        return llamas[msg.sender];
    }
}