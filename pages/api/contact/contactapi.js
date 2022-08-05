import { ObjectId } from "mongodb";
import { connectDatabse } from "../../../helpers/db-utils";



async function handler(req,res) {
    let client;
if(req.method==='POST'){
    const { username, teleusername, useremail, userpurpose, usermessage,captcha}  = req.body;
    if(!captcha || captcha===undefined||captcha===null){
        return res.json({message:"Captcha Failed"}); 
     } 

     //Secret Key
     
     const secKey=process.env.GOOGLE_APP_SECRET_KEY;
     const verifyURL= `https://www.google.com/recaptcha/api/siteverify?secret=${secKey}&response=${captcha}$remoteip=${req.connection.remoteAddress}`;

     //make request

     const body = await fetch(verifyURL).then(res => res.json());

     // If not successful
     if (body.success !== undefined && !body.success){
     return res.json({ success: false, msg: 'Failed captcha verification' });}

    if(!username ||!username.trim()===''
             ||!useremail||!useremail.trim()===''
             ||!userpurpose||!userpurpose.trim()===''
             ||!usermessage||usermessage.trim()==='' 
              ) {
                res.status(422).json({message:"Input Invalid"})
                client.close();
                return;
              } else {

                const  newMessage= {
                   username,    
                   teleusername,
                   useremail,
                   userpurpose,
                   usermessage,
                   datereceived:new Date().toLocaleString(),
                   checked:"Awaiting",
                   action:"Not Started",
                   remarks:""
                               }    
                               
             //console.log(newMessage)                  
        try{
            // client = await MongoClient.connect('mongodb+srv://chandra:3GXvlZhcibsu3sKj@cluster0.onchbsj.mongodb.net/coindata?retryWrites=true&w=majority');
            client = await connectDatabse('coindata');
           
           
        }catch {
            res.status(201).json({message:'denied'})
            return
        }
    
        try {
             const db=client.db();
            const result = await db.collection('contactmessage').insertOne(newMessage);
            //const result = insertData(client,'contactmessage', newMessage)
            res.status(201).json({message:'Message added'})
    
        } catch {
            res.status(500).json({message:'Message not inserted'})
            
        }

              }


            

    client.close();
 
 }


 if(req.method==='GET'){

    try{
        // client = await MongoClient.connect('mongodb+srv://chandra:3GXvlZhcibsu3sKj@cluster0.onchbsj.mongodb.net/coindata?retryWrites=true&w=majority');
        client = await connectDatabse('coindata');
       
       
    }catch {
        res.status(201).json({message:'denied'})
        return
    }

    try {
         const db=client.db();
         const documents = await db.collection('contactmessage').
         find({},{projection:{"username":1, "useremail":1, "datereceived":1, "userpurpose":1, "checked":1, "action":1}}).
         sort({"username":-1, "datereceived":-1}).toArray();
        //const result = insertData(client,'contactmessage', newMessage)
         res.status(200).json({contactmsg:documents})

    } catch {
        res.status(500).json({message:'Fetching Data Error'})
        
    }

    client.close();
 }





if(req.method==='PUT'){
    //contactid,telegramlink,contactaction,contactchecked,contactremarks
   
    const { contactid, contactremarks, contactaction, contactchecked, telegramlink }  = req.body;
    //console.log("nnn", contactremarks);
    try{
        client=await connectDatabse('coindata');
    } catch {
        res.status(500).json({message:"Database connection failed"});
        return;
    }


    try {
        
        const db=client.db();
        const result = await db.collection('contactmessage').updateOne({_id:new ObjectId(contactid)},
        {$set:{remarks:contactremarks, action:contactaction, checked:contactchecked, teleusername:telegramlink}},{ upsert: false} );
        //console.log(result);
        res.status(200).json({message:"Record updated"});
        
    } catch {
        res.status(500).json({message:"Error in updating"})
    }


   client.close()



}
}
export default handler;