import { create } from "ipfs-http-client";
import { Buffer } from 'buffer';
const img = require("./Eat.png");

export async function attendTokenOffering(weekInfo, attend1, attend2) {
  const projectId = '';
  const projectSecret = '';
  const ipfs = create({
  	host: 'ipfs.infura.io',
  	port: 5001,
  	protocol: 'https',
  	headers: {
    		authorization: `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`,
  	},
  });

  try {
    const imageBuffer = await fetch(img).then((response) => {
      if (!response.ok) {
        throw new Error('HTTP error! status: ${response.status}');
      }
      return response.arrayBuffer();
    });

    const metadata = {
      name: "SBT",
      description: "...",
      image: {
        path: "Eat.png",
        content: imageBuffer,
      },
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
	  value: "attend",
	},
      ],
    };

    const { cid } = await ipfs.add(JSON.stringify(metadata));
    console.log(`https://ipfs.io/ipfs/${cid}`);
    return cid;
  } catch (error) {
    console.error(error);
  }
}

