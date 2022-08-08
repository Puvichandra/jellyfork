
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { dateAgo } from '../../helpers/calculate-funct';
import { connectDatabse, getAllDocuments, insertData } from '../../helpers/db-utils';




// MongoClient


async function handler(req,res) {
 
    let client;
    const apikey = "17J2JX7UV6AUSJ4YU7FZK7Z63GY1FS6SWZ";
    const caddress="0x0000000000000000000000000000000000000001";

 if(req.method==='PUT'){
    try{
        client=await connectDatabse('coindata');
    } catch {
        console.log("failed")
        return res.status(500).json({message:"Database connection failed"})
      }

    
    try {
        const db=client.db();
        let count=1
       const documents = await db.collection('coinlist').find({activateCoin:true,activateCoin:"true",listingstatus:'listed'}, {projection:{"coinname":1, "marketcap":1, "price":1, "contractaddress":1,"divideval":1}} ).sort({"votes":-1}).toArray();
       //console.log(documents);
        //res. status(200).json({message:'ok'})

        for(var i = 0; i < documents.length; i++){
           
           
            (function(i){
                setTimeout(async function(){
                    let price=0;
                    let totsupply=0;
                    let mc=0;
                    let deadcoin=0;
                    let dval=0;
                    let csupply=0;
                    
                    const urlOne="https://api.pancakeswap.info/api/v2/tokens/"+documents[i].contractaddress;
                    const urlTwo="https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress="+documents[i].contractaddress + "&apikey="+apikey;
                    const urlThree="https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress="+ documents[i].contractaddress + "&address="+ caddress + "&tag=latest&apikey=" + apikey;
       
                   
                    const panprice=await getUrlValue(urlOne);
                              try{
                                    price=parseFloat(panprice.data.price);
                                } catch {
                                    price=0;
                                }
                    const totSupplydata=  await getTotalSupply(urlTwo);
                                try{
                                    totsupply=parseInt(totSupplydata.result);
                                } catch {
                                    totsupply=0;
                                }
                    const deadSupplydata=  await getDeadSupply(urlThree);
                                try{
                                    deadcoin=parseInt(deadSupplydata.result);
                                } catch {
                                    deadcoin=0;
                                }
                    dval=Number(documents[i].divideval);
                    const mcap=(parseFloat(totsupply/dval)-parseFloat(deadcoin/dval))*parseFloat(price);
                    mc=numFormatter(mcap);            
                    db.collection('coinlist').updateOne({"contractaddress":documents[i].contractaddress},
                                          {$set:{"price":price,"marketcap":mc}},{ upsert: false});
                   console.log(`{${documents[i].coinname} price: ${price} TotalSupply: ${totsupply} deadSupply:${deadcoin} mcap:${mcap} mc:${mc}`)                  

                }, 3000 * (i + 1));
            })(i);
        }

        
 }
catch {
        res. status(500).json({message:'Unable to get documents'})
  }
    
   
   
 }

//  const asyncTimeout = (ms) => {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
//   };



async function getUrlValue(url) {
    
    try {
        const documents=await axios.get(url);
        let data=documents.data;
        return data;
    } catch (err){
        res.status(500).json({ error: 'failed to Pancake Price Data' })
    }
   
}

async function getTotalSupply(url) {
    
        try {
            const documents=await axios.get(url);
            let data=documents.data;
            return data;           
        } catch (err){
            res.status(500).json({ error: 'failed to load data' })
        }
     
}

async function getDeadSupply(url) {
    
    try {
        const documents=await axios.get(url);
        let data=documents.data;
        return data;           
    } catch (err){
        res.status(500).json({ error: 'failed to load data' })
    }
 
}
 

//  function convertToInternationalCurrencySystem (labelValue) {

//     // Nine Zeroes for Billions
//     return Math.abs(Number(labelValue)) >= 1.0e+9

//     ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
//     // Six Zeroes for Millions 
//     : Math.abs(Number(labelValue)) >= 1.0e+6

//     ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
//     // Three Zeroes for Thousands
//     : Math.abs(Number(labelValue)) >= 1.0e+3

//     ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

//     : Math.abs(Number(labelValue));

// }

function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000 && num < 1000000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }else if(num > 1000000000){
        return (num/1000000000).toFixed(1) + 'B'; // if value < 1000, nothing to do
    }
}

}

export default handler;