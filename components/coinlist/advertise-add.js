import { useForm } from "react-hook-form";
import Button from '../ui/button'
import Image from 'next/image'
// import { ImageUpload } from '../ui/upload-preview'
import { useEffect, useRef, useState } from "react";
import { BallTriangle} from  'react-loader-spinner'
import Router from 'next/router';
import  Axios  from "axios";
import ReCAPTCHA from "react-google-recaptcha";







function AdvertiseAddcomp(){

    const { register,   formState:{errors}, handleSubmit, } = useForm({
        mode:'onTouched',
      
        });

    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'top-banner', text: 'Top Banner'},
        {value: 'mid-left', text: 'Middle Left'},
        {value: 'mid-right', text: 'Middle Right'},
        {value: 'bottom-banner', text: 'Bottom'},
      ];

      const [selected, setSelected] = useState(options[0].value);
      const imgref=useRef(null);
      const [imagePreview,setimagePreview] = useState();
      const [imagedata,setimagedata] = useState({file:'', imageblob:''});
      const [imagecloud,setimagecloud] = useState('');
      const [imageSetting, setImageSetting]=useState('');
      const [imageOuterSetting, setImageouterSetting]=useState('');
      const [imageText, setImageText]=useState('');
      const skey = process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY;
      const [iscaptcha, setIsCaptcha] = useState(false);
      const [captcha, setCaptcha] = useState('');
      const [isLoading,setIsLoading]=useState(false);


      const handleChange = event => {
        //console.log(event.target.value);
        setSelected(event.target.value);
        ChangeControl();
      };

     function ChangeControl() {
        if (selected==='top-banner'){
            setImageSetting("w-full h-24  border-2 border-solid border-txtborderColor rounded-lg mx-auto");
            setImageouterSetting("w-full  h-32  object-contain   rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey")
            setImageText('width:320px  height:96px');
        } else if(selected==='mid-left'){
            setImageSetting("w-full h-24  border-2 border-solid border-txtborderColor rounded-lg mx-auto");
            setImageouterSetting("w-full  h-32  object-contain   rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey")
            setImageText('width:180px  height:96px')
        } else if(selected==='mid-right'){
            setImageSetting("w-full h-24  border-2 border-solid border-txtborderColor rounded-lg mx-auto");
            setImageouterSetting("w-full  h-32  object-contain   rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey")
            setImageText('width:180px  height:96px')
        }else if(selected==='bottom-banner'){
            setImageSetting("w-full h-24  border-2 border-solid border-txtborderColor rounded-lg mx-auto");
            setImageouterSetting("w-full  h-32  object-contain   rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey")
            setImageText('width:320px  height:96px')
        } else {
            setImageSetting("w-full h-24  border-2 border-solid border-txtborderColor rounded-lg mx-auto");
            setImageouterSetting("w-full  h-32  object-contain   rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey")
        }
     }

      const onSubmit = dd => {
        dd.captcha=captcha;
       // console.log(dd);
        setIsLoading(true)
        const formData = new FormData();
        formData.append("file", imagecloud);
        formData.append("upload_preset", "akcblzz9");
        process.env.
        
        //Axios.post("http://api.cloudinary.com/v1_1/dp9yoy7js/image/upload", formData)
        Axios.post(process.env.NEXT_PUBLIC_CLOUD_URL, formData)
        .then((response)=>
       { dd.adimage=response.data.secure_url;
       
        updateDbase(dd);
      }).catch ((e)=>{
        setIsLoading(false);
        alert("error  loading  picture in cloudinary")
      })
    }
    
    const updateDbase=(dd)=>{
        fetch(process.env.NEXT_PUBLIC_AD_ADD_DATA, {
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



      useEffect(()=>{
    
        if (imagedata) {
          setimagePreview (<img className="mx-auto px-5 py-2" src={imagedata.imagePreviewUrl } onClick={(e)=>{console.log(e.clientX + " - " +e.clientY)}} />);
          
        } else {
          setimagedata({file:'', imageblob:''})
          setimagePreview (<div className="text-txtborderColor font-poppins text-sm">Select Image</div>);
        }
        ChangeControl();
              
       },[imagedata,selected])


      return (

        <form onSubmit={handleSubmit(onSubmit)}  >
        <div className="py-5">
      
            <div  className="max-w-4xl rounded-2xl  overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  py-5">
            <div>
            <div>
          <label className='text-txtborderColor ml-10 pb-10 text-left text-md md:text-xl'>Select Ad Banner</label>
          </div>
          <select  className="bg-bodygray w-1/2  ml-10 font-poppins border-2 text-txtborderColor border-txtborderColor py-1 " 
            {...register("adposition", {required:true}) } value={selected} onChange={handleChange} >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <p className="text-red-400 text-center">
               {errors.adposition?.type==="required" && "Ad Position is Required"}
              </p>
        </div>

         <div className="pt-10">   
        <div  className={imageOuterSetting}> 
        <input className="text-txtborderColor font-poppins text-sm text-center overflow-hidden" 
              type="file" 
              ref={imgref}
              {...register("adimage", {required:true}) }
              onChange={(e)=>_handleImageChange(e)}
              onLoad={(e)=>setChandra()}
               />
            <div className="w-full  h-24  border-2 border-solid border-txtborderColor rounded-lg mx-auto">
            {imagePreview}
           </div>
             
              </div>
              </div>  
              <p className="text-red-400 text-center">{imageText}</p>  
              <p className="text-red-400 text-center">
               {errors.adimage?.type==="required" && "Ad image is Required"}
              </p>


              <div className='w-1/2  ml-5'>
            <label className='text-txtborderColor  text-left text-md md:text-xl '>From Date</label>
            <div className='w-full'>
            <input className="bg-bodygray w-full  text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="date"
              placeholder="From Date"
              {...register("fromdate", {required:true}) } 
            />
              <p className="text-red-400">
               {errors.fromdate?.type==="required" && "From Date is Required"}
              </p>
            </div>
           </div>

           
           <div className='w-1/2  ml-5'>
            <label className='text-txtborderColor  text-left text-md md:text-xl '>To Date</label>
            <div className='w-full'>
            <input className="bg-bodygray w-full  text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="date"
              placeholder="To Date"
              {...register("todate", {required:true}) } 
            />
              <p className="text-red-400">
               {errors.todate?.type==="required" && "To Date is Required"}
              </p>
            </div>
           </div>

           <div className='w-1/2 text-txtborderColor ml-5'>
          <div>
          <label className='text-txtborderColor pb-10 text-left text-md md:text-xl'>Activate </label>
          </div>
            <div className='w-full md:pr-5'>
            <select id="lstat" className="bg-bodygray w-full  font-poppins border-2  border-txtborderColor py-1" 
            {...register("adactive", {required:true}) } 
           >
              
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
              
            </select>
            </div>
          </div>

          <div className='w-1/2 md:basis-2/6 md:inline-block block ml-5'>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl'>Ad Link</label>
            <div className='md:pr-5'>
            <input className="bg-bodygray text-txtborderColor  w-full font-poppins border-2 border-txtborderColor py-1"
              type="text"
              placeholder="Ad Web Link"
             
              {...register("adlink",{ required:{ value:true, message:'Url is required' }, pattern:{ value:/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/, message:'Please enter a valid url'}})}
            
            />
            <p className="text-red-400">
               {errors.adlink?.type==="pattern" && "URL is Required"}
               
              </p>
            </div>
           </div>

          
          <div className="w-1/3 text-center mx-auto pt-5">
          <ReCAPTCHA
           sitekey= {skey}
           onChange={(e)=>{setIsCaptcha(true);setCaptcha(e); }}
           />
          </div>
                <div className="text-center pt-5">
                {iscaptcha ?<Button type="submit"  >
              Submit
            </Button>:null }

                </div>
          
              </div>
            </div>  


</form>

       
      );
    

}

export default AdvertiseAddcomp;