
import { ObjectId } from 'mongodb';
import axios from 'axios';
import { connectDatabse, getAllDocuments, insertData } from '../../helpers/db-utils';


// MongoClient


async function handler(req,res) {
 
    let client;

    if(req.method === 'POST'){
        const { nftimage,nftname, description,nftlink,captcha }  = req.body;

             if(!captcha || captcha===undefined||captcha===null){
                return res.json({message:"Captcha Failed"}); 
             } 
               if(!nftname ||!nftname.trim()===''
             ||!nftlink||!nftlink.trim()===''
             ||!nftimage||!nftimage.trim()===''
             ||!description||!description.trim()===''
              ) {
                res.status(422).json({message:"Input Invalid"})
                client.close();
                return;
              } else {

                const  newNft= {
                    nftimage,    
                    nftname,
                    description,
                    nftlink,
                    active:true,
                   
                }        

                const secKey=process.env.GOOGLE_APP_SECRET_KEY;
                try{
                 let result = await axios({
                     method: 'post',
                     url: 'https://www.google.com/recaptcha/api/siteverify',
                     params: {
                         secret: secKey,
                         response: req.body.captcha
                     }
                 });
           
             
                 let data = result.data || {};
                 if(!data.success){
                     throw({
                         success: false,
                         error: 'response not valid'
                     })
                 } else if(data.success){

                    try{
                        client = await connectDatabse('coindata');
                    }catch {
                        return res.status(201).json({message:'denied'})
                     }
                
                    try {
                        await  insertData(client,'nftlist', newNft)
                        res.status(201).json({message:'added'})
                
                    } catch {
                        res.status(500).json({message:'data not inserted'})
                      }
                    client.close();
                  }
             }
             catch(err){
                   res.status(422).json({success: false, error: 'captcha_error'})
             }
 }
}



 if(req.method==='GET'){
    try{
        client=await connectDatabse('coindata');
    } catch {
        res.status(500).json({message:"Database connection failed"})
        return;
    }
    
    try {
        const db=client.db();
        
        const documents = await db.collection('nftlist').find({"active":true}, {projection:{"nftimage":1, "nftname":1, "description":1, "nftlink":1}} ).sort({"votes":-1}).toArray();
        res.status(201).json({nftlist:documents})
       
    } catch {
        res. status(500).json({message:'Unable to get documents'})
    }
    
    client.close();
 }


//  if(req.method==='PUT'){
//     const { cid,cname,symbol,network,launchdate,listingstatus,caddress,cdesc,weblink,twitter,chartlink,reddit,discord,telegram,activatecoin,promoted,vote }  = req.body;

//     //console.log({ttt:cname});
//     if(!cname ||!cname.trim()===''
//              ||!symbol||!symbol.trim()===''
//              ||!network||!network.trim()===''
//              ||!launchdate||!launchdate.trim()===''
//              ||!listingstatus||!listingstatus.trim()==='' 
//              ||!cdesc||!cdesc.trim()==='') {

//                 res.status(422).json({message:"Input Invalid"})
//                 return;

//              }
//     try{
//         client=await connectDatabse('coindata');
//     } catch {
//         res.status(500).json({message:"Database connection failed"})
//         return;
//     }

//     try {
//         //console.log("Chandra");
//         const db=client.db();
//         //document = await db.collection('coinlist').find({_id:new ObjectId(coinid)}).toArray();
//         //document = await db.collection('coinlist').find({_id:ObjectId("62b5cebc09291b1531ebcbd3")}).toArray();
//         const result = await db.collection('coinlist').updateOne({_id:new ObjectId(cid)},
//         {$set:{coinname:cname, coinsymbol:symbol, networkchain:network, launchdate:launchdate, listingstatus:listingstatus, contractaddress:caddress,
//             description:cdesc, websitelink:weblink, twitterlink:twitter, chartlink:chartlink, redditlink:reddit, discordlink:discord, telegramlink:telegram,
//             ispromoted:promoted,activateCoin:activatecoin,votes:vote}},{ upsert: false}    
        
//     );
//     //console.log(result.matchedCount +" - " +result.modifiedCount);
//         //console.log(document);
//         res.status(200).json({message:"Record updated"});
        
//     } catch {
//         res.status(500).json({message:"Error in updating"})
//     }


//    client.close()
// // }


// }
}

export default handler;