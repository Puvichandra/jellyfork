
import { connectDatabse } from "../../helpers/db-utils";
import { ObjectId} from 'mongodb';


async function handler(req,res) {
    let client;

if(req.method ==='POST') {
    const {coinid,vote} = req.body;
    
    if(!coinid ||coinid.trim()===''
    ||!vote || vote<1 ) {
        return res.status(422).json({message:"Invalid data"})
    }

      const newIndCoin ={
            coinid:new ObjectId(coinid),
            datt:Date.now(),
            vote:Number(vote),
        }

        
    try{
        client=await connectDatabse("coindata");
    } catch {
        return res.status(500).json({message:"Database connection failed"})
    }

    try {
        const db=client.db();
        await db.collection("indvidualvote").insertOne(newIndCoin);
        res.status(200).json({message:"added"});
    } catch {
        res.status(500).json({message:"Not able to add Ind coin"})
        }




    client.close
    

}
}

export default handler;