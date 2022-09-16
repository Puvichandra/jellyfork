import { useEffect, useRef, useState } from "react";
import Button from "./button";
import Link from "next/link"
import { Bars} from  'react-loader-spinner'
import ReCAPTCHA from "react-google-recaptcha";
import ReactModal from "react-modal";
import { set } from "nprogress";

export default function Chihuarow(props) {
    const [isoddnum, setIsoddNumber] = useState(false);
   
    const [isLoading,setisLoading]=useState(false);
    const [ismodalopen, setismodalopen]=useState(false);
    
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
    const [tlink,setTlink] =useState('');
    //console.log(props);
    
  
     async function handleClick(){
       setisLoading(true)
       setismodalopen(true);
      }
    
  
     useEffect(()=>{
      if(props.rank%2===0){
          setIsoddNumber(false);
      } else {
          setIsoddNumber(true);
      }
     setisLoading(props.isLoading);
     //console.log("kkC",props);
     // console.log("do");
     },[props.rank,props.vote,props.isLoading])
  
     const checkValid = ()=>{
        if(document.getElementById(`${props.id}`).value.length<5){
            alert("Please enter your telegram link")
            return
        } else {
            const text= document.getElementById(`${props.id}`).value.trim()
            //console.log(text)
            if(text.charAt(0)!=="@"){
                alert("Please enter '@' prior to User Name")
                return
            } else {
                setTlink(document.getElementById(`${props.id}`).value)
                handleClick()
            }
           
        }
     }
  

   
     
  
      return  (
        <>
      <ReactModal  isOpen={ismodalopen} style={customStyles} ariaHideApp={false}>
    
    <ReCAPTCHA
      //sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      //ref={reRef}
      sitekey= {skey}
      size='compact'
      theme="dark"
      onChange={(e)=>{setismodalopen(false);props.chihuavote(e,props.coinname,tlink);document.getElementById(`${props.id}`).value=''; }}
    />
      </ReactModal>
      
        <tr   className= {isoddnum ? 'bg-lightgrey text-txtborderColor' : ' bg-bodygray  text-txtborderColor'} >
      <td className="pl-2 xl:px-6 py-4  text-sm font-medium ">{props.rank}</td>
      <td className="text-sm  font-light pl-2 xl:px-6 py-4 "><Link href={`/${props.id}`}><a>{props.coinname}</a></Link></td>
      <td className="text-sm after:font-light pl-2 xl:px-6 py-4  text-black"><input className="w-28 md:w-auto" id={props.id} type="text"/></td>
      <td className="text-sm  font-light pl-2 xl:px-6 py-4 ">      
        {/* <Button onClick={handleClick}>{!isLoading? <Bars color='white' height="30" width="30" ariaLabel='loading'/>:`🚀${props.vote}`}</Button> */}
       {/* <Button className="px-2" onClick={()=> {checkValid()}}>{isLoading? <Bars color='white' height="30" width="30" ariaLabel='loading'/>:`${props.vote}`}</Button> */}
        <Button className="px-2" onClick={()=>{checkValid()}}> {props.vote}</Button>
        {/* <Button onClick={handleClick}>🚀{props.vote}</Button> */}
      </td>
    </tr> 
    
  
    
    </>
    
    
    
    ) 

}
