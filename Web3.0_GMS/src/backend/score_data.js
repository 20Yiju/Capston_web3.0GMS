import { create } from "ipfs-http-client";
import { Buffer } from 'buffer';
const img = require("./Eat.png");

export async function gradeTokenOffering(courseName, section, type, tokenName, totalScore, studentScore, comment) {
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
//  const client = new NFTStorage({token: apiKey});
//  const response = await fetch(img);
//  const buffer = await response.arrayBuffer();

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
//      image: new File([buffer], "Eat.png", { type: "image/png" }),
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
        },
	{
          trait_type: "studentScore",
          value: studentScore,
        },
	{
          trait_type: "comment",
          value: comment,
        },
      ],
    };

    const { cid } = await ipfs.add(JSON.stringify(metadata));
    console.log(`https://ipfs.io/ipfs/${cid}`);
    return cid;
//  console.log('url from NFT.storage:', metadata.url);
//  return metadata.url;
  } catch (error) {
    console.error(error);
  }
}

