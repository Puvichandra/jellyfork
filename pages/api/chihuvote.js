import { connectDatabse } from "../../helpers/db-utils";
import { ObjectId} from 'mongodb'
import axios from 'axios';






async function handler(req,res) {

      
    let client;
    let dupcheck;
    
    if (req.method==='GET'){
       
        try {
            client=await connectDatabse('coindata');
        } catch {
            res.status(500).json({message:"Database connection failed"});
        }

        try {
            const db=client.db();
           
            const documents = await db.collection('chihuadb').aggregate([
                { "$group" :{
                    _id: "$coinname",
                     TotalVote: {
                      
                      "$sum": "$vote"
                    }
                  }},
                    
                  {"$sort" :{
                    TotalVote: -1,
                    _id:1,
                    
                  }},
                  
            ]).toArray();
          
                      
            res.status(200).json({message:documents});
        } catch {
            res.status(500).json({message:"Not able to fetch documents"})
            }

        client.close();


    }


    if (req.method==='POST'){
             
        //captcha check
        if(!req.body.captcha || req.body.captcha===undefined||req.body.captcha===null){
               return res.json({message:"Captcha Failed"}); 
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

           // console.log("ll",result.data);

            const newIndCoin ={
                coinname:req.body.coinname,
                tlink:req.body.tlink,
                datt:Date.now(),
                vote:1
            }

           
           
            let data = result.data || {};
            if(!data.success){
                throw({
                    success: false,
                    error: 'response not valid'
                })
            } else if(data.success){

                    try {
                        client=await connectDatabse('coindata');
                    } catch {
                        
                        res.status(500).json({message:"Database connection failed"});
                    }

//  check duplicate
                    try {
                        const db=client.db();
                        const document = await db.collection('chihuadb').find({tlink:req.body.tlink}).toArray();
                        //await db.collection('coinlist').updateOne({_id:new ObjectId(id)},{ $inc: { "votes": 1 } });
                        //await db.collection("chihuadb").insertOne(newIndCoin);
                        //console.log((await document).length)
                        if(document.length>0){
                            dupcheck= "duplicate";
                         } else {
                            dupcheck= "ok";
                          }
                       
                    } catch {
                       dupcheck= "failed";
                     }

                    console.log(dupcheck)




                    try {
                        if(dupcheck==="duplicate" ||dupcheck==="failed"){
                             res.status(500).json({message:"Either Duplicate User or Network Issue"})
                        } else if (dupcheck==="ok"){
                        const db=client.db();
                        //const document = db.collection('coinlist').findOne({_id:new ObjectId(id)},{projection:{"votes":1, "_id":1}})
                        //await db.collection('coinlist').updateOne({_id:new ObjectId(id)},{ $inc: { "votes": 1 } });
                        await db.collection("chihuadb").insertOne(newIndCoin);
                        res.status(200).json({message:"added"});
                    }
                    } catch {
                        res.status(500).json({message:"Not able to fetch documents"})
                        }

                        client.close();

            }
        }catch(err){
            // console.log(err);
            // throw err.response ? err.response.data : {success: false, error: 'captcha_error'}
            res.status(422).json({success: false, error: 'captcha_error'})
        }

    }
}


async function CheckDuplicate(tlink){
    let client;
    try {
        client=await connectDatabse('coindata');
    } catch {
        res.status(500).json({message:"Database connection failed"});
    }

    try {
        const db=client.db();
        const document = db.collection('chihuadb').find({tlink:tlink}).toArray();
        //await db.collection('coinlist').updateOne({_id:new ObjectId(id)},{ $inc: { "votes": 1 } });
        //await db.collection("chihuadb").insertOne(newIndCoin);
        //console.log((await document).length)
        if((await document).length>0){
           
           return "duplicate";
           
        } else {
           
           return "ok";
          
        }
       
    } catch {
       
       return "failed";
       
        }

       
}
export default handler;