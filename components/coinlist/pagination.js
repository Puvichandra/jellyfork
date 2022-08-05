
import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import { getAllcoins } from "../../dummy-data";

import TableRow from "../ui/tablerow";
//import  "./pagination.module.css";
import { ThreeDots} from  'react-loader-spinner'




function PaginatedItems(props) {
    
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [caption, setcaption]=useState('Loading...')
    const [isLoading, setIsLoading] = useState(false)
    const [isalltime, setAllTime] = useState(false)
    const [isvoteloading, setvoteloading]= useState(true)
    //const [promotedCoin, setPromotedCoin] =useState([props.data])
    //const [data, setData]= useState(props.data)
    const itemsPerPage=6;
    let promotedCoin=props.todayData;
    //const [bkdata,setbkdata] = useState(props.ispagedata);
    let rank=itemOffset+1;
 
    


  //console.log("kkk",props.todayData);
// console.log("pm",promotedCoin.length);

   
   useEffect(()=>{
  
    if(isalltime){
      promotedCoin=props.data;
    }
     else if(!isalltime){
      promotedCoin=props.todayData;
     }

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  setCurrentItems(promotedCoin.slice(itemOffset, endOffset));
  setPageCount(Math.ceil(promotedCoin.length / itemsPerPage));
  if(promotedCoin.length>0) {
    setIsLoading(false);
    setcaption('Top Coins Today')
    
  } else {
    
    setIsLoading(true);
    setcaption('Loading Top Coins List ...')
  }
   setvoteloading(props.voteloading);
   },[itemOffset, itemsPerPage,isalltime,promotedCoin])


   
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % promotedCoin.length;
      // console.log(
      //   `User requested page number ${event.selected}, which is offset ${newOffset}`
      // );
      setItemOffset(newOffset);
    };


  
    return (
    
      <>
   

   <div className="py-20">
   
   {/* <div  className="max-w-6xl rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey "> */}
   <div  className="max-w-6xl rounded-2xl overflow-hidden  mx-auto   bg-lightgrey " style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>
   <div className="py-4">
   <div className=" text-2xl lg:text-4xl  text-txtborderColor font-poppins pl-10 py-4 inline">
    {caption}
   </div>
   {isLoading?<div className="inline-block mt-10 ml-10"><ThreeDots color='white' height="50" width="50" ariaLabel='loading'/></div>:null}
   </div>
   
   
   <div className="py-5 my-5">

   {isalltime ? <button  className="border-2 border-txtborderColor rounded-2xl px-10 font-poppins text-md md:text-2xl inline mx-8 text-lightgrey bg-txtborderColor" 
     onClick={()=>{setAllTime(true); }}> All Time</button> : <button  className="border-2 border-txtborderColor text-txtborderColor rounded-2xl px-10 font-poppins text-md md:text-2xl inline mx-8" 
     onClick={()=>{setAllTime(true);}}> All Time</button>  }

{!isalltime ? <button className="border-2 border-txtborderColor  rounded-2xl px-10 font-poppins text-md md:text-2xl inline text-lightgrey bg-txtborderColor"  onClick={()=>{props.setPageData(true);}}> Today</button> :
<button className="border-2 border-txtborderColor text-txtborderColor rounded-2xl px-10 font-poppins text-md md:text-2xl inline"  onClick={()=>{setAllTime(false)}}> Today</button> }
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
               
               {currentItems.map((coin,index)=><TableRow key={index} id={coin.id} rank={rank++} coinname={coin.coinname}  price={coin.price} mcap={coin.mcap} launchdate={coin.daysago} vote={coin.vote} evote={props.evote} voteloading={props.voteloading} votechange={props.votechange}/>)}

               
   
   
            
             </tbody>
           </table>
         </div>
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

  

  export default PaginatedItems;