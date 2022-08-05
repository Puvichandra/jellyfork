import { connectDatabse } from "../../../helpers/db-utils";
import { ObjectId} from 'mongodb'






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
        //console.log("jjj",id);
        if(!req.body.captcha || req.body.captcha===undefined||req.body.captcha===null){
           return res.json({message:"Captcha Failed"}); 
        } 

        //Secret Key
        
        const secKey=process.env.GOOGLE_APP_SECRET_KEY;
        const verifyURL= `https://www.google.com/recaptcha/api/siteverify?secret=${secKey}&response=${req.body.captcha}$remoteip=${req.connection.remoteAddress}`;

        //make request

        const body = await fetch(verifyURL).then(res => res.json());

        // If not successful
        if (body.success !== undefined && !body.success){
        return res.json({ success: false, msg: 'Failed captcha verification' });}

        const newIndCoin ={
            coinid:new ObjectId(id),
            datt:Date.now(),
            vote:1
        }

       

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
}

export default handler;