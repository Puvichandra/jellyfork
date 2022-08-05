import fs from 'fs';
import path from 'path';

export function buildpath(){
    return path.join(process.cwd(),'data','datafile.json')
}

export function extractdata(filepath){
    const exdata=fs.readFileSync(filepath);
    const edata = JSON.parse(exdata);
    return edata;
}

function handler(req,res) {
   if(req.method==='POST') {
    const coinname =req.body.coinname;
    const coinimage=req.body.coinimage;
    const coinsymbol=req.body.coinsymbol;
    const contractaddress=req.body.contractaddress;
    const description = req.body.description;
    const discordlink = req.body.discordlink;
    const launchdate = req.body.launchdate;
    const listingstatus = req.body.listingstatus;
    const networkchain =req.body.networkchain;
    const reditlink =req.body.redditlink;
    const telegramlink=req.body.telegramlink;
    const twitterlink=req.body.twitterlink;
    const websitelink = req.body.websitelink;
  

    const newcoin={
        id:new Date().toISOString(),
        coinimage:coinimage,
        coinname:coinname,
        coinsymbol:coinsymbol,
        contractaddress:contractaddress,
        description:description,
        discordlink:discordlink,
        launchdate:launchdate,
        listingstatus:listingstatus,
        networkchain:networkchain,
        reditlink:reditlink,
        telegramlink:telegramlink,
        twitterlink:twitterlink,
        websitelink:websitelink,
        promotedcoin:'false'
    }
  
    const filepath=buildpath();
    const edata = extractdata(filepath)
    edata.push(newcoin);
    fs.writeFileSync(filepath, JSON.stringify(edata));
    res.status(201).json({message:"success", datafile:edata});
   } else {
    const filepath=buildpath();
    const edata = extractdata(filepath)
    res.status(200).json({datafile:edata});
//    res.status(200).json({message:"Success"});
}
   } 

  
export default handler;