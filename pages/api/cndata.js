
import { ObjectId } from 'mongodb';
import { dateAgo } from '../../helpers/calculate-funct';
import { connectDatabse, getAllDocuments, insertData } from '../../helpers/db-utils';
import axios from 'axios';


// MongoClient


async function handler(req,res) {
 
    let client;

    if(req.method === 'POST'){
        const { coinimage,coinname, coinsymbol, networkchain,
             launchdate, listingstatus, contractaddress, 
             description,websitelink, twitterlink, chartlink, redditlink, discordlink, telegramlink,captcha }  = req.body;

            

             if(!captcha || captcha===undefined||captcha===null){
                return res.json({message:"Captcha Failed"}); 
             } 

             let valserver=false;
             if(listingstatus==='presale' && contractaddress.trim()===''){
                valserver=true;
             } else if (listingstatus==='presale' && contractaddress) {
                valserver=false;
             } else if (listingstatus==='listed' && contractaddress) {
                valserver=true;
             } else if (listingstatus==='listed' && !contractaddress) {
                valserver=false;
             }
     
             // check required user input
                if(!coinname ||!coinname.trim()===''
                ||!coinsymbol||!coinsymbol.trim()===''
                ||!networkchain||!networkchain.trim()===''
                ||!launchdate||!launchdate.trim()===''
                ||!listingstatus||!listingstatus.trim()==='' 
                ||!description||!description.trim()===''
                 ) {
                    return res.status(422).json({message:"Input Invalid"})
                    } 


                    //console.log("BBB",valserver);
              // check listing status and contract address      
                if(valserver===false){    
                    return res.status(422).json({message:"Listing Status and Contract address conflict"})
                }
   
                   const  newCoin= {
                       coinimage,    
                       coinname,
                       coinsymbol,
                       networkchain,
                       launchdate,
                       listingstatus,
                       contractaddress,
                       description,
                       websitelink,
                       twitterlink,
                       chartlink,
                       redditlink,
                       discordlink,
                       telegramlink,
                       ispromoted:false,
                       marketcap:'100k',
                       price:'0.0001',
                       activateCoin:false,
                       votes:500,
                       daysago:dateAgo(launchdate),
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
                            return res.status(201).json({message:'denied'});
                        }
                    
                        try {
                            // const db=client.db();
                            // const result = await db.collection('coinlist').insertOne(newCoin);
                            //console.log("nnn", newCoin);
                            await insertData(client,'coinlist', newCoin);
                            res.status(201).json({message:'added'})
                    
                        } catch {
                            res.status(500).json({message:'data not inserted'})
                            
                        }


                       client.close();
                     }
                }catch(err){
                    // console.log(err);
                    // throw err.response ? err.response.data : {success: false, error: 'captcha_error'}
                    res.status(422).json({success: false, error: 'captcha_error'})
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
        
        const documents = await db.collection('coinlist').find({activateCoin:true,activateCoin:"true"}, {projection:{"coinname":1, "marketcap":1, "price":1, "votes":1,  "ispromoted":1, "launchdate":1,"networkchain":1}} ).sort({"votes":-1,"coinname":-1}).toArray();
        const promoteddocument = await db.collection('coinlist').find({ispromoted:true , ispromoted:"true"}, {projection:{"coinname":1, "marketcap":1, "price":1, "votes":1,  "ispromoted":1,"launchdate":1,"networkchain":1}} ).sort({"votes":-1}).toArray();
        res.status(201).json({coinlist:documents,promoted:promoteddocument})
       //console.log("Chandra",promoteddocument)
    } catch {
        res. status(500).json({message:'Unable to get documents'})
    }
    
    client.close();
 }


 if(req.method==='PUT'){
    const { cid,cimage,cname,symbol,network,launchdate,listingstatus,caddress,cdesc,weblink,twitter,chartlink,reddit,discord,telegram,activatecoin,promoted,divideval,vote }  = req.body;

    //console.log({ttt:cname});
    if(!cimage ||!cimage.trim()===''
        ||!cname ||!cname.trim()===''
             ||!symbol||!symbol.trim()===''
             ||!network||!network.trim()===''
             ||!launchdate||!launchdate.trim()===''
             ||!listingstatus||!listingstatus.trim()==='' 
             ||!cdesc||!cdesc.trim()==='') {

                res.status(422).json({message:"Input Invalid"})
                return;

             }
    try{
        client=await connectDatabse('coindata');
    } catch {
        res.status(500).json({message:"Database connection failed"})
        return;
    }

    try {
        //console.log("Chandra");
        const db=client.db();
        //document = await db.collection('coinlist').find({_id:new ObjectId(coinid)}).toArray();
        //document = await db.collection('coinlist').find({_id:ObjectId("62b5cebc09291b1531ebcbd3")}).toArray();
        const result = await db.collection('coinlist').updateOne({_id:new ObjectId(cid)},
        {$set:{coinname:cname,coinimage:cimage, coinsymbol:symbol, networkchain:network, launchdate:launchdate, listingstatus:listingstatus, contractaddress:caddress,
            description:cdesc, websitelink:weblink, twitterlink:twitter, chartlink:chartlink, redditlink:reddit, discordlink:discord, telegramlink:telegram,
            ispromoted:promoted,activateCoin:activatecoin,divideval:divideval,votes:vote}},{ upsert: false}    
        
    );
    //console.log(result.matchedCount +" - " +result.modifiedCount);
        //console.log(document);
        res.status(200).json({message:"Record updated"});
        
    } catch {
        res.status(500).json({message:"Error in updating"})
    }


   client.close()
// }


}
}

export default handler;