import Image from "next/image";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllcoins } from "../../dummy-data";
import TableRow from "../ui/tablerow";
// import Pagination from "./page-comp";
import PageComponent from "./page-comp";
import PaginatedItems from "./pagination";
import Pagination from "./pagination";




function AllTimeData(){
  // const [currentPage, setCurrentPage] = useState(1)

    const data= getAllcoins();
   
    const promotedCoin=[];
    for(const key in data){
        promotedCoin.push(
           { id:data[key].id,
            rank:parseInt(key)+1,
            coinname:data[key].coinName,
            price:data[key].price,
            mcap:data[key].marketcap,
            vote:data[key].vote,
            launchdate:data[key].launchDate
           }
        )
    }


    
  return (
    <div className="py-20">
   
<div  className="max-w-6xl rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey ">

<div className="py-4">
<div className=" text-2xl lg:text-4xl  text-txtborderColor font-poppins pl-10 py-4 inline">
  Top Coins Today
</div>
</div>

<div className="py-5 my-5">
<button className="border-2 border-txtborderColor text-txtborderColor rounded-2xl px-10 font-poppins text-2xl inline mx-8"> All Time</button>
<button className="border-2 border-txtborderColor text-txtborderColor rounded-2xl px-10 font-poppins text-2xl inline"> Today</button>
</div>

<div className="pb-8">
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
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Market Cap
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Launch Date
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Votes
              </th>
            </tr>
          </thead>
          <tbody>
            
            {promotedCoin.map((coin)=><TableRow key={coin.id} id={coin.id} rank={coin.rank} coinname={coin.coinname}  price={coin.price} mcap={coin.mcap} launchdate={coin.launchdate} vote={coin.vote}/>)}


         
          </tbody>
        </table>
      </div>
    </div>
   </div>
  
</div>

  
</div>

</div>



    </div>)

    
}

export default AllTimeData;