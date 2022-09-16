
import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import { getAllcoins } from "../../dummy-data";

import TableRow from "../ui/tablerow";
//import  "./pagination.module.css";
import { ThreeDots} from  'react-loader-spinner'




function SecPaginatedItems(props) {
    
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [caption, setcaption]=useState('Loading...');
    const [isLoading, setIsLoading] = useState(false);
    const [isalltime, setAllTime] = useState(false);
    const [isvoteloading, setvoteloading]= useState(true);
    const [eventselect, setEventSelect]=useState(0);
    const itemsPerPage=6;
    const promotedCoin=props.data;
    let rank=itemOffset+1;
    //console.log(promotedCoin)


   useEffect(()=>{
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  setCurrentItems(promotedCoin.slice(itemOffset, endOffset));
  setPageCount(Math.ceil(promotedCoin.length / itemsPerPage));
  if(promotedCoin.length>0) {
    setIsLoading(false);
    setcaption('');
    
    
  } else {
    setIsLoading(true);
    setcaption('Loading Top Coins List ...')
  }
   setvoteloading(props.voteloading);
   },[itemOffset, itemsPerPage, isalltime,promotedCoin])



    const handlePageClick = (event) => {
      setEventSelect(event.selected)
      
      //const newOffset = (event.selected * itemsPerPage) % promotedCoin.length;
      const newOffset = (event.selected * itemsPerPage) % promotedCoin.length;
    //   console.log(
    //     `User requested page number ${event.select}, which is offset ${newOffset} pagecount ${pageCount} itemperpage ${itemsPerPage} data length ${promotedCoin.length}`
    //   );
      setItemOffset(newOffset);
     
    };


  
    return (
    
      <>
   

   <div className="py-1">
   
   
  
   <div className="py-1">
   <div className=" text-2xl lg:text-4xl  text-txtborderColor font-poppins pl-10 py-6 inline">
   {caption}
   </div>
   {isLoading?<div className="inline-block mt-10 ml-10"><ThreeDots color='white' height="50" width="50" ariaLabel='loading'/></div>:null}
   </div>
   

  
  
  
   <div className="pb-1">
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
                 <th scope="col" className="hidden md:table-cell  text-sm font-medium  px-6 py-4 text-left">
                   Price
                 </th>
                 {/* <th scope="col" className="hidden md:table-cell text-sm font-medium  px-6 py-4 text-left">
                   Market Cap
                 </th> */}
                 <th scope="col" className="hidden md:table-cell text-sm font-medium  px-6 py-4 text-left">
                   Launch Date
                 </th>
                 <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                   Votes
                 </th>
               </tr>
             </thead>
             <tbody>
               
               {currentItems.map((coin,index)=><TableRow key={index} id={coin.id} rank={rank++} coinname={coin.coinname}  
               price={coin.price} mcap={coin.mcap} launchdate={coin.launchdate} vote={coin.vote} evote={props.evote} 
               voteloading={props.voteloading} votechange={props.votechange} networkchain={coin.networkchain}/>)}

               
   
   
            
             </tbody>
           </table>
         </div>
       </div>
      </div>
     
 

   </div>

   <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
   </div>
   </div>
        
      
      </> 
    )
  }

  

  export default SecPaginatedItems;