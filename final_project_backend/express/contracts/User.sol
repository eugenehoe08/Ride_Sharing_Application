// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract User {
  struct UserStruct {
      string name;
      bool driver;
      int rating;
      int noOfRatingTransactions;
      string carType;
      string licensePlate;
  }

    struct TransactionStruct {
        address party;
        string origin;
        string destination;
        uint256 price;
        bool driver;
    }

    mapping(address => UserStruct) userData;
    mapping(address => TransactionStruct[]) transactionHistory;

    function deposit() public payable {

    }

    modifier onlyPassenger() {
        require(msg.sender == !userData[msg.sender].driver);
        _;
    }

    function getUserInfo(address _wallet) public view returns (UserStruct memory) {
        return userData[_wallet];
    }

    function setUserData(string memory _name, bool _driver) public {
        userData[msg.sender] = UserStruct(_name, _driver, 0, 0, '', '');
    }

    function setDriverData(string memory _name, bool _driver, string memory _carType, string memory _licensePlate) public {
        userData[msg.sender] = UserStruct(_name, _driver, 0, 0, _carType, _licensePlate);
    }

    function getAllTransactions() public view returns (TransactionStruct[] memory) {
        return transactionHistory[msg.sender];
    }

    function addTransaction(address payable _party, string memory _origin, string memory _destination, uint256 _price, bool _driver, int _rating) public payable onlyPassenger {
        if (_rating != 0) {
            userData[_party].rating += _rating;
            userData[_party].noOfRatingTransactions++;
        }

        _party.transfer(msg.value);

        transactionHistory[msg.sender].push(TransactionStruct(_party, _origin, _destination, _price, _driver));
        transactionHistory[_party].push(TransactionStruct(msg.sender, _origin, _destination, _price, !_driver));
    }


}