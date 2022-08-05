import { connectDatabse } from "../../../helpers/db-utils";
import { ObjectId} from 'mongodb'
import axios from 'axios';






async function handler(req,res) {
   
    let client;
    
    // if (req.method==='GET'){
    //     const id = req.query.voteid;
    //     // console.log("Chandra",id);
    //     try {
    //         client=await connectDatabse('coindata');
    //     } catch {
    //         res.status(500).json({message:"Database connection failed"});
    //     }

    //     try {
    //         const db=client.db();
    //         //const document = db.collection('coinlist').findOne({_id:new ObjectId(id)},{projection:{"votes":1, "_id":1}})
    //         await db.collection('coinlist').updateOne({_id:new ObjectId(id)},{ $inc: { "votes": 1 } });
    //         res.status(200).json({message:"added"});
    //     } catch {
    //         res.status(500).json({message:"Not able to fetch documents"})
    //         }

    //     client.close();


    // }

    if (req.method==='POST'){
        const id = req.query.voteid;
      
        //captcha check
        if(!req.body.captcha || req.body.captcha===undefined||req.body.captcha===null){
               return res.json({message:"Captcha Failed"}); 
        } 

        //Secret Key
        
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

            const newIndCoin ={
                coinid:new ObjectId(id),
                datt:Date.now(),
                vote:1
            }

            //console.log(result);
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

                    try {
                        const db=client.db();
                        //const document = db.collection('coinlist').findOne({_id:new ObjectId(id)},{projection:{"votes":1, "_id":1}})
                        await db.collection('coinlist').updateOne({_id:new ObjectId(id)},{ $inc: { "votes": 1 } });
                        await db.collection("indvidualvote").insertOne(newIndCoin);
                       
                        res.status(200).json({message:"added"});
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

export default handler;