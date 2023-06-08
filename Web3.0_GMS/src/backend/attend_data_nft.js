import { NFTStorage, File } from "nft.storage";
import fetch from "node-fetch";
import img from "./Eat.png";
import IPFS from 'ipfs';

export async function attendTokenOffering(weekInfo, attend1, attend2) {
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ4MzVCZjIwYUI3NzhBMWM0ZjZDOURBMGQ4QkMxMmQ1MGRlNDFiODEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzQyNTgyNzI4NiwibmFtZSI6InRlc3QxIn0.d6QO_mnvQoii02Ps4jC1YJA-tbK4RcziPSnNKd4s4ww";
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
