const UserContract = artifacts.require("./User.sol");

module.exports = function(deployer) {
	// deployment steps
	deployer.deploy(UserContract);
};