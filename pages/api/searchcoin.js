
import { ObjectId } from 'mongodb';
import { dateAgo } from '../../helpers/calculate-funct';
import { connectDatabse, getAllDocuments, insertData } from '../../helpers/db-utils';


// MongoClient


async function handler(req,res) {
 
    let client;

if(req.method==='GET'){
    try{
        client=await connectDatabse('coindata');
    } catch {
        return res.status(500).json({message:"Database connection failed"});
        
    }
    
    try {
        const db=client.db();
        
        const documents = await db.collection('coinlist').find({activateCoin:true,activateCoin:"true"}, {projection:{"coinname":1}} ).sort({"coinname":-1}).toArray();
        res.status(201).json({coinlist:documents})
       
    } catch {
        res. status(500).json({message:'Unable to get documents'})
    }
    
    client.close();
 }

}

export default handler;
