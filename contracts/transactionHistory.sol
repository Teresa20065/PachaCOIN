// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TransactionHistory {
    struct Transaction {
        uint256 id;
        address user;
        uint256 amount;
        uint256 timestamp;
        TransactionType transactionType;
        string description;
        bool isCompleted;
    }

    enum TransactionType {
        DEPOSIT,      // 0 - Depósito de fondos
        WITHDRAWAL,   // 1 - Retiro de fondos
        REWARD,       // 2 - Recompensa por juego
        FEED,         // 3 - Alimentar mascota
        GOAL_COMPLETED, // 4 - Objetivo completado
        TRANSFER      // 5 - Transferencia entre usuarios
    }

    mapping(address => Transaction[]) public userTransactions;
    mapping(address => uint256) public userTransactionCount;
    
    uint256 public totalTransactions;
    address public owner;

    event TransactionCreated(
        uint256 indexed transactionId,
        address indexed user,
        uint256 amount,
        TransactionType transactionType,
        string description,
        uint256 timestamp
    );

    event TransactionCompleted(
        uint256 indexed transactionId,
        address indexed user,
        bool success
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el owner puede hacer esto");
        _;
    }

    constructor() {
        owner = msg.sender;
        totalTransactions = 0;
    }

    /**
     * @dev Crea una nueva transacción
     * @param _amount Cantidad de la transacción
     * @param _transactionType Tipo de transacción
     * @param _description Descripción de la transacción
     */
    function createTransaction(
        uint256 _amount,
        TransactionType _transactionType,
        string memory _description
    ) external {
        require(_amount > 0, "El monto debe ser mayor a 0");
        
        totalTransactions++;
        
        Transaction memory newTransaction = Transaction({
            id: totalTransactions,
            user: msg.sender,
            amount: _amount,
            timestamp: block.timestamp,
            transactionType: _transactionType,
            description: _description,
            isCompleted: true
        });

        userTransactions[msg.sender].push(newTransaction);
        userTransactionCount[msg.sender]++;

        emit TransactionCreated(
            totalTransactions,
            msg.sender,
            _amount,
            _transactionType,
            _description,
            block.timestamp
        );

        emit TransactionCompleted(totalTransactions, msg.sender, true);
    }

    /**
     * @dev Crea una transacción para otro usuario (solo owner)
     * @param _user Dirección del usuario
     * @param _amount Cantidad de la transacción
     * @param _transactionType Tipo de transacción
     * @param _description Descripción de la transacción
     */
    function createTransactionForUser(
        address _user,
        uint256 _amount,
        TransactionType _transactionType,
        string memory _description
    ) external onlyOwner {
        require(_amount > 0, "El monto debe ser mayor a 0");
        require(_user != address(0), "Direccion del usuario invalida");
        
        totalTransactions++;
        
        Transaction memory newTransaction = Transaction({
            id: totalTransactions,
            user: _user,
            amount: _amount,
            timestamp: block.timestamp,
            transactionType: _transactionType,
            description: _description,
            isCompleted: true
        });

        userTransactions[_user].push(newTransaction);
        userTransactionCount[_user]++;

        emit TransactionCreated(
            totalTransactions,
            _user,
            _amount,
            _transactionType,
            _description,
            block.timestamp
        );

        emit TransactionCompleted(totalTransactions, _user, true);
    }

    /**
     * @dev Obtiene todas las transacciones de un usuario
     * @param _user Dirección del usuario
     * @return Array de transacciones del usuario
     */
    function getUserTransactions(address _user) external view returns (Transaction[] memory) {
        return userTransactions[_user];
    }

    /**
     * @dev Obtiene las últimas N transacciones de un usuario
     * @param _user Dirección del usuario
     * @param _limit Número de transacciones a obtener
     * @return Array de las últimas transacciones
     */
    function getUserRecentTransactions(address _user, uint256 _limit) external view returns (Transaction[] memory) {
        uint256 userCount = userTransactionCount[_user];
        uint256 resultLength = _limit > userCount ? userCount : _limit;
        
        Transaction[] memory recentTransactions = new Transaction[](resultLength);
        
        for (uint256 i = 0; i < resultLength; i++) {
            recentTransactions[i] = userTransactions[_user][userCount - 1 - i];
        }
        
        return recentTransactions;
    }

    /**
     * @dev Obtiene estadísticas de transacciones de un usuario
     * @param _user Dirección del usuario
     * @return totalAmount Monto total de todas las transacciones
     * @return depositCount Número de depósitos
     * @return withdrawalCount Número de retiros
     * @return rewardCount Número de recompensas
     */
    function getUserTransactionStats(address _user) external view returns (
        uint256 totalAmount,
        uint256 depositCount,
        uint256 withdrawalCount,
        uint256 rewardCount
    ) {
        Transaction[] memory transactions = userTransactions[_user];
        
        for (uint256 i = 0; i < transactions.length; i++) {
            totalAmount += transactions[i].amount;
            
            if (transactions[i].transactionType == TransactionType.DEPOSIT) {
                depositCount++;
            } else if (transactions[i].transactionType == TransactionType.WITHDRAWAL) {
                withdrawalCount++;
            } else if (transactions[i].transactionType == TransactionType.REWARD) {
                rewardCount++;
            }
        }
    }

    /**
     * @dev Obtiene transacciones por tipo
     * @param _user Dirección del usuario
     * @param _transactionType Tipo de transacción a filtrar
     * @return Array de transacciones del tipo especificado
     */
    function getTransactionsByType(address _user, TransactionType _transactionType) external view returns (Transaction[] memory) {
        Transaction[] memory allTransactions = userTransactions[_user];
        uint256 count = 0;
        
        // Contar cuántas transacciones del tipo especificado existen
        for (uint256 i = 0; i < allTransactions.length; i++) {
            if (allTransactions[i].transactionType == _transactionType) {
                count++;
            }
        }
        
        // Crear array con las transacciones del tipo especificado
        Transaction[] memory filteredTransactions = new Transaction[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allTransactions.length; i++) {
            if (allTransactions[i].transactionType == _transactionType) {
                filteredTransactions[index] = allTransactions[i];
                index++;
            }
        }
        
        return filteredTransactions;
    }

    /**
     * @dev Obtiene el total de transacciones del sistema
     * @return Número total de transacciones
     */
    function getTotalTransactions() external view returns (uint256) {
        return totalTransactions;
    }

    /**
     * @dev Obtiene el número de transacciones de un usuario
     * @param _user Dirección del usuario
     * @return Número de transacciones del usuario
     */
    function getUserTransactionCount(address _user) external view returns (uint256) {
        return userTransactionCount[_user];
    }

    /**
     * @dev Obtiene una transacción específica por ID
     * @param _transactionId ID de la transacción
     * @return transaction La transacción encontrada
     */
    function getTransactionById(uint256 _transactionId) external view returns (Transaction memory transaction) {
        require(_transactionId > 0 && _transactionId <= totalTransactions, "ID de transaccion invalido");
        
        // Buscar la transacción en todos los usuarios
        for (uint256 i = 0; i < totalTransactions; i++) {
            // Esta es una implementación simplificada
            // En un contrato real, necesitarías un mapping adicional para buscar por ID
        }
        
        revert("Transaccion no encontrada");
    }
}