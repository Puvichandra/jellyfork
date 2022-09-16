
import { useEffect, useState } from "react";
import Chihuarow from "../ui/chihuarow"
import Link from 'next/link'
import Image from 'next/image'
import { ThreeDots} from  'react-loader-spinner'

export default function Chihuavotecomp(props) {
    //const promotedCoin=props.data;
  const [isLoad, setIsLoad] = useState(false);
  const [pcaption, setpcaption] = useState("");
    //const [isvote,setvote] = useState(false)
   
    let rank=1;

    const cn=props.coinlist

    useEffect(()=>{
     //console.log(props.coinlist.length)
     if(props.coinlist.length>0) {
       setIsLoad(false);
       setpcaption('Voting Coins')
     } else {
      setIsLoad(true);
      setpcaption('Loading Voting Coins...')
     }
    
      },[props.coinlist.length, props.count])



    return <div className="py-20">
    
   

<div  className="max-w-6xl rounded-2xl  sm:overflow-scroll md:overflow-hidden mx-auto   bg-lightgrey " style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>

<div className="pt-4  pb-4 ">
<div className=" text-lg lg:text-4xl  text-white font-poppins pl-10 py-4 inline">
🔥200,000$ BURN CONTEST🔥
</div>
<div className=" text-lg lg:text-4xl  text-txtborderColor font-poppins pl-10 py-4 inline">
<p className="text-lg lg:text-xl px-10">Our smart contract will automatically buy and burn the leading token in the last 24hrs for each The Chihuahua Club NFT Minted , which will value 200,000$ when the entire collection is sold out!</p>
<small className="text-lg lg:text-xl px-10">The vote will not be counted if the user is not a member of <span><a className="text-red-400" href="https://t.me/TheChihuahuaClub">@TheChihuahuaClub</a></span></small>
</div>
{isLoad?<div className="inline-block mt-10 ml-10"><ThreeDots color='white' height="50" width="50" ariaLabel='loading'/></div>:null}
</div>


   

   
  <div className="pb-4">
<div className="flex flex-col bg-transparent mx-4 border-bodygray border-solid border-2 rounded-xl">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-2 lg:px-8 ">
      <div className="overflow-hidden ">
        <table className="min-w-full ">
          <thead className="bg-bodygray border-b font-poppins">
            <tr className="text-txtborderColor">
              <th scope="col" className="text-sm sm:font-thin xl:font-medium px-1 md:px-6 py-4 text-left">
                Rank
              </th>
              <th scope="col" className="text-sm sm:font-thin xl:font-medium px-1  md:px-6 py-4 text-left">
                Coin Name
              </th>
              <th scope="col" className="text-sm sm:font-thin  xl:font-medium px-1 md:px-6 py-4 text-left">
               TG user Name
              </th>
              <th scope="col" className="text-sm sm:font-thin xl:font-medium  px-1 md:px-6 py-4 text-left">
                Votes
              </th>
            </tr>
          </thead>
          <tbody>
            
            {cn.map((coin,index)=><Chihuarow key={index} id={index} rank={rank++} coinname={coin._id} 
             vote={coin.TotalVote} chihuavote={props.chihuavote} isLoading={props.isLoading} setisLoading={props.setisLoading}/>)}

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  
</div>


</div>



    </div>
}
