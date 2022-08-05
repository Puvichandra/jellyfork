import { connectDatabse } from "../../helpers/db-utils";

connectDatabse

async function handler(req,res) {
    let client;

    try{
        client=await connectDatabse("coindata");
    } catch {
        res.status(500).json({message:"Database connection failed"})
        return;
    }
    
    try {
        const db=client.db();
        //console.log(Date.now() - ( 3600 * 1000 * 24))
        await db.collection("indvidualvote").deleteMany({ "datt": { $lte: Date.now() - ( 3600 * 1000 * 24) }},) 
        const documents = await db.collection('indvidualvote').aggregate([
            { "$group" :{
                _id: "$coinid",
                 TotalVote: {
                  
                  "$sum": "$vote"
                }
              }},

             {"$lookup" : {
                from: 'coinlist',
                localField: '_id',
                foreignField: '_id',
                as: 'coinlistdoc'
              }},

              {"$sort" :{
                TotalVote: -1,
                coinname:-1,
              }},
              
        ]).toArray();
       
        const promoteddocument = await db.collection('coinlist').find({ispromoted:true , ispromoted:"true"}, {projection:{"coinname":1, "marketcap":1, "price":1, "votes":1, "daysago":1, "ispromoted":1}} ).sort({"votes":-1}).toArray();
       // console.log("Chandra",documents)
        res.status(201).json({indcoin:documents, promoted:promoteddocument})
       
    } catch {
        res. status(500).json({message:'Unable to get documents'})
    }
    
    client.close();

}

export default handler;