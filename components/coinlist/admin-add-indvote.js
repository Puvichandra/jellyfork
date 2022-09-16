import Button from "../ui/button";
import axios from 'axios';
import { useForm } from "react-hook-form";

function AdminAddIndividualVote(props){

    const { register,   formState:{errors}, handleSubmit, } = useForm({
        mode:'onTouched',      
        });

        const onSubmit = dd=>{
            if(!dd.vote||dd.vote<1){
                alert("Please Enter Positive number")
                return;
            }
         
           updateDbase(dd)  

    
       }
   

    const updateDbase=(dd)=>{
        fetch(process.env.NEXT_PUBLIC_ADMIN_IND_VOTE, {
        method:'POST',
        body:JSON.stringify(dd),
         headers:{
           'Content-Type': 'application/json'
         }
       }).then((res)=>res.json())
      .then((data)=>{console.log("ddd",data);
      })
      .catch((e)=>{
        console.log("error in updating")
        });
    }




    return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-rows px-10 flex-wrap gap-5 pt-10">
             <div className='basis-2/6  inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Coin Id</label>
            <div>
            <input  className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1 disabled"
              type="text"
              value={props.contractAddress}
              {...register("coinid", {required:true}) }       
            />
            </div>
           </div>

          <div >
           <div className='basis-2/6'>
            <label className='text-txtborderColor pb-10 text-left text-xl '>Vote</label>
            <div>
            <input  className="bg-bodygray w-full text-txtborderColor font-poppins border-2 border-txtborderColor py-1"
              type="number"
              placeholder="vote"   
              {...register("vote", {required:true}) }          
            />
            </div>
           </div>
           </div>
            <div className="pt-6">
           <div className='basis-2/6 inline '>
         
           <Button type="submit" >
              Submit
            </Button>
          
           </div>
           </div>
           </div>
           </form>

    </>)
}

export default AdminAddIndividualVote;