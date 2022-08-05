
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import Router from 'next/router';
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ReactModal from "react-modal";

function ContactFormComponent(){

    const { register,   formState:{errors}, handleSubmit, } = useForm({
        mode:'onTouched',
      
        });

        const [notify,setNotify] =useState(false);
        const [isLoading, setIsLoading] = useState(false)
        const [iscaptcha, setIsCaptcha] = useState(false);
         const [captcha, setCaptcha] = useState('');
        const skey = process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY;

        const customStyles = {
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        };

        const messagesent=()=>{
          alert("Message sent");
          setIsLoading(false); 
          setNotify(true)
          Router.reload(window.location.pathname)
        }

        const messageNotsent=(message)=>{
          alert(message);
          setIsLoading(false); 
          setNotify(true)
        }
      

        const onSubmit = dd => {
           dd.captcha=captcha;
            setIsLoading(true)
            fetch('../api/contact/contactapi', {
              method:'POST',
              body:JSON.stringify(dd),
              headers:{
                'Content-Type': 'application/json'
              }
            }).then((response)=>response.json())
            .then((data)=>{data.message==='Message added' ? messagesent():messageNotsent()});
             setNotify(false);
    
        }

      
   
    return   (

    
 
<div className="py-5">

{/* <div  className="max-w-2xl rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  py-5"> */}
<div  className="max-w-2xl rounded-2xl overflow-hidden  mx-auto   bg-lightgrey  py-5" style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>
 <div className="text-4xl text-txtborderColor font-poppins font-bold text-center pb-10"> Contact Us</div>
 <ul className="pl-10 w-3/4 md:w-1/3 ml-10 py-5 border-solid border-2 border-txtborderColor rounded-2xl">
    <li className="text-sm text-txtborderColor font-poppins  "> 1. To Promote you Coins</li>
    <li className="text-sm text-txtborderColor font-poppins  "> 2. To Promote your NFT</li>
    <li className="text-sm text-txtborderColor font-poppins  "> 3. To Advertise in this site</li>
 </ul>


        <form  onSubmit={handleSubmit(onSubmit)}  >
             
           
          <div className="py-2 mx-10">
          <label className='text-txtborderColor pb-10 font-poppins text-left text-md md:text-xl py-2' >Name</label>
          <input  className="bg-bodygray w-full text-txtborderColor font-poppins border-2 
          border-txtborderColor py-1 mx-auto rounded-lg"  type="text" required 
          {...register("username", {required:true,minLength:3, maxLength:10}) }
          />
              <p className="text-red-400">
               {errors.username?.type==="required" && "User Name is Required"}
               {errors.username?.type==="minLength" && "Minimum 3 letters required"}
               {errors.username?.type==="maxLength" && "Maximum 10 letters required"}
              </p>
           </div>

           <div className="py-2 mx-10">
          <label className='text-txtborderColor pb-10 font-poppins text-left md:text-xl py-2 text-md'>Telegram Username(To contact back)</label>
          <input  className="bg-bodygray w-full text-txtborderColor font-poppins border-2 
          border-txtborderColor py-1 mx-auto rounded-lg" type="text"
          {...register("teleusername", {required:false}) }
          />
            <p className="text-red-400">
               {errors.teleusername?.type==="required" && "Telegram Link is Required"}
              </p>
           </div>

           <div className="py-2 mx-10">
          <label className='text-txtborderColor pb-10 font-poppins text-left text-md py-2 md:text-xl '>Email</label>
          <input  className="bg-bodygray w-full text-txtborderColor font-poppins border-2 
          border-txtborderColor py-1 mx-auto rounded-lg" type="email" required 
          {...register("useremail", {required:true, pattern: /^\S+@\S+$/i,}) }
          />
           <p className="text-red-400">
               {errors.useremail?.type==="required" && "Email is Required"}
               {errors.useremail?.type==="pattern" && "Enter Valid Email"}
              </p>
           </div>

           <div className="py-2 mx-10">
          <label className='text-txtborderColor pb-10 font-poppins text-left text-md md:text-xl py-2'>Purpose</label>
          <select  className="bg-bodygray w-full 
          text-txtborderColor font-poppins border-2  border-txtborderColor py-1 rounded-lg" 
          {...register("userpurpose", {required:true}) }>
          <option value="Advertise">Others</option>
          <option value="Promote Coin">To Promote Coin</option>
          <option value="Promote NFT">To Promote NFT</option>
          <option value="Advertise">To Advertise</option>
           
            </select>
          
           </div>

           <div className="py-2 mx-10">
          <label className='text-txtborderColor pb-10 font-poppins text-left text-md md:text-xl py-2 '>Message</label>
          <textarea className="bg-bodygray w-full text-txtborderColor  
          font-poppins border-2 border-txtborderColor rounded-lg"
              placeholder="Description" rows="5"   
              {...register("usermessage", {required:true,minLength:10, maxLength:200}) }   
            />
             <p className="text-red-400">
               {errors.usermessage?.type==="required" && "Message is Required"}
               {errors.usermessage?.type==="minLength" && "Minimum 10 letters required"}
               {errors.usermessage?.type==="maxLength" && "Maximum 200 letters required"}
                           </p>
           </div>

          <div className="py-2 text-center">
          <div className=" w-4/5 md:w-2/5 mx-auto   ">
          <ReCAPTCHA
        //sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        //ref={reRef}
        sitekey= {skey}
        onChange={(e)=>{setIsCaptcha(true);setCaptcha(e); }}
      />
      </div>
          {iscaptcha?<Button  type="submit">submit</Button>:null}
          </div>
         
          </form>

          </div>
          </div>
       
  
  
)}

export default ContactFormComponent;