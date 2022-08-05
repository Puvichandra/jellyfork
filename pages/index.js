
import Head from 'next/head';
import { useEffect, useState } from 'react';
import CoinList from '../components/coinlist/coin-list';
import PaginatedItems from '../components/coinlist/pagination';

import Image from 'next/image';
import Slideer from '../components/coinlist/slider-akash'
import Script from 'next/script';





export default  function Home() {
  const [isLoading, SetIsLoading] = useState(false);
  const [data, SetData]=useState([]);
  const [todaydata, SetTodayData]=useState([]);
  const [promoteddata, SetPromotedData]=useState([]);
  const [count,setCount]=useState(0);
  const [isVote, setVote]=useState(true);
  const [isPromoVote, setPromoVote]=useState(true);
  const [ispagedata, setPageData]=useState(false);
  const [snum, setsnum] =useState(0);
  const promotedCoin=[];
  const todayCoin=[];
  const [topbanner,setTopBanner]=useState({});
  const [midleft,setMidLeft]=useState({});
  const [midright,setMidRight]=useState({});
  const [bottombanner,setBottomBanner]=useState({});
  const [nftCurrentData, setNftCurrentData]=useState([]);
 
  
  

 const fetchadData=()=>{
 
  fetch(process.env.NEXT_PUBLIC_AD_ADD_DATA)
  .then(res=>res.json())
  .then((data)=>{
    //console.log(data.adlist.length);
    for(let i=0;i<data.adlist.length;i++){
      if(data.adlist[i].adposition==='top-banner'){
        setTopBanner(data.adlist[i])
      } else if(data.adlist[i].adposition==='mid-left'){
        setMidLeft(data.adlist[i])
      } else if(data.adlist[i].adposition==='mid-right'){
        setMidRight(data.adlist[i])
      } else if(data.adlist[i].adposition==='bottom-banner'){
        setBottomBanner(data.adlist[i])
      }
     
     
    }

 
 })}

  const refetch=()=>{
    //SetIsLoading(false);
    
    fetch(process.env.NEXT_PUBLIC_COIN_LIST_URL)
    .then(res=>res.json())
    .then((data)=>{
      //console.log(data);

      for (const key in data.coinlist){
         promotedCoin.push(
           { id:data.coinlist[key]._id,
            //rank:parseInt(key)+1,
            coinname:data.coinlist[key].coinname,
            price:data.coinlist[key].price,
            mcap:data.coinlist[key].marketcap,
            vote:data.coinlist[key].votes,
            daysago:data.coinlist[key].daysago
           }
        )
      } 

      SetData(promotedCoin);
      setCount(count+1); 
      SetPromotedData(data.promoted)});
      
   
    SetIsLoading(true)
  }


 function getColor(innerWidth) {
    if (innerWidth <= 500) return setsnum(2)
    if (innerWidth <= 700) return setsnum(3)
    if (innerWidth <= 800) return setsnum(4)
    if (innerWidth <= 900) return setsnum(5)
    if (innerWidth <= 1000) return setsnum(5)
    if (innerWidth <= 1100) return setsnum(6)
    return setsnum(6)
}


  useEffect(()=>{ 
  // refetch();
   ///console.log("bbb",ispagedata);
   const slidenumber=getColor(window.innerWidth);
   getData(ispagedata);
   fetchadData();
   //alert(count);

  },[count, isVote])

  

//  function updatevote(id){
//      setVote(false);
//      fetch('api/votenow/'+id)
//     .then(res=>res.json())
//     .then((data)=>{console.log(data);})
//     setCount(count+1)
//     setVote(true);
//   }

  function updatevote(id, captcha_response,pno){
    if(pno==="allcoin"){
      setVote(false);
    } else if (pno==="procoin"){
      setPromoVote(false);
    }
    //console.log("mm",pno)
    const dd={dd:"none", captcha:captcha_response}

    fetch('api/votenow/'+id, {
      method:'POST',
      body:JSON.stringify(dd),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response)=>response.json())
    .then((data)=>{
      if(pno==="allcoin"){
        setVote(true);
      } else if (pno==="procoin"){
        setPromoVote(true);
      }
       console.log(data);
      data.message==='added' ? console.log("Data Added"): console.log("Data not Added")});
    setCount(count+1)
    

 }


 const todayVote=()=>{
 // SetIsLoading(false);
  fetch(process.env.NEXT_PUBLIC_INDIVIDUAL_VOTE).then((response)=>response.json())
  .then((data)=>{//console.log("nnn",data);
    for (const key in data.indcoin){
       todayCoin.push(
         { id:data.indcoin[key]._id,
          // rank:parseInt(key)+1,
          coinname:data.indcoin[key].coinlistdoc[0].coinname,
          price:data.indcoin[key].coinlistdoc[0].price,
          mcap:data.indcoin[key].coinlistdoc[0].marketcap,
          //vote:data.indcoin[key].coinlistdoc[0].votes,
          vote:data.indcoin[key].TotalVote,
         // data.indcoin[key]._id
          daysago:data.indcoin[key].coinlistdoc[0].daysago
         }
      )
    } 
    SetTodayData(todayCoin);
    //console.log("bbb",todaydata)
    setCount(count+1); 
    SetIsLoading(true);
    SetPromotedData(data.promoted);
   
  });
  //console.log("pr",promotedCoin)
 
}

//-------------------- get nft Data ----------------------------

const getnftData=()=>{
  fetch(process.env.NEXT_PUBLIC_NFT_DATA)
  .then ((response)=>response.json())
  .then((data)=>{setNftCurrentData(data.nftlist);})
}


//-----------------------------------------
 
const getData=(dd)=>{
   if (!dd || dd===undefined) {
    setPageData(false)
   } else if(dd) {
    setPageData(true)
   }

  // if(ispagedata){
  //   Todayvote();

  // } else {
  //   refetch();
   
  // }
  refetch();
  todayVote();
  getnftData();
  //console.log("fff",data)
}






  if(!isLoading){
    <div>
      Loading ....
    </div>
  }

  if(!data) {
    <div>
      No Data...
    </div>
  }
 


  return (
    <div className='bg-bodygray'>
      <Head>
        <title>Jellyfork</title>
        <meta name="description" content="Cryptocurrency ranking based on voting and Jellyfork offers website
and Dapp development services" />
        <link rel="icon" href="/favicon.png" />

        <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital@0;1&display=swap"
      rel="stylesheet"
       />
       <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 

      
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-53VS4MKY3B" strategy="afterInteractive"/>
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-53VS4MKY3B');`}
        </Script>

        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8775528236593052"
     crossorigin="anonymous"></Script>

      </Head>
        <div className='text-center pt-10'>
        {topbanner.adimage? <Image  src={topbanner.adimage} alt="no Image" width={900} height={90}/>:null}
        </div>
       
       <CoinList  data={promoteddata} evote={updatevote} voteloading={isPromoVote} votechange={setPromoVote}/>
      
      <div className='max-w-6xl flex flex-row flex-wrap  mx-auto'>
      <div className='basis-1/2 text-center pt-10'>
        {midleft.adimage?<Image  src={midleft.adimage} alt="no Image" width={320} height={100}/>:null}
        </div>
        <div className='basis-1/2 text-center pt-10'>
       {midright.adimage?<Image  src={midright.adimage} alt="no Image" width={320} height={100}/>:null}
        </div>
      </div>
       
     
    {/* <AutoPlay slidenumber={snum} nftCurrentData={nftCurrentData}/>   */}
    <Slideer nftCurrentData={nftCurrentData} />

    <div className='text-center pt-10'>
     {bottombanner.adimage?<Image  src={bottombanner.adimage} alt="no Image" width={900} height={90}/>:null}
        </div>
     
      <div className='mt-20'>
       <PaginatedItems  data={data} todayData={todaydata} evote={updatevote} voteloading={isVote} votechange={setVote} backdata={ispagedata} setPageData={setPageData}/> 
      </div>

    
    </div>

    
  )

  
}

//  export async function getServerSideProps(){
//   let documents;
//   let client;
 
//   try{
//     client=await connectDatabse('coindata');
// } catch {
//   console.log("database connection failed")
//     return;
// }

// try {
//     const db=client.db();
//     documents = await db.collection('coinlist').find({}).toArray();
   
// } catch {
//     console.log('Unable to get documents')
// }

// client.close();

// return {
//   props:{
//      data:JSON.parse(JSON.stringify(documents))
//     // data:documents
//       },
 
// };

// }  