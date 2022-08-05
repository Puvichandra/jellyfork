import { connectDatabse } from "../helpers/db-utils";
import {ObjectId} from 'mongodb'
import DetailPageCoin from "../components/coinlist/detail-page";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';




function CoinDetailPage(props) {
const id=props.id;
const[isLoading, setIsLoading]=useState(false)
const router = useRouter();

//   async function updatevote(){
//     setIsLoading(true);
//     fetch('api/votenow/'+id)
//    .then(res=>res.json())
//    .then((data)=>{
//     refreshData();
//     setIsLoading(false);
//    })
   
//  }


 async function updatevote(id, captcha_response){
  setIsLoading(true);
  const dd={id:"none", captcha:captcha_response}
  //console.log('kkk',captcha_response);

fetch('api/votenow/'+id, {
    method:'POST',
    body:JSON.stringify(dd),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then((response)=>response.json())
  .then((data)=>{data.message==='added' ? console.log("Data Added"): console.log("Data not Added");refreshData();});
  

}

 const refreshData = () => {
  router.replace(router.asPath);
  setIsLoading(false);
}


 useEffect(()=>{
 
 },[props.coinId])
 



    return (

      
        <>



<DetailPageCoin data={props.coinid} evote={updatevote} loadingstate={isLoading} />

        </>

    )
}


export  async function getServerSideProps(context){
    const {params} = context;
    const coinId = params.coinid
   
  let document;
  let client;

  try{
    client=await connectDatabse('coindata');
} catch {
  console.log("database connection failed")
    return;
}

try {
    const db=client.db();
  
    //document = await db.collection('coinlist').find({_id:ObjectId("62b5cebc09291b1531ebcbd3")}).toArray();
    document = await db.collection('coinlist').find({_id:new ObjectId(coinId)}).toArray();
    
} catch {
    console.log('Unable to get documents')
}

client.close();

  return {
    props:{
        coinid:JSON.parse(JSON.stringify(document)),
        id:coinId,
    }
  }

}

export default CoinDetailPage;