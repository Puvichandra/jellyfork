import { useEffect, useState } from "react";
import AdminListCoinForm from "../components/coinlist/admin-listoin-frm";
import AllCoinList from "../components/coinlist/all-coinlist";
import { ThreeDots } from  'react-loader-spinner'
import Button from "../components/ui/button";
import AdminMainHeader from "../components/layout/admin-header"




function AdminConfigPage(){
    const [isLoading, SetIsLoading] = useState(false);
    const [data, SetData]=useState([]);
    const [singledata, SetSingleData]=useState([]);
    const [count,setCount]=useState(0);
    const [rrset, setrrset]=useState(false);
    const [singledataloading, setsingledataloading]=useState(false)
    

    function  updateMarketCap(){
      fetch(process.env.NEXT_PUBLIC_AUTO_UPDATE, {
        method: 'PUT',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
       
      }).then((result) => result.json())
        .then((resp) => {
          //console.warn(resp)
          })
      }
  
    
    const refetch=()=>{
  
        fetch(process.env.NEXT_PUBLIC_ADMINALL)
        .then(res=>res.json())
        .then((data)=>{
          SetData(data.coinlist);
          setCount(count+1); 

        SetIsLoading(true)
      })}

   
   
      async function singleDataFetch(id)  {
        setrrset(true)
        setsingledataloading(false)
        const res = await fetch('api/admin/'+id);
        const result = await res.json();
        
        // fetch('api/admin/'+id)
        // .then(res=>res.json())
        // .then((data)=>{console.log("xxx",data)})
        // setCount(count+1);
        SetSingleData(result.coindoc[0]);
      setsingledataloading(true)
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
    
return <>

<div>
  <AdminMainHeader />
</div>
        <div>
          <Button  onClick={updateMarketCap}>
              Update Market Cap
            </Button>
          </div>
 <div  className="max-w-6xl  rounded-2xl overflow-hidden   mx-auto    py-5">
<div className="flex flex-row flex-wrap items-stretch">
<div className="basis-1/4 pr-2  shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor rounded-l-2xl ">
<AllCoinList data={data} evote={singleDataFetch} frmreset={rrset}/>
</div>
<div className="basis-3/4 shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor rounded-r-2xl ">
{singledataloading?<AdminListCoinForm data={singledata}/>:<div className="w-28  h-28  mt-72 mx-auto"><ThreeDots color='grey' height="100" width="100" ariaLabel='loading'/></div>}

</div>

</div>
</div>

</>
}

export default AdminConfigPage;