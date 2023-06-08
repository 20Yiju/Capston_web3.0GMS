import Web3 from 'web3';
import contract from 'truffle-contract';
import sbtArtifact from '../contracts/SBT.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://ec2-3-39-98-70.ap-northeast-2.compute.amazonaws.com:8545'));

export async function getTokenURI(ownerAddress) {
  try {
    const sbt = contract(sbtArtifact);
    sbt.setProvider(web3.currentProvider);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = sbtArtifact.networks[networkId];
    const sbtInstance = await sbt.at(deployedNetwork.address);

    const tokenIds = await sbtInstance.getTotalTokenIdFromOwner(ownerAddress);
    console.log("toeknIds: ", tokenIds);
    const uriPromises = tokenIds.map((tokenId) => sbtInstance.tokenURI(tokenId));

    const uris = await Promise.all(uriPromises);
    console.log("uris in gettokenURI: ", uris);
    return uris;
  } catch (error) {
    console.log(error);
  }
}

//export default getTokenURI;

