
import { ObjectId } from 'mongodb';
import axios from  'axios';
import { connectDatabse,  insertData } from '../../helpers/db-utils';


// MongoClient


async function handler(req,res) {
 
    let client;

    if(req.method === 'POST'){
        const { adposition,adimage, fromdate,todate,adactive,adlink,captcha }  = req.body;

             if(!captcha || captcha===undefined||captcha===null){
                return res.json({message:"Captcha Failed"}); 
             } 
     

             if(!adposition ||!adposition.trim()===''
             ||!adimage||!adimage.trim()===''
             ||!fromdate||!fromdate.trim()===''
             ||!todate||!todate.trim()===''
             ||!adactive||!adactive.trim()===''
             ||!adlink||!adlink.trim()===''
              ) {
                res.status(422).json({message:"Input Invalid"})
                client.close();
                return;
              } else {

                const  newad= {
                    adposition,    
                    adimage,
                    fromdate,
                    todate,
                    adactive,
                    adlink,
                   
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
                        res.status(201).json({message:'ok'})
                       
                    }catch {
                        return res.status(201).json({message:'denied'})
                     }
                
                    try {
                        // const db=client.db();
                        // const result = await db.collection('coinlist').insertOne(newCoin);
                        const result = insertData(client,'adlist', newad)
                        res.status(201).json({message:'added'})
                
                    } catch {
                        res.status(500).json({message:'data not inserted'});
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

 if(req.method==='GET'){
    try{
        client=await connectDatabse('coindata');
    } catch {
        res.status(500).json({message:"Database connection failed"})
        return;
    }
    
    try {
        const db=client.db();
        
        const documents = await db.collection('adlist').find({}, {projection:{"adimage":1, "adactive":1, "adposition":1, "fromdate":1, "todate":1,"adlink":1,}} ).sort({"adposition":-1}).toArray();
        //const promoteddocument = await db.collection('nftlist').find({ispromoted:true , ispromoted:"true"}, {projection:{"coinname":1, "marketcap":1, "price":1, "votes":1, "daysago":1, "ispromoted":1}} ).sort({"votes":-1}).toArray();
        res.status(201).json({adlist:documents})
       //console.log("Chandra",promoteddocument)
    } catch {
        res. status(500).json({message:'Unable to get documents'})
    }
    
    client.close();
 }


 if(req.method==='PUT'){
    const {adid,adposition,adimage,fromdate,todate,adactive,adlink,oldadimage}  = req.body;
    //console.log(req.body);

   
    if(!adposition ||!adposition.trim()===''
             ||!adimage||!adimage.trim()===''
             ||!fromdate||!fromdate.trim()===''
             ||!todate||!todate.trim()===''
             ||!adactive||!adactive.trim()===''
             ||!adlink||!adlink.trim()===''
              ){

                res.status(422).json({message:"Input Invalid"})
                return;

             }

            // deleteOldImage (oldadimage);       
    try{
        client=await connectDatabse('coindata');
    } catch {
        res.status(500).json({message:"Database connection failed"})
        return;
    }

    try {
        
        const db=client.db();
        const result = await db.collection('adlist').updateOne({_id:new ObjectId(adid)},
        {$set:{adposition:adposition, adimage:adimage, fromdate:fromdate, todate:todate, adactive:adactive, adlink:adlink,
            }},{ upsert: false}    
         
        
    );

   // deleteOldImage (oldadimage);
        res.status(200).json({message:"Record updated"});
        
    } catch {
        res.status(500).json({message:"Error in updating"})
    }


   client.close()
// }


}
}

async function deleteOldImage(oldadimage) {
    const filename= oldadimage.split('/');
    var lastSegment = filename.pop() || parts.pop();  // handle potential trailing slash
    //console.log(lastSegment);
    const timestamp = new Date().getTime()
   const string = `public_id=ofsgnoxe0apifeajp4lu&timestamp=${timestamp}Hi_zdlfAnGTB4hOOxRrKjgi2r0o`
const signature = await sha1(string)
const formData = new FormData()
formData.append("public_id",'ofsgnoxe0apifeajp4lu')
formData.append("signature",signature)
formData.append("api_key",'462743359482371')
formData.append("timestamp",timestamp)
const res = await ax.post("https://api.cloudinary.com/v1_1/ofsgnoxe0apifeajp4lu/image/destroy", formData)
}

export default handler;