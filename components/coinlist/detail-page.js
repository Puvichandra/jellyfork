



import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '../ui/button';
import { Bars } from  'react-loader-spinner'
import ReactModal from "react-modal";
import ReCAPTCHA from "react-google-recaptcha";

function DetailPageCoin(props){
    //console.log(props.data[0])
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
    

      //console.log('ddd',props);
    const [ismodalopen,setismodalopen]=useState(false);
    const[captcha, setCaptcha]=('')

    function handleClick(){
      setismodalopen(true)
    }
  
  

  
   return <>
   <ReactModal  isOpen={ismodalopen} style={customStyles} ariaHideApp={false}>
  
  <ReCAPTCHA
    sitekey= {skey}
    onChange={(e)=>{setismodalopen(false);props.evote(props.data[0]._id,e)}}
  />
    </ReactModal>

<div className="w-full md:w-11/12 2xl:w-8/12  mx-auto py-20 flex flex-row flex-wrap gap-1" >
{/* <div  className="w-full  md:w-3/6 2xl:px-5 rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  inline-block mr-2 "> */}
<div  className="w-full  md:w-3/6 2xl:px-5 rounded-2xl overflow-hidden  mx-auto   bg-lightgrey  inline-block mr-2 " style={{ boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>
<div className='p-2'>
<div className="inline-block px-3" >
    <Image className=' rounded-full object-center' src={props.data[0].coinimage} alt="nftone" width={100} height={100} />
</div>
<div className='inline-block'>
    <div className='text-2xl lg:text-4xl  text-txtborderColor font-poppins  font-bold pl-10 pb-2' >
     {props.data[0].coinname}
   </div>
   <div className='pl-2'>
   <button className="border-2 border-txtborderColor text-white bg-txtborderColor rounded-2xl px-5 font-poppins text-lg mx-8">  {props.data[0].coinsymbol}</button>
   </div>
   </div>
</div>


<div className="text-txtborderColor py-5 px-2">
    <p >{props.data[0].description}</p>
</div>
<div className="flex flex-row flex-wrap py-5  justify-evenly">

{props.data[0].twitterlink?<div className='basis-1 py-2 '>
<a type='button'  className="border-2 border-txtborderColor text-txtborderColor rounded-2xl px-5 font-poppins text-lg inline mx-2 "> Twitter</a>
</div> :null}

{props.data[0].websitelink?
<div className='basis-1 py-2 pl-5 2xl:pl-0'>
<a href={props.data[0].websitelink} type='button' target="_blank" rel="noopener noreferrer"  className="border-2 border-txtborderColor text-txtborderColor rounded-2xl px-5 font-poppins text-lg inline mx-2" > Website</a>
</div>:null}

{props.data[0].telegramlink?
<div className='basis-1 py-2 '>
<a type='button' href={props.data[0].telegram} className="border-2 border-txtborderColor text-txtborderColor rounded-2xl px-5 font-poppins text-lg inline mx-2 "> Telegram</a>
</div>:null}

{props.data[0].facebooklink?
<div className='basis-1 py-2 pl-0 lg:pl-8'>
<a type='button' href={props.data[0].facebook} className="border-2 border-txtborderColor text-txtborderColor rounded-2xl px-5 font-poppins text-lg inline mx-2"> Facebook</a>
</div>:null}
</div>
</div>

<div  className="w-full md:w-2/6 rounded-2xl overflow-hidden  mx-auto   bg-lightgrey px-2 inline-block " style={{ boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px",marginLeft:"2px"}} >
<div className="py-5 pl-5 ">
<p className='text-2xl lg:text-4xl  text-txtborderColor font-poppins  font-bold pl-10 pb-2'>Stats</p>
<p className="py-2 text-txtborderColor text-xl font-poppins">Price: ${props.data[0].price}</p>
<p className="py-2 text-txtborderColor text-xl font-poppins">Market Cap: {props.data[0].marketcap}</p>
<p className="py-2 text-txtborderColor text-xl font-poppins">Launch Date: {props.data[0].launchdate}</p>
<p className="py-2 text-txtborderColor text-xl font-poppins">Total Votes: {props.data[0].votes}</p>
<p className="py-5 text-txtborderColor font-poppin">Have you voted?</p>
{/* <Button onClick={()=>{setIsLoading(true);props.evote();}}>{isLoading?<Watch  height="30"  width="30"  color='grey'  ariaLabel='loading'  />:"Vote"}</Button> */}
<Button onClick={handleClick}>{props.loadingstate?<Bars  height="30"  width="30"  color='white'  ariaLabel='loading'  />:"Vote"}</Button>
</div>
</div>
</div> 
    </>
}
 


export default DetailPageCoin;