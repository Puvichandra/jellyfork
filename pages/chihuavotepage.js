import React, { useEffect, useState } from 'react';
import Chihuacom from "../components/coinlist/chihuavotecomp"
import Popup from "../components/popup/popup"

export default function Chihuavotepage() {
 const [coinarray, setCoinArray] = useState([])
 const [count,setCount] =useState(0);
 const [isLoading,setisLoading] = useState(false);
    

 async function  fetchChihuavote() {
      await fetch('api/chihuvote').then (res=>res.json()).then (data=>{setCoinArray(data.message);
        })
      setisLoading(false)
    }

    useEffect(()=>{
        fetchChihuavote();
       
    },[count])

    function chihuavote(captcha_response, coinname, tlink){
       // console.log(captcha_response)
   
        //console.log("mm",pno)
        const dd={coinname:coinname, tlink:tlink, captcha:captcha_response}
        //console.log("kj",dd)
    
        fetch(process.env.NEXT_PUBLIC_BURN_VOTE, {
          method:'POST',
          body:JSON.stringify(dd),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then((response)=>response.json())
        .then((data)=>{ console.log(data.message); 
            data.message==='added' ? console.log("Data Added"): console.log("Data not Added");
            setCount(count+1)
        });
       
        
    
     }
  return (


    <div>
    <Popup />
       <Chihuacom chihuavote={chihuavote} coinlist={coinarray} isLoading={isLoading} setisLoading={setisLoading} count={count}/> 
    </div>
  )
}
