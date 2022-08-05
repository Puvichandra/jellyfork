import { useForm } from "react-hook-form";
import Button from '../ui/button'
import Image from 'next/image'
// import { ImageUpload } from '../ui/upload-preview'
import { useEffect, useState } from "react";
import { Watch } from  'react-loader-spinner'


function ContactDetailForm(props){
  const [contactid, setContactId] = useState("");
  const [contactusername, setContactusername] = useState("");
  const [telegramlink,setTelegramlink] =useState("");
  const [contactuseremail,setContactuseremail] =useState("");
  const [contactuserpurpose,setContactuserpurpose] =useState("");
  const [contactusermessage,setContactusermessage] =useState("");
  const [contactaction,setContactaction] =useState("");
  const [contactchecked,setContactchecked] =useState("");
  const [contactdatereceived,setContactdatereceived] =useState("");
  const [contactremarks,setContactremarks] =useState("");
  const [isLoading, SetIsLoading] = useState(false)
  // console.log("mmm",props)

  function updateMessageAction() {
  SetIsLoading(false);
  let item={contactid,telegramlink,contactaction,contactchecked,contactremarks}
  //console.warn("item",item)
  fetch('../api/contact/contactapi', {
    method: 'PUT',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(item)
  }).then((result) => {
    result.json().then((resp) => {
      //console.warn(resp);
     
     SetIsLoading(true);
    })
  })
}


    function getContactMessage() {
      SetIsLoading(false);
      setContactId(props.data[0]._id)
      setContactusername(props.data[0].username);
      setTelegramlink(props.data[0].teleusername);
      setContactuseremail(props.data[0].useremail);   
      setContactuserpurpose(props.data[0].userpurpose);
      setContactusermessage(props.data[0].usermessage);
      setContactaction(props.data[0].action);
      setContactchecked(props.data[0].checked);
      setContactdatereceived(props.data[0].datereceived);
      setContactremarks(props.data[0].remarks);
      SetIsLoading(true)
    }
  

useEffect(()=>{
    getContactMessage();
} ,[props.data._id])



    return (
    <>
    {!isLoading ? (<div className="w-screen h-screen"><div className="absolute left-1/2 top-1/2 text-center w-14 h-14 mx-auto "><Watch  height="100"  width="100"  color='white'  ariaLabel='loading'  /></div></div>):(
    
        <div className="py-5 ">
   
        <div  className="max-w-4xl  mx-auto overflow-hidden shadow-md  border-2 border-txtborderColor rounded-xl p-5">

        <div className="inline pr-2 text-txtborderColor text-2xl text-center font-bold font-poppins  pl-10">
            Admin Control Panel for Messages
         </div> 
      
        <div className='px-10 pt-10 '>
            <div className="flex flex-row">
          <div className="w-1/4 inline pr-2 text-txtborderColor text-sm  font-bold font-poppins">
            Name: 
         </div> 
         <div className="w-1/4 text-white inline pr-10">
            {contactusername}
         </div>
         <div className="w-1/4 inline pr-2 text-txtborderColor text-sm  font-bold font-poppins">
            Email: 
         </div>
         <div className="w-1/4 text-white inline pr-2">
            {contactuseremail}
         </div>
         </div>

          <div className="flex flex-row">
         <div className="w-1/4 marker:inline pr-2 text-txtborderColor text-sm  font-bold font-poppins">
            Telegram Link: 
         </div> 

         <div className="w-1/4 text-white inline pr-2" >
            {telegramlink}
         </div>

         <div className="w-1/4 inline pr-2 text-txtborderColor text-sm  font-bold font-poppins">
            Date Received: 
         </div> 
         <div className="w-1/4 text-white inline pr-2">
            {contactdatereceived}
         </div>
         </div> 
         
         <div className="flex flex-row">
         <div className="w-1/4 inline pr-2 text-txtborderColor text-sm  font-bold font-poppins ">
            Purpose: 
         </div> 
         <div className="w-1/4 text-white inline pr-2" >
            {contactuserpurpose}
         </div>
        </div>
         <div className=" pr-2 text-txtborderColor text-sm  font-bold font-poppins pt-4">
            Message: 
         </div> 
         <div className="text-white inline pr-2">
            {contactusermessage}
         </div>


        {/* <form  onSubmit={handleSubmit(onSubmit)}  > */}
        <div className="w-full flex flex-row">
        <div className=' w-1/4 text-txtborderColor pt-8  inline-block'>
          <div>
          <label className='text-txtborderColor pb-10 text-left text-xl'>Action</label>
          </div>
            <div className='w-full pr-5'>
            <select  className="bg-bodygray w-full  font-poppins border-2  border-txtborderColor py-1" 
            value={contactaction}
            onChange={(e)=>{setContactaction(e.target.value)}}>
          
              
              <option value="Executed">Executed</option>
              <option value="Rejected">Rejected</option>
              <option value="suspended">suspended</option>
              
            </select>
            </div>
          </div>


          <div className='w-1/4 text-txtborderColor pt-8  inline-block'>
          <div>
          <label className='text-txtborderColor pb-10 text-left text-xl'>Current Status</label>
          </div>
            <div className='w-full pr-5'>
            <select  className="bg-bodygray w-full  font-poppins border-2  border-txtborderColor py-1" 
            value={contactchecked}
            onChange={(e)=>{setContactchecked(e.target.value)}}>
          
              
              <option value="Awaiting">Awaiting</option>
              <option value="Opened">Opened</option>
              <option value="Closed">Closed</option>
              
            </select>
            </div>
          </div>

          <div className='w-2/4 pt-8  inline-block'>
        
        <div className='px-5'>
        <div className='w-full inline-block'>
        <label className='text-txtborderColor pb-10 text-left text-xl '>Telegram Link</label>
        <div className="w-full">
        <input className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
          type="text"
          value={telegramlink}
          onChange={(e)=>{ setTelegramlink(e.target.value)}}
        
        />
         
           </div>
       </div>
        
        </div>
       </div>
      


   
            
              </div>

              
             
              

            
  


        
          <div className='w-full inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Remarks</label>
            <div>
            <textarea id="description" className="bg-bodygray w-full text-txtborderColor  font-poppins border-2 border-txtborderColor"
              placeholder="Description" rows="5" 
              value={contactremarks}
              onChange={(e)=>{setContactremarks(e.target.value)}}
             />
              </div>
           </div>

  
      

        
       
          <div className='text-center pt-10'>
            <Button  onClick={updateMessageAction}>
              Update
            </Button>
          
          
          </div>
        
    </div>
            
          </div>
          
        </div>
)
} </>)
}

export default ContactDetailForm;