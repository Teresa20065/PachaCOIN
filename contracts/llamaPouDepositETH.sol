// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LlamaPouDepositETH {
    address public owner;

    struct User {
        uint256 totalDeposited;
        uint256 lastInteraction;
    }

    mapping(address => User) public users;

    event Fed(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el owner puede hacer esto");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Alimentar a la llama con ETH
    function feedLlama() external payable {
        require(msg.value > 0, "Debes enviar ETH");

        users[msg.sender].totalDeposited += msg.value;
        users[msg.sender].lastInteraction = block.timestamp;

        emit Fed(msg.sender, msg.value);
    }

    // Ver total depositado por un usuario
    function getDeposited(address user) external view returns (uint256) {
        return users[user].totalDeposited;
    }

    // Retirar únicamente el dinero depositado por el usuario
    function withdrawMyDeposit() external {
        uint256 amount = users[msg.sender].totalDeposited;
        require(amount > 0, "No tienes depositos para retirar");

        users[msg.sender].totalDeposited = 0;
        payable(msg.sender).transfer(amount);

        emit Withdraw(msg.sender, amount);
    }

    // El dueño puede retirar fondos restantes en el contrato (no asignados a usuarios)
    function withdrawRemainingFunds() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        payable(owner).transfer(contractBalance);

        emit Withdraw(owner, contractBalance);
    }

    // Ver saldo total del contrato
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}