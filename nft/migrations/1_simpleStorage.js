var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var nft = artifacts.require("./NftMarketplace.sol");
module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(nft);
};