import { useForm } from "react-hook-form";
import Button from '../ui/button'
import Image from 'next/image'
// import { ImageUpload } from '../ui/upload-preview'
import { useEffect, useState } from "react";
import { Watch } from  'react-loader-spinner';
import  Axios  from "axios";
import AdminAddIndividualVote from "./admin-add-indvote";


function AdminListCoinForm(props){
  const [imagedata,setimagedata] = useState({file:'', imageblob:''});
  const [imagePreview,setimagePreview] = useState();
  const [imagecloud,setimagecloud] = useState('');
  const [cid, setCid] = useState("");
  const [cname, setCoinName] = useState("");
  const [symbol,setCoinsymbol] =useState("");
  const [network,setCoinnetwork] =useState("");
  const [launchdate,setCoinLaunchdate] =useState("");
  const [listingstatus,setCoinlstatus] =useState("");
  const [caddress,setContractAddress] =useState("");
  const [cdesc,setCdescription] =useState("");
  const [weblink,setweblink] =useState("");
  const [twitter,settwitterlink] =useState("");
  const [chartlink,setchartlink] =useState("");
  const [reddit,setredditlink] =useState("");
  const [discord,setdiscordlink] =useState("");
  const [telegram,settelegramlink] =useState("");
  const [marketcap,setmarketcap] =useState("");
  const [activatecoin,setactivatecoin] =useState(false);
  const [promoted,setpromoted] =useState(false);
  const [divideval, setDivideValue] = useState(1000000)
  const [vote,setvote] =useState(0);
  const [cimage,setcimage] =useState('');
  const [isLoading, SetIsLoading] = useState(false)
  

    



 function updateCoindata()
 
{
  SetIsLoading(false);
  let item={cid,cimage,cname,symbol,network,launchdate,listingstatus,caddress,cdesc,weblink,twitter,chartlink,reddit,
    discord,telegram,activatecoin,promoted,divideval,vote}
  if(imagecloud){
    const formData = new FormData();
    //console.log("hhh",imagecloud);
    formData.append("file", imagecloud);
    formData.append("upload_preset", "akcblzz9");
    
   // Axios.post("http://api.cloudinary.com/v1_1/dp9yoy7js/image/upload", formData)
   Axios.post(process.env.NEXT_PUBLIC_CLOUD_URL, formData)
   
    .then((response)=>
   { item.cimage=response.data.secure_url;
    updateCoindataNew(item);
   
  }).catch ((e)=>{
    SetIsLoading(false);
    alert("error  loading  picture in cloudinary")
  })
  } else {
    item.cimage=props.data.coinimage;
    updateCoindataNew(item);
  }


 
}

//--------------------------------update coin data-------------
const updateCoindataNew=(item) =>{
  //console.warn("item",item)
  fetch(process.env.NEXT_PUBLIC_COIN_LIST_URL, {
    method: 'PUT',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(item)
  }).then((result) => {
    result.json().then((resp) => {
      //console.warn(resp)
     SetIsLoading(true)
    })
  })
}




//-----------------




    function getCoindata() {
      SetIsLoading(false);
      setCid(props.data._id)
      setCoinName(props.data.coinname);
      setCoinsymbol(props.data.coinsymbol);
      setCoinnetwork(props.data.networkchain);   
      setCoinLaunchdate(props.data.launchdate);
      setCoinlstatus(props.data.listingstatus);
      setContractAddress(props.data.contractaddress);
      setCdescription(props.data.description);
      setweblink(props.data.websitelink);
      settwitterlink(props.data.twitterlink);
      setchartlink(props.data.chartlink);
      setredditlink(props.data.redditlink);
      setdiscordlink(props.data.discordlink);
      settelegramlink(props.data.telegramlink);
      setactivatecoin(props.data.activateCoin);
      setpromoted(props.data.ispromoted);
      setvote(props.data.votes);
      setcimage(props.data.coinimage)
      setDivideValue(props.data.divideval)
      SetIsLoading(true)
    }
  

    const _handleImageChange=(e) =>{
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
          if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
          alert("Choose Correct picture format jpg/jpeg/png/gif")
          setimagedata({file:'', imageblob:''});
          e.target.value=null;
         return false;
        } else {
          reader.onloadend = () => { 
            setcimage(reader.result)
            setimagedata({ file: file,
              imagePreviewUrl: reader.result});
              setimagecloud(file)
            }
  
         
        }
    
    
      reader.readAsDataURL(file)
   
    }

useEffect(()=>{
 
  getCoindata();
setimagedata({file:{cimage}, imageblob:''})
//console.log(imagedata)
  if (imagedata) {
    setimagePreview (<img src={cimage } alt="No Image" onClick={(e)=>{console.log(e.clientX + " - " +e.clientY)}} />);
    
  } else {
    setimagedata({file:{cimage}, imageblob:''})
    setimagePreview (<div className="text-txtborderColor font-poppins text-sm">Select Image</div>);
    
  }
} ,[props.data.coinname])



    return (
      
    <>
       
     
    {!isLoading ? (<div className="text-center w-14 mx-auto mt-72"><Watch  height="100"  width="100"  color='grey'  ariaLabel='loading'  /></div>):(
    
    <div className="py-5">
    {/* <ImageUpload/> */}
        <div  className="max-w-4xl  overflow-hidden shadow-md ">
        {/* <div  className="w-64  h-64 rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  "> */}
        {/* <ImageUpload /> */}
        {/* <Image src="/img/nftone.png" alt= "No Data" width={250} height={250} />
           </div> */}
<div className='px-10 pt-10 '>


        {/* <form  onSubmit={handleSubmit(onSubmit)}  > */}
        <div className="w-full flex flex-row">
        <div className=' w-1/4 text-txtborderColor pt-8  inline-block'>
          <div>
          <label className='text-txtborderColor pb-10 text-left text-xl'>Activate</label>
          </div>
            <div className='w-full pr-5'>
            <select  className="bg-bodygray w-full  font-poppins border-2  border-txtborderColor py-1" 
            value={activatecoin}
            onChange={(e)=>{setactivatecoin(e.target.value)}}>
          
              
              <option value="true">Activate</option>
              <option value="false">Disable</option>
              
            </select>
            </div>
          </div>


          <div className='w-1/4 text-txtborderColor pt-8  inline-block'>
          <div>
          <label className='text-txtborderColor pb-10 text-left text-xl'>Promote Coin</label>
          </div>
            <div className='w-full pr-5'>
            <select  className="bg-bodygray w-full  font-poppins border-2  border-txtborderColor py-1" 
            value={promoted}
            onChange={(e)=>{setpromoted(e.target.value)}}>
          
              
              <option value="true">Promote</option>
              <option value="false">Demote</option>
            
              
            </select>
            </div>
          </div>

          <div className='w-1/4 pt-8  inline-block'>
        
        <div className='px-5'>
        <div className='w-full inline-block'>
        <label className='text-txtborderColor pb-10 text-left text-xl '>Vote</label>
        <div className="w-full">
        <input className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
          type="text"
          value={vote}
          onChange={(e)=>{setvote(parseInt(e.target.value))}}
          placeholder="Coin Name"
        />
         
           </div>
       </div>
        
        </div>
       </div>
      


        <div  className="w-24  h-32 object-contain   rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  inline-block "> 
            
        <input className="text-txtborderColor font-poppins text-sm text-center overflow-hidden" 
              type="file" onChange={(e)=>_handleImageChange(e)}
              onLoad={(e)=>setChandra()}
               />
            <div className="w-24 h-24  border-2 border-solid border-txtborderColor rounded-lg mx-auto">
            <Image src={cimage} alt="no image" width={250} height={250} /> 
           </div>
             
              </div>
            
              </div>

              
              
              

        <div className='flex flex-row py-2'>
          <div className='basis-1/2 inline-block'>
        
            <div className='pr-5'>
            <div className='w-full inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Coin Name</label>
            <div className="w-full">
            <input  className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="text"
              value={cname}
              onChange={(e)=>{setCoinName(e.target.value)}}
               />
            
               </div>
           </div>
            
            </div>
           </div>

           <div className='basis-1/2 inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Coin Symbol</label>
            <div>
            <input id="coinsymbol"className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="text"
              value={symbol}
              onChange={(e)=>{setCoinsymbol(e.target.value)}}
              placeholder="Coin Symbol"
            
            />
            
            </div>
           </div>
        </div>

            
          {/* <div>
            <label className='text-txtborderColor pb-10 text-left '>Chain/Network</label>
            <Field name="employed" component="input" type="checkbox" />
          </div> */}
          <div className='flex flex-row'>
          <div className='basis-4/6 text-txtborderColor  inline-block'>
          <div>
          <label className='text-txtborderColor pb-10 text-left text-xl'>Chain/Network</label>
          </div>
            <div className='w-full pr-5'>
            <select id="networkchain" className="bg-bodygray w-full  font-poppins border-2  border-txtborderColor py-1" 
              value={network}
              onChange={(e)=>{setCoinnetwork(e.target.value)}} >
          
              
              <option value="Ethereum">Ethereum</option>
              <option value="BNB">BNB</option>
              
            </select>
            </div>
          </div>

          <div className='basis-2/6 inline-block'>
            <label className='text-txtborderColor  text-left text-xl '>Launch Date</label>
            <div className='w-full'>
            <input id="launchdate" className="bg-bodygray w-full  text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="date"
              placeholder="Launch Date"
              value={launchdate}
              onChange={(e)=>{setCoinLaunchdate(e.target.value)}}
            />
            
            </div>
           </div>
            </div>


            <div className='flex flex-row py-2'>
            <div className='basis-1/6 text-txtborderColor  inline-block'>
          <div>
          <label className='text-txtborderColor pb-10 text-left text-xl'>Listing Status</label>
          </div>
            <div className='w-full pr-5'>
            <select id="listingstatus" className="bg-bodygray w-full  font-poppins border-2  border-txtborderColor py-1" 
              value={listingstatus}
              onChange={(e)=>{setCoinlstatus(e.target.value)}}
              >
              
              <option value="presale">Pre-Sale</option>
              <option value="listed">Listed</option>
              
            </select>
            </div>
          </div>

        

           <div className='basis-5/6 inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Contract Address</label>
            <div>
            <input id="contractaddress" className="bg-bodygray w-full  text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="text"
              placeholder="Contract Address"
              value={caddress}
              onChange={(e)=>{setContractAddress(e.target.value)}}
              
            
            />
           
            </div>
           </div>
        </div>

        
          <div className='w-full inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Description</label>
            <div>
            <textarea id="description" className="bg-bodygray w-full text-txtborderColor  font-poppins border-2 border-txtborderColor"
              placeholder="Description" rows="5" 
              value={cdesc}
              onChange={(e)=>{setCdescription(e.target.value)}}
             />
              </div>
           </div>

           <div className='flex flex-row py-2'>
          <div className='basis-2/6 inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl'>Website Link</label>
            <div className='pr-5'>
            <input id="websitelink" className="bg-bodygray text-txtborderColor  w-full font-poppins border-2 border-txtborderColor py-1"
              type="text"
              value={weblink}
              onChange={(e)=>{setweblink(e.target.value)}}
              placeholder="Website Link"            
                      />          
            </div>
           </div>

           <div className='basis-2/6 inline-block '>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Twitter Link</label>
            <div className='pr-5'>
            <input id="twitterlink" className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="text"
              value={twitter}
              onChange={(e)=>{settwitterlink(e.target.value)}}
              placeholder="Twitter Link"                   
            />
            </div>
           </div>

           <div className='basis-2/6  inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Chart Link</label>
            <div>
            <input id="chartlink" className="bg-bodygray w-full text-txtborderColor  font-poppins border-2 border-txtborderColor py-1"
              type="text"
              placeholder="Chart Link"
              value={chartlink}
              onChange={(e)=>{setchartlink(e.target.value)}}          
            />
            </div>
           </div>
        </div>

        <div className='flex flex-row py-2'>
          <div className='basis-2/6 inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl'>Reddit Link</label>
            <div className='pr-5'>
            <input id="redditlink" className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="text"
              value={reddit}
              onChange={(e)=>{setredditlink(e.target.value)}} 
              placeholder="Reddit Link"           
            />
            </div>
           </div>

           <div className='basis-2/6 inline-block '>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Discord Link</label>
            <div className='pr-5'>
            <input id="discordlink" className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="text"
              value={discord}
              onChange={(e)=>{setdiscordlink(e.target.value)}}
              placeholder="Discord Link"             
            />
            </div>
           </div>

           <div className='basis-2/6  inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Telegram Link</label>
            <div>
            <input id="telegramlink" className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="text"
              value={telegram}
              onChange={(e)=>{settelegramlink(e.target.value)}}
              placeholder="Telegram Link"             
            />
            </div>
           </div>

          <div>
           <div className='basis-2/6'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Divide Value</label>
            <div>
            <input  className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="text"
              value={divideval}
              onChange={(e)=>{setDivideValue(e.target.value)}}
              placeholder="Divide Value"             
            />
            </div>
           </div>
           </div>
        </div>  

      

        
       
          <div className='text-center pt-10'>
            <Button  onClick={updateCoindata}>
              Submit
            </Button>
          
            {/* <Button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </Button> */}
          </div>
          {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
        {/* </form> */}
   
    </div>
            
          </div>
          <div>
          <AdminAddIndividualVote  contractAddress={cid}/>
          </div>
         
        </div>
       
)
} </>)
}

export default AdminListCoinForm;