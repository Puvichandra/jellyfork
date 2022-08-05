import { useEffect, useState } from "react";
import Button from "./button";
import Link from "next/link"
import { Bars} from  'react-loader-spinner'
import ReCAPTCHA from "react-google-recaptcha";
import ReactModal from "react-modal";
import Router from 'next/router'

function AdTableRow(props){

   const [isoddnum, setIsoddNumber] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [ismodalopen, setismodalopen]=useState(false);
   const [issinglepage, setSinglePageLoad] =useState(false);

   //console.log("nbn",props)

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
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{props.adposition}</td>
    <td className="px-6 py-4 wrap text-sm font-medium w-48">{props.adimage}</td>
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">{props.fromdate}</td>
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">{props.todate}</td>
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">{props.adactive}</td>
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">      
     <Button onClick={()=>{Router.push(`/updatead/${props.id}`)}}>Edit</Button>
     {/* <Button onClick={handleClick}>{!isLoading? <Bars color='white' height="30" width="30" ariaLabel='loading'/>:"Delete"}</Button> */}
    </td>
  </tr></>) 
}




export default AdTableRow;