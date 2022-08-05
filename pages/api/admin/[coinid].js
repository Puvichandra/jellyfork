import { connectDatabse } from "../../../helpers/db-utils";
import {ObjectId} from 'mongodb';

async function handler(req,res){

    if(req.method==='GET'){
    const {coinid }= req.query;
   // const coinId = params.coinid
    //console.log(coinid)
  
  let document;
  let client;

  try{
    client=await connectDatabse('coindata');
} catch {
    res.status(500).json({message:"Database connection failed"})
    return;
}

try {
    const db=client.db();
  
    //document = await db.collection('coinlist').find({_id:ObjectId("62b5cebc09291b1531ebcbd3")}).toArray();
    document = await db.collection('coinlist').find({_id:new ObjectId(coinid)}).toArray();
    //console.log(document);
    res.status(200).json({coindoc:document});
    
} catch {
    res.status(500).json({message:"unable to fetch data"})
}

client.close();
    }
//---------------------------------------------------------------------------------------------







}

export default handler;