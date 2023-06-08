import Web3 from 'web3';
//import User from '../shareInfo/userInfo';

export function safeMinting(ipfs_hash, toAccount) {
        //console.log(ipfs_hash);
//        console.log(toAccount);
	//const user = User.getInstance();
	//const account = user.account;
	//console.log(account);
        const web3 = new Web3(new Web3.providers.HttpProvider('http://ec2-3-39-98-70.ap-northeast-2.compute.amazonaws.com:8545'));
        //console.log(web3);
        const contract = require("truffle-contract")
        const sbtArtifact = require('../contracts/SBT.json');

        const sbtContract = contract(sbtArtifact);
        sbtContract.setProvider(web3.currentProvider);

        // Get the deployed contract instance
        sbtContract.deployed().then((instance) => {
  
        // Call the safeMint() method with the `from` option
        return instance.safeMint( toAccount, `https://ipfs.io/ipfs/${ipfs_hash}`, { from: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', gas: 3000000 })
        .then((receipt) => {
                console.log("SUCCESS!! Transaction receipt:", receipt);
		//console.log("tokenID: ", typeof(receipt.logs[0].args.tokenId));
		//return receipt.logs[0].args.tokenId;
		//console.log("tokenID: ", tokenId);
		
        })
        .catch((error) => {
                console.error("Error sending transaction:", error);
                });
        });
}
