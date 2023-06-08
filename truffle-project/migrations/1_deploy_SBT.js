//const sbt = artifacts.require("SBT");

//module.exports = function(deployer) {
//	deployer.deploy(sbt);
//};
var SBT = artifacts.require("SBT");

module.exports = function(deployer) {
 deployer.deploy(SBT).then(function(instance) {
 console.log("MyContract address: " + instance.address);
 const SBTInstance = SBT.deployed();
 module.exports.address = SBTInstance.address;
  });
};

