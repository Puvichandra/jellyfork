
import {ObjectId} from 'mongodb'

import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AdUpdateForm from "../../components/coinlist/update-ad-data";
import { connectDatabse } from '../../helpers/db-utils';
import AdminHeader from "../../components/layout/admin-header"




function AdDetailsPage(props) {
const data=props.AdData;
const[isLoading, setIsLoading]=useState(false)
const router = useRouter();

 

 const refreshData = () => {
  router.replace(router.asPath);
}


//  useEffect(()=>{
//   refreshData()
//  },[isLoading])
 



    return (
        <>


        <div>
        <AdminHeader />
        </div>
<AdUpdateForm data={data}  loadingstate={isLoading} />

        </>

    )
}


export  async function getServerSideProps(context){
    const {params} = context;
    const AdId= params.adid;
   
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
    document = await db.collection('adlist').find({_id:new ObjectId(AdId)}).toArray();
    
} catch {
    console.log('Unable to get documents')
}

client.close();

  return {
    props:{
        AdData:JSON.parse(JSON.stringify(document)),
        id:AdId,
    }
  }

}

export default AdDetailsPage;