import { useEffect, useRef, useState } from "react";
import Button from "./button";
import Link from "next/link"
import { Bars} from  'react-loader-spinner'
import ReCAPTCHA from "react-google-recaptcha";
import ReactModal from "react-modal";


function TableRow(props){

   const [isoddnum, setIsoddNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(props.voteloading);
  const [voteid,setvoteid]=useState(0);
   const [ismodalopen, setismodalopen]=useState(false);
  
   const skey = process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY;

   //console.log("kkk",props);


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

 
  

   async function handleClick(){
    setIsLoading(false);
    setismodalopen(true);
    }
 

   useEffect(()=>{
    if(props.rank%2===0){
        setIsoddNumber(false);
    } else {
        setIsoddNumber(true);
    }
   setIsLoading(props.voteloading);
   //console.log("kkC",props);
   // console.log("do");
   },[props.rank,props.vote])

 


    return  (
      <>
    <ReactModal  isOpen={ismodalopen} style={customStyles} ariaHideApp={false}>
  
  <ReCAPTCHA
    //sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    //ref={reRef}
    sitekey= {skey}
    size='compact'
    theme="dark"
    onChange={(e)=>{setismodalopen(false);setIsLoading(false);props.evote(props.id,e,"allcoin"); props.votechange(false);  }}
  />
    </ReactModal>
    
      <tr   className= {isoddnum ? 'bg-lightgrey text-txtborderColor' : ' bg-bodygray  text-txtborderColor'} >
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{props.rank}</td>
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap"><Link href={`/${props.id}`}><a>{props.coinname}</a></Link></td>
    <td className="hidden md:table-cell text-sm  font-light px-6 py-4 whitespace-nowrap">{props.price}</td>
    <td className="hidden md:table-cell text-sm  font-light px-6 py-4 whitespace-nowrap">{props.mcap}</td>
    <td className="hidden md:table-cell text-sm  font-light px-6 py-4 whitespace-nowrap">{props.launchdate}</td>
    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">      
      {/* <Button onClick={handleClick}>{!isLoading? <Bars color='white' height="30" width="30" ariaLabel='loading'/>:`🚀${props.vote}`}</Button> */}
      <Button onClick={()=>{setvoteid(props.id);handleClick()}}>{!isLoading && props.id===voteid? <Bars color='white' height="30" width="30" ariaLabel='loading'/>:`🚀${props.vote}`}</Button>
      {/* <Button onClick={handleClick}>🚀{props.vote}</Button> */}
    </td>
  </tr> 
  

  
  </>
  
  
  
  ) 
}

export default TableRow;