import Image from "next/image";
import { useState } from "react";
// import { getAllPromoted } from "../../dummy-data";
// import TableRow from "../ui/tablerow";




function AllCoinList(props){
    const [cid, setcid]=useState('')

   // const data= getAllPromoted();
    // console.log(data);

    const handleClick=(_id)=>{
        props.evote(_id)
    }
    const promotedCoin=props.data;
    
    return <div className="py-5">
   
<div  className="max-w-sm rounded-2xl ">

<div className="py-4">
<div className=" text-2xl lg:text-4xl  text-txtborderColor font-poppins pl-10 py-4 inline">
    All Coins
</div>
{/* <div className="inline pl-5">
<Image className="pt-4" src="/img/mine-trolley.jpg" width={50} height={50} /> 
</div> */}
</div>

<div className="pb-8">
<div className="flex flex-col bg-transparent mx-4 ">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-6 lg:px-8 ">
      <div className="overflow-y-auto">
      <ul>
      
      {promotedCoin.map((coin)=><li key={coin._id} className="text-txtborderColor font-poppins font-bold py-2 text-lg " onClick= {()=>{props.evote(coin._id); return false;}}>{coin.coinname}</li> )}
     
      
      </ul>
        
            
            
          


         
        
      </div>
    </div>
  </div>
</div>
  
</div>

</div>



    </div>
}

export default AllCoinList;