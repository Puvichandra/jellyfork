import { ObjectId } from "mongodb";
import { connectDatabse } from "../../../helpers/db-utils";
import axios from 'axios'



async function handler(req,res) {
    let client;

if(req.method==='POST'){
    const { username, teleusername, useremail, userpurpose, usermessage,captcha}  = req.body;

    //console.log(req.body);

    //if captcha failed return
    if(!captcha || captcha===undefined||captcha===null){
        return res.json({message:"Captcha Failed"}); 
     } 

     //verify userinput- return if failed

     if(!username ||!username.trim()===''
     ||!useremail||!useremail.trim()===''
     ||!userpurpose||!userpurpose.trim()===''
     ||!usermessage||usermessage.trim()==='' 
      ) {
        return res.status(422).json({message:"Input Invalid"})
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

      //console.log("nnn",newMessage)                 

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