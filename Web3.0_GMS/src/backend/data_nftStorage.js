import { NFTStorage, File } from "nft.storage";
import fetch from "node-fetch";
import img from "./Eat.png";
import IPFS from 'ipfs';

export async function tokenOffering(courseName, section, type, tokenName, totalScore) {
   // console.log(courseName);
   // console.log(section);
   // console.log(type);
   // console.log(tokenName);
   // console.log(totalScore);
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ4MzVCZjIwYUI3NzhBMWM0ZjZDOURBMGQ4QkMxMmQ1MGRlNDFiODEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzQyNTgyNzI4NiwibmFtZSI6InRlc3QxIn0.d6QO_mnvQoii02Ps4jC1YJA-tbK4RcziPSnNKd4s4ww";
    const client = new NFTStorage({token: apiKey});
    const response = await fetch(img);
    const buffer = await response.arrayBuffer();

    try {
        const metadata = await client.store({
            name: "My NFT",
            description: "...",
            image: new File([buffer], "Eat.png", { type: "image/png" }),
            attributes: [
              {
                trait_type: "course name",
                value: courseName,
              },
      
              {
                trait_type: "section",
                value: section,
              },
      
              {
                trait_type: "type",
                value: type,
              },
      
              {
                trait_type: "tokenName",
                value: tokenName,
              },
      
              {
                trait_type: "totalScore",
                value: totalScore,
              }
            ],
      
            
        });
        console.log('url from NFT.storage:', metadata.url);
        
    } catch(error) {
        console.error(error);
    }
}
