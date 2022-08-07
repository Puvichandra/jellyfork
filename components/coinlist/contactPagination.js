import Image from "next/image";
import { useState, useEffect } from "react";
// import { getAllPromoted } from "../../dummy-data";

import { ThreeDots} from  'react-loader-spinner'
import ContactTableRow from "../ui/contactrow";





function ContactPagination(props){
  
    const promotedMsg=props.data.contactmsg;
    const [isLoading, setIsLoading] = useState(false)
    const [pcaption, setpcaption] = useState("")
    const rank=1;

   // console.log("ddd", promotedMsg)

    useEffect(()=>{
     
     if(!promotedMsg || promotedMsg.length>0) {
        //console.log(promotedMsg)
       setIsLoading(false);
       setpcaption('Loading Messages')
     } else {
      setIsLoading(true);
      setpcaption('Loading Messages...')
     }
   
      },[])



    return <div className="py-20">
   
<div  className="max-w-6xl rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey ">

<div className="py-4">
<div className=" text-2xl lg:text-4xl  text-txtborderColor font-poppins pl-10 py-4 inline"> {pcaption} </div>

<div className="inline pl-5">
<Image className="pt-4" src="/img/mine-trolley.jpg"  alt="No Image" width={50} height={50} /> 
</div>
{isLoading?<div className="inline-block mt-10 ml-10"><ThreeDots color='white' height="50" width="50" ariaLabel='loading'/></div>:null}
</div>

<div className="pb-8">
<div className="flex flex-col bg-transparent mx-4 border-bodygray border-solid border-2 rounded-xl">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-6 lg:px-8 ">
      <div className="overflow-hidden">
        <table className="min-w-full ">
          <thead className="bg-bodygray border-b font-poppins">
            <tr className="text-txtborderColor">
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Rank
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Date Rec.
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Name & Email
              </th>
              {/* <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
               Email
              </th> */}
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
               Purpose
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
               Action
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
               Status
              </th>

              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
               Menu
              </th>

              
            </tr>
          </thead>
          <tbody>
            
         {promotedMsg?promotedMsg.map((message)=><ContactTableRow  key={message._id} id={message._id} rank={rank++} datereceived={message.datereceived} 
             username={message.username} useremail={message.useremail} userpurpose={message.userpurpose} useraction={message.action} currentstatus={message.checked}/>):null} 


         
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  
</div>

</div>



    </div>
}

export default ContactPagination;