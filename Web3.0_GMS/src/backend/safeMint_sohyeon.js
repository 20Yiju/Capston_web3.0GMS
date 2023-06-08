import Web3 from 'web3';
import contract from '@truffle/contract'; // 변경된 import 문

import sbtArtifact from '../contracts/SBT.json';

export async function safeMinting(ipfs_hash, toAccount) {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://ec2-3-39-98-70.ap-northeast-2.compute.amazonaws.com:8545'));

  const sbtContract = contract(sbtArtifact);
  sbtContract.setProvider(web3.currentProvider);

  const instance = await sbtContract.deployed();

  const receipt = await instance.safeMint(toAccount, `https://ipfs.io/ipfs/${ipfs_hash}`, { from: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', gas: 3000000 });

  return receipt.logs[0].args.tokenId.toNumber();
};

