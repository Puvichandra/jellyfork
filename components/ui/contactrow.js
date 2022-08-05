import { useEffect, useState } from "react";
import Button from "./button";
import Link from "next/link"
import { Bars} from  'react-loader-spinner'
import ReCAPTCHA from "react-google-recaptcha";
import ReactModal from "react-modal";
import Router from 'next/router'

function ContactTableRow(props){

   const [isoddnum, setIsoddNumber] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [ismodalopen, setismodalopen]=useState(false);
   const [issinglepage, setSinglePageLoad] =useState(false);

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

 
  

   function handleClick(){
    setismodalopen(true);
    Router.pus
   }
 

   useEffect(()=>{
    if(props.rank%2===0){
        setIsoddNumber(false);
    } else {
        setIsoddNumber(true);
    }
    setIsLoading(true);
   },[props.vote,props.rank])

 


    return  (
      <>
    <ReactModal  isOpen={ismodalopen} style={customStyles} ariaHideApp={false}>
  
  <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={()=>{setismodalopen(false);setIsLoading(false);props.evote(props.id);}}
  />
    </ReactModal>
      <tr   className= {isoddnum ? 'bg-lightgrey text-txtborderColor' : ' bg-bodygray  text-txtborderColor'} >
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{props.rank}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{props.datereceived}</td>
    <td className="text-sm  font-light px-6 py-4 "><Link href={`/contact/${props.id}`}><a>{props.username} - {props.useremail}</a></Link></td>
    {/* <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">{props.useremail}</td> */}
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">{props.userpurpose}</td>
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">{props.useraction}</td>
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">{props.currentstatus}</td>
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">      
     <Button onClick={()=>{Router.push(`/contact/${props.id}`)}}>Edit</Button>
     {/* <Button onClick={handleClick}>{!isLoading? <Bars color='white' height="30" width="30" ariaLabel='loading'/>:"Delete"}</Button> */}
    </td>
  </tr></>) 
}




export default ContactTableRow;