import { NFTStorage, File } from "nft.storage";
import fetch from "node-fetch";
import img from "./Eat.png";
import IPFS from 'ipfs';

export async function attendTokenOffering(weekInfo, attend1, attend2) {
    const apiKey = "";
    const client = new NFTStorage({token: apiKey});
    const response = await fetch(img);
    const buffer = await response.arrayBuffer();

    try {
        const metadata = await client.store({
            name: "SBT",
            description: "...",
            image: new File([buffer], "Eat.png", { type: "image/png" }),
            attributes: [
              {
                trait_type: "weekInfo",
                value: weekInfo,
              },
      
              {
                trait_type: "attend1",
                value: attend1,
              },
      
              {
                trait_type: "attend2",
                value: attend2,
              },
      
              {
                trait_type: "type",
                value: 'attend',
              },
      
            ],
      
            
        });
        console.log('url from NFT.storage:', metadata.url);
       	return metadata.url; 
    } catch(error) {
        console.error(error);
    }
}
