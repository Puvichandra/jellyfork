
import {ObjectId} from 'mongodb'

import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ContactDetailForm from "../../components/coinlist/contact-detail-comp";
import { connectDatabse } from '../../helpers/db-utils';
import AdminHeader from "../../components/layout/admin-header"



function ContactDetailPage(props) {
const data=props.contactdata;
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
<ContactDetailForm data={data}  loadingstate={isLoading} />

        </>

    )
}


export  async function getServerSideProps(context){
    const {params} = context;
    const contactId = params.contactid
   
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
    document = await db.collection('contactmessage').find({_id:new ObjectId(contactId)}).toArray();
    
} catch {
    console.log('Unable to get documents')
}

client.close();

  return {
    props:{
        contactdata:JSON.parse(JSON.stringify(document)),
        id:contactId,
    }
  }

}

export default ContactDetailPage;