import { useForm } from "react-hook-form";
import Button from '../ui/button'
import Image from 'next/image'
// import { ImageUpload } from '../ui/upload-preview'
import { useEffect, useRef, useState } from "react";
import { BallTriangle} from  'react-loader-spinner'
import Router from 'next/router';
import  Axios  from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Watch } from  'react-loader-spinner';






function AdUpdateForm(props){
    const [adid, setAdId] = useState("");
    const [adposition, setAdPosition] = useState("");
    const [adimage,setAdImage] =useState("");
    const [oldadimage,setOldAdImage]=useState("");
    const [fromdate,setFromDate] =useState("");
    const [todate,setToDate] =useState("");
    const [adactive,setAdActive] =useState("");
    const [adlink,setAdLink] =useState("");
    const [isLoading,SetIsLoading]=useState("false")
    const imgref=useRef(null);
    const [imagePreview,setimagePreview] = useState();
    const [imagedata,setimagedata] = useState({file:'', imageblob:''});
    const [imagecloud,setimagecloud] = useState('');

    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'top-banner', text: 'Top Banner'},
        {value: 'mid-left', text: 'Middle Left'},
        {value: 'mid-right', text: 'Middle Right'},
        {value: 'bottom-banner', text: 'Bottom'},
      ];
   
      function updateAddData()
 
      {
        SetIsLoading(false);
        let item={adid,adposition,adimage,fromdate,todate,adactive,adlink,oldadimage}
        if(imagecloud){
          const formData = new FormData();
         // console.log("hhh",imagecloud);
          formData.append("file", imagecloud);
          formData.append("upload_preset", "akcblzz9");
          //Axios.post("http://api.cloudinary.com/v1_1/dp9yoy7js/image/upload", formData)
          Axios.post(process.env.NEXT_PUBLIC_CLOUD_URL, formData)
          .then((response)=>
         { item.adimage=response.data.secure_url;
          updateAdUpdateData(item);
         
        }).catch ((e)=>{
          SetIsLoading(false);
          alert("error  loading  picture in cloudinary")
        })
        } else {
          item.adimage=props.data[0].adimage;
          updateAdUpdateData(item);
        }
      
      
       
      }
  
    function updateAdUpdateData(item) {
    SetIsLoading(false);
    //let item={adid,adposition,adimage,fromdate,todate,adactive,adlink}
    //console.warn("item",item)
    //C:\Users\91770\jf-next-app\pages\api\adapidata.js
    fetch('/api/adapidata', {
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


  const _handleImageChange=(e) =>{
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        alert("Choose Correct picture format jpg/jpeg/png/gif")
        setimagedata({file:'', imageblob:''});
        e.target.value=null;
       return false;
      } else {
        reader.onloadend = () => { 
          setimagedata({ file: file,
          imagePreviewUrl: reader.result});
          setimagecloud(file)
          }
        }
     reader.readAsDataURL(file)
   }
  
  
      function getContactMessage() {
        SetIsLoading(false);
        setAdId(props.data[0]._id)
        setAdPosition(props.data[0].adposition);
        setAdImage(props.data[0].adimage);
        setOldAdImage(props.data[0].adimage);
        setFromDate(props.data[0].fromdate);   
        setToDate(props.data[0].todate);
        setAdActive(props.data[0].adactive);
        setAdLink(props.data[0].adlink);
      
        SetIsLoading(true)
      }
    
  
  useEffect(()=>{
   
    if (imagedata.file) {
      
        setimagePreview (<img className="mx-auto px-5 py-5" src={imagedata.imagePreviewUrl } alt="No Image" onClick={(e)=>{console.log(e.clientX + " - " +e.clientY)}} />);
        
      } else {
        //setimagedata({file:{adimage}, imageblob:''})
        //setimagePreview (<div className="text-txtborderColor font-poppins text-sm">Select Image</div>);
        setimagePreview (<img className="mx-auto px-5 py-2" src={adimage} alt="No Image"/>)
      }
 
      getContactMessage();
      //setimagePreview (<img className="mx-auto px-5 py-2" src={adimage}/>)
      
  } ,[props.data._id,imagedata,adimage])
  
  
  
      return (
      <>
      {!isLoading ? (<div className="w-screen h-screen"><div className="absolute left-1/2 top-1/2 text-center w-14 h-14 mx-auto "><Watch  height="100"  width="100"  color='white'  ariaLabel='loading'  /></div></div>):(
      
          <div className="py-5 ">
     
          <div  className="max-w-4xl  mx-auto overflow-hidden shadow-md  border-2 border-txtborderColor rounded-xl p-5">
  
          <div className="inline pr-2 text-txtborderColor text-2xl text-center font-bold font-poppins  pl-10">
              Admin Control Panel Adverisement
           </div> 
        
          <div className='px-10 pt-10 '>
       
            <div>
            <div>
          <label className='text-txtborderColor  pb-10 text-left text-md md:text-xl'>Select Ad Banner</label>
          </div>
          <select  className="bg-bodygray w-1/2   font-poppins border-2 text-txtborderColor border-txtborderColor py-1 " 
            value={adposition} onChange={(e)=>{setAdPosition(e.target.value)}} >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          
          </div>
          

          <div className="pt-10">   
        
        <input className="text-txtborderColor font-poppins text-sm text-center overflow-hidden" 
              type="file" 
              ref={imgref}
              
              onChange={(e)=>_handleImageChange(e)}
              onLoad={(e)=>setChandra()}
               />
            <div className="w-full  h-32  border-2 border-solid border-txtborderColor rounded-lg mx-auto">
            {imagePreview}
           </div>
           </div> 


           <div className='w-1/2  '>
            <label className='text-txtborderColor  text-left text-md md:text-xl '>From Date</label>
            <div className='w-full'>
            <input className="bg-bodygray w-full  text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
             value={fromdate}
              type="date"
              placeholder="From Date"
              onChange={(e)=>{setFromDate(e.target.value)}}
              />
              
            </div>
           </div>


           <div className='w-1/2  '>
            <label className='text-txtborderColor  text-left text-md md:text-xl '>To Date</label>
            <div className='w-full'>
            <input className="bg-bodygray w-full  text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
             value={todate}
              type="date"
              placeholder="To Date"
              onChange={(e)=>{setToDate(e.target.value) }}
            />
             
            </div>
           </div>


           <div className='w-1/2 text-txtborderColor '>
          <div>
          <label className='text-txtborderColor pb-10 text-left text-md md:text-xl'>Activate </label>
          </div>
            <div className='w-full md:pr-5'>
            <select  className="bg-bodygray w-full  font-poppins border-2  border-txtborderColor py-1" 
            value={adactive}  onChange={(e)=>{setToDate(e.target.value) }}
           >
              
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
              
            </select>
            </div>
          </div>


         <div className='w-1/2 md:basis-2/6 md:inline-block block '>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl'>Ad Link</label>
            <div className='md:pr-5'>
            <input className="bg-bodygray text-txtborderColor  w-full font-poppins border-2 border-txtborderColor py-1"
            value={adlink}
            type="text"
            placeholder="Ad Web Link"
            onChange={(e)=>{setAdLink(e.target.value) }}
            />
           
            </div>
           </div> 
  
            {/* <div className="flex flex-row">
           <div className="w-1/4 marker:inline pr-2 text-txtborderColor text-sm  font-bold font-poppins">
            From Date
           </div> 
  
           <div className="w-1/4 text-white inline pr-2" >
              {fromdate}
           </div>
  
           <div className="w-1/4 inline pr-2 text-txtborderColor text-sm  font-bold font-poppins">
             To date
           </div> 
           <div className="w-1/4 text-white inline pr-2">
              {todate}
           </div>
           </div> 
           
           <div className="flex flex-row">
           <div className="w-1/4 inline pr-2 text-txtborderColor text-sm  font-bold font-poppins ">
              Activate 
           </div> 
           <div className="w-1/4 text-white inline pr-2" >
              {adactive}
           </div>
          </div>
           <div className=" pr-2 text-txtborderColor text-sm  font-bold font-poppins pt-4">
             Ad Link
           </div>  */}
           {/* <div className="text-white inline pr-2">
              {adlink}
           </div> */}
  
  
          {/* <form  onSubmit={handleSubmit(onSubmit)}  > */}
          {/* <div className="w-full flex flex-row">
          <div className=' w-1/4 text-txtborderColor pt-8  inline-block'>
            <div>
            <label className='text-txtborderColor pb-10 text-left text-xl'>Action</label>
            </div>
              <div className='w-full pr-5'>
              <select  className="bg-bodygray w-full  font-poppins border-2  border-txtborderColor py-1" 
              value={contactaction}
              onChange={(e)=>{setAdPosition(e.target.value)}}>
            
                
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
        
  
  
     
              
                </div> */}
  
                
               
                
  
              
    
  
  
          
            {/* <div className='w-full inline-block'>
              <label className='text-txtborderColor pb-10 text-left text-xl '>Remarks</label>
              <div>
              <textarea id="description" className="bg-bodygray w-full text-txtborderColor  font-poppins border-2 border-txtborderColor"
                placeholder="Description" rows="5" 
                value={contactremarks}
                onChange={(e)=>{setContactremarks(e.target.value)}}
               />
                </div>
             </div> */}
  
    
        
  
          
         
            <div className='text-center pt-10'>
              <Button  onClick={updateAddData}>
                Update
              </Button>
            
            
            </div>
          
      </div>
              
            </div>
            
          </div>
  )
  } </>)
  }

export default AdUpdateForm;