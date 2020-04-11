const League = artifacts.require("League");
const GolfDataOracle = artifacts.require("GolfDataOracle");

module.exports = function(deployer) {
  deployer.deploy(League);
  deployer.deploy(GolfDataOracle);
};
