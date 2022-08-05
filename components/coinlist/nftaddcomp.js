import { useForm } from "react-hook-form";
import Button from '../ui/button'
import Image from 'next/image'
// import { ImageUpload } from '../ui/upload-preview'
import { useEffect, useRef, useState } from "react";
import { BallTriangle} from  'react-loader-spinner'
import Router from 'next/router';
import  Axios  from "axios";
import ReCAPTCHA from "react-google-recaptcha";







function Nftaddcomp(){

    
    
   // const [imagedata,setimagedata] = useState({file:'', imageblob:''});
    const [imagedata,setimagedata] = useState({file:'', imageblob:''});
    const [imagecloud,setimagecloud] = useState('');
    const [imageurl, setimageurl] =useState('');
    const [imagePreview,setimagePreview] = useState();
    const imgref=useRef(null);
    const [isLoading,setIsLoading]=useState(false);
    const [iscaptcha, setIsCaptcha] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const skey = process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY;
  
   
    const { register,   formState:{errors}, handleSubmit, } = useForm({
    mode:'onTouched',
    defaultValues:{
    nftlink:'https://'
    }
    });

   
   const uploadImage=()=>{
    const formData = new FormData();
    formData.append("file", imagecloud);
    formData.append("upload_preset", "akcblzz9");
    
    //Axios.post("http://api.cloudinary.com/v1_1/dp9yoy7js/image/upload", formData)
    Axios.post(process.env.NEXT_PUBLIC_CLOUD_URL, formData)
    .then((response)=>
   { 
    if(response.statusText="OK"){
    setimageurl(response.data.secure_url);
    
    }
      })
   }

  const onSubmit = dd => {
    dd.captcha=captcha;
    //console.log(dd);
    setIsLoading(true)
    const formData = new FormData();
    formData.append("file", imagecloud);
    formData.append("upload_preset", "akcblzz9");
    Axios.post("http://api.cloudinary.com/v1_1/dp9yoy7js/image/upload", formData)
    .then((response)=>
   { dd.nftimage=response.data.secure_url;
   
    updateDbase(dd);
  }).catch ((e)=>{
    setIsLoading(false);
    alert("error  loading  picture in cloudinary")
  })
}

const updateDbase=(dd)=>{
    fetch(process.env.NEXT_PUBLIC_NFT_DATA, {
    method:'POST',
    body:JSON.stringify(dd),
     headers:{
       'Content-Type': 'application/json'
     }
   }).then((res)=>res.json())
  .then((data)=>{//console.log("ddd",data);
  setIsLoading(false);window.location.reload(false);})
  .catch((e)=>{
    console.log("error in updating")
    setIsLoading(false);
    //window.location.reload(false);
  });
}



  // if (!image) {
  //   console.log('image is required');
  //   return false;
  //   }
  //   if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
  //     console.log('select valid image.');
  //    return false;
  //   }
  // const onImgLoad = ({ target: img }) => {
  //   const { offsetHeight, offsetWidth } = img;
  //   console.log(img.offsetWidth);
  // };

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

  const setImageSize = (setImageDimensions, imageUrl) => {
    if(!imageUrl===undefined){
    const img = new Image();
    img.src = imageUrl;
   
    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width
      });
      //console.log(setImageDimensions.height)
    };
  }
  };


  useEffect(()=>{
    
    if (imagedata) {
      setimagePreview (<img src={imagedata.imagePreviewUrl } alt="No Image" onClick={(e)=>{console.log(e.clientX + " - " +e.clientY)}} />);
      
    } else {
      setimagedata({file:'', imageblob:''})
      setimagePreview (<div className="text-txtborderColor font-poppins text-sm">Select Image</div>);
    }
  
  
  
    
   },[imagedata])
  
    


    
    return ( 

 
  
       
    <div className="py-5">
    {/* <ImageUpload/> */}
        <div  className="max-w-4xl rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  py-5">
        {/* <div  className="w-64  h-64 rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  "> */}
        {/* <ImageUpload /> */}
        {/* <Image src="/img/nftone.png" alt= "No Data" width={250} height={250} />
           </div> */}
           {isLoading ? <div className="relative w-full h-screen    my-28 ">
           <div className='absolute left-1/2 top-1/2 w-28  h-32  m-auto text-center text-txtborderColor text-2xl'><BallTriangle color='#9bbcd1' height="100" width="100" ariaLabel='loading'/> Updating...</div></div>:
<div className='px-10 pt-10 '>

   
        <form onSubmit={handleSubmit(onSubmit)}  >
        <div  className="w-24  h-32 object-contain   rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  "> 
        <input className="text-txtborderColor font-poppins text-sm text-center overflow-hidden" 
              type="file" 
              ref={imgref}
              {...register("nftimage", {required:true}) }
              onChange={(e)=>_handleImageChange(e)}
              onLoad={(e)=>setChandra()}
               />
            <div className="w-24 h-24  border-2 border-solid border-txtborderColor rounded-lg mx-auto">
            {imagePreview}
           </div>
             
              </div>
              <p className="text-red-400 text-center">
               {errors.nftimage?.type==="required" && "NFT image is Required"}
              </p>
             
              

        <div className='flex flex-row flex-wrap py-2'>
          <div className=' basis-full   md:basis-1/2 block md:inline-block'>
        
            <div className='md:pr-5'>
            <div className='w-full  '>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl '>NFT Name</label>
            <div className="w-full">
            <input className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="text"
              placeholder="NFT Name"
              {...register("nftname", {required:true}) }   />
              <p className="text-red-400">
               {errors.nftname?.type==="required" && "NFT Name is Required"}
              </p>
               </div>
           </div>
            
            </div>
           </div>

        </div>

            
        
        
          <div className='w-full inline-block'>
            <label className='text-txtborderColor pb-10 text-md md:text-xl '>Description</label>
            <div>
            <textarea className="bg-bodygray w-full text-txtborderColor  font-poppins border-2 border-txtborderColor"
              placeholder="Description" rows="8" 
              {...register("description", {required:true,maxLength:500}) } 
            />
             <p className="text-red-400">
               {errors.description?.type==="required" && "Description is Required"}
               {errors.description?.type==="maxLength" && "Maximum 500 characters"}
              </p>
            </div>
           </div>

           <div className='flex flex-row flex-wrap py-2'>
          <div className='basis-full md:basis-2/6 md:inline-block block'>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl'>Website Link</label>
            <div className='md:pr-5'>
            <input className="bg-bodygray text-txtborderColor  w-full font-poppins border-2 border-txtborderColor py-1"
              type="text"
              placeholder="Website Link"
             
              {...register("nftlink",{ required:{ value:true, message:'Url is required' }, pattern:{ value:/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/, message:'Please enter a valid url'}})}
            
            />
            <p className="text-red-400">
               {errors.nftlink?.type==="pattern" && "URL is Required"}
               
              </p>
            </div>
           </div>

          

         
        </div>

      


           

        
       
          <div className='text-center w-3/6 md:w-1/3 pt-4 md:mx-auto'>
          <div className="mx-auto">
          <ReCAPTCHA
        //sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        //ref={reRef}
        sitekey= {skey}
        onChange={(e)=>{setIsCaptcha(true);setCaptcha(e); }}
      />
      </div>
       <div className="py-4">
       {iscaptcha ?<Button type="submit"  >
              Submit
            </Button>:null }
            </div>
             </div>
          </form> 
   
    </div>}
            
          </div>
          
        </div>  )
  

}

export default Nftaddcomp;