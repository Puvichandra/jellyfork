
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
        res.status(500).json({message:"Database connection failed"})
        return;
    }

    
    try {
        const db=client.db();
   
       const documents = await db.collection('coinlist').find({activateCoin:true,activateCoin:"true",listingstatus:'listed'}, {projection:{"coinname":1, "marketcap":1, "price":1, "contractaddress":1,"divideval":1}} ).sort({"votes":-1}).toArray();
       //console.log(documents);
        res. status(200).json({message:'ok'})
       documents.map( (coin)=>{
            let price=0;
            let totsupply=0;
            let mc=0;
            let deadcoin=0;
            let dval=0;
            let csupply=0;
            //console.log(coin.contractaddress);
            const urlOne="https://api.pancakeswap.info/api/v2/tokens/"+coin.contractaddress;
            const urlTwo="https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress="+coin.contractaddress + "&apikey="+apikey;
            const urlThree="https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress="+ coin.contractaddress + "&address="+ caddress + "&tag=latest&apikey=" + apikey;

           
            try {
                fetch(urlOne).then(res=>res.json()).then((data)=>{
                    //console.log("first",data);
                    price=parseFloat(data.data.price);
                    //console.log("p",price);

                    try {
                        fetch(urlTwo).then(res=>res.json()).then((data)=>{
                            //console.log("second",data);
                            totsupply=data.result;

                                try {
                                 fetch(urlThree).then(res=>res.json()).then((data)=>{
                                  
                                   // console.log("new",newdata)
                                    deadcoin=data.result;
                                    dval=Number(coin.divideval);
                                    const mcap=(parseFloat(totsupply/dval)-parseFloat(deadcoin/dval))*parseFloat(price);
                                    mc=numFormatter(mcap);
                                    //console.log("mc",mc);
                                   // console.log(db);
                                    db.collection('coinlist').updateOne({"contractaddress":coin.contractaddress},
                                    {$set:{"price":price,"marketcap":mc}},{ upsert: false});
                                    
                                    return data;})
                                    } catch (err){
                                        client.close();
                                        res.status(500).json({ error: 'failed to load data' })
                                    }
                            
                                })                                     
                                } catch (err){
                                    client.close();
                                  res.status(500).json({ error: 'failed to load data' })
                                 }
                    })              
                
            } catch (err){
                client.close();
                res.status(500).json({ error: 'failed to load data' })
            }


            // try {
            //     await fetch(urlTwo).then(res=>res.json()).then(data=>{console.log("second",data);totsupply=data.result;return data;})
                               
            // } catch (err){
            //     return res.status(500).json({ error: 'failed to load data' })
            // }

            // console.log("1",price)
            // console.log("2",totsupply)


            // try {
            //     const result=  fetch(urlThree)
            //     console.log(result);
            //     res.status(200).json({ result })
                
            // } catch (err){
            //     res.status(500).json({ error: 'failed to load data' })
            // }

           
        //     fetch("https://api.pancakeswap.info/api/v2/tokens/"+coin.contractaddress)
        //     .then((response)=>response.json())
        //     .then((data)=>{
        //         price=data.data.price;
        //         //console.log("p",price);

        //         fetch("https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress="+coin.contractaddress + "&apikey="+apikey)
        //         .then((response)=>response.json())
        //         .then((data)=>{
        //             totsupply=data.result; 
        //             //console.log("g",totsupply);

        //               fetch("https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress="+ coin.contractaddress + "&address="+ caddress + "&tag=latest&apikey=" + apikey)    
        //                 .then((response)=>response.json())
        //                 .then((data)=>{
        //                     deadcoin=data.result;
        //                     dval=Number(coin.divideval)
        //                     console.log("dd",coin.divideval)
        //                     const mcap=(parseFloat(totsupply/dval)-parseFloat(deadcoin/dval))*parseFloat(price);
        //                     mc=numFormatter(mcap);
        //                     db.collection('coinlist').updateOne({"contractaddress":coin.contractaddress},
        //                     {$set:{"price":price,"marketcap":mc}},{ upsert: false});
        //                //res.status(200).json({message:"All Updated"})
        //         }).catch((e)=>console.log("Error 3"))
        //     }).catch((e)=>{console.log("error 2")})
        //         .catch((e)=>{
        //             console.log("error 1") 
        //         })
               
                
        //         })
        //         //res.status(201).json({coinli:documents})
        // })
        
      
    } )
}catch {
        res. status(500).json({message:'Unable to get documents'})
    }
    
   
   
 }

// async function getUrlValue(url) {
//     try {
//         const result=await getUrlValue(url);
//         console.log("hh",result)
//     } catch (err){
//         res.status(500).json({ error: 'failed to load data' })
//     }

   
// }
 

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