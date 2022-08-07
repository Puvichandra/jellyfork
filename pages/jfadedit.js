import Head from 'next/head'
import { useEffect, useState } from 'react'
import AdPagination from'../components/coinlist/adpagination'
import AdminMainHeader from "../components/layout/admin-header"






export default  function Adeditpage() {
  const [isLoading, SetIsLoading] = useState(false);
  const [data, SetData]=useState([]);
  const [promoteddata, SetPromotedData]=useState([]);
  const [count,setCount]=useState(0);
  const [isVote, setVote]=useState(true);
 

  const refetch=()=>{
    fetch(process.env.NEXT_PUBLIC_AD_ADD_DATA)
    .then(res=>res.json())
    .then((data)=>{
        //console.log("kkk",data)
        SetData(data);
     setCount(count+1); 
    //   SetPromotedData(data.promoted)
})
    
   
    // SetIsLoading(true)
  }


  useEffect(()=>{ 
   refetch();

  },[])


  if(!isLoading){
    <div>
      Loading ....
    </div>
  }

  if(!data) {
    <div>
      No Data...
    </div>
  }

  return (
    <div className='bg-bodygray'>
      
    <div>
  <AdminMainHeader />
  </div>
   <AdPagination data={data} />
   
    </div>

    
  )

  
}