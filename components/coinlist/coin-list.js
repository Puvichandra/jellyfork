import Image from "next/image";
import { useState, useEffect } from "react";
// import { getAllPromoted } from "../../dummy-data";
import PromotedRow from "../ui/promotedrow";
import { ThreeDots} from  'react-loader-spinner';
import Link from 'next/link';





function CoinList(props){
    const promotedCoin=props.data;
    const [isLoading, setIsLoading] = useState(false);
  
    const [pcaption, setpcaption] = useState("");
    //const [isvote,setvote] = useState(false)
   
    const rank=1;
    //console.log("GGG",props.voteloading);

    // function voteloadingfun(){
    //   setvote(true);
    // }

    useEffect(()=>{
     
     if(promotedCoin.length>0) {
       setIsLoading(false);
       setpcaption('Promoted Coins')
     } else {
      setIsLoading(true);
      setpcaption('Loading Promoted Coins...')
     }
    
     
   
      },[promotedCoin,props])



    return <div className="py-20">
    
   
{/* <div  className="max-w-6xl rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey "> */}

<div className="max-w-6xl text-2xl lg:text-xl  text-white hover:text-txtborderColor font-poppins text-right  mx-auto"> 
<Link href="/contact/contact-form"><a>Advertise</a></Link></div>
<div  className="max-w-6xl rounded-2xl overflow-hidden  mx-auto   bg-lightgrey " style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>

<div className="pt-4  pb-4 ">
<div className=" text-2xl lg:text-4xl  text-txtborderColor font-poppins pl-10 py-4 inline"> {pcaption} </div>


<div className="inline pl-5 pt-10">
<Image className="pt-4" src="/img/mine-trolley.jpg" width={40} height={35} /> 
</div>

{isLoading?<div className="inline-block mt-10 ml-10"><ThreeDots color='white' height="50" width="50" ariaLabel='loading'/></div>:null}
</div>


   

   
  <div className="pb-4">
<div className="flex flex-col bg-transparent mx-4 border-bodygray border-solid border-2 rounded-xl">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-6 lg:px-8 ">
      <div className="overflow-hidden">
        <table className="min-w-full ">
          <thead className="bg-bodygray border-b font-poppins">
            <tr className="text-txtborderColor">
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Rank
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Coin Name
              </th>
              <th scope="col" className="hidden md:table-cell text-sm font-medium  px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" className="hidden md:table-cell text-sm font-medium  px-6 py-4 text-left">
                Market Cap
              </th>
              <th scope="col" className="hidden md:table-cell text-sm font-medium  px-6 py-4 text-left">
                Launch Date
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Votes
              </th>
            </tr>
          </thead>
          <tbody>
            
            {promotedCoin.map((coin)=><PromotedRow key={coin._id} id={coin._id} rank={rank++} coinname={coin.coinname}  price={coin.price} mcap={coin.marketcap} launchdate={coin.daysago} vote={coin.votes} evote={props.evote} voteloading={props.voteloading} votechange={props.votechange}/>)}


         
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  
</div>



<div className="max-w-6xl text-2xl lg:text-xl pl-10 text-white hover:text-txtborderColor font-poppins text-left pb-4  "> 
<Link href="/contact/contact-form"><a>Promote Coin</a></Link></div>

</div>



    </div>
}

export default CoinList;