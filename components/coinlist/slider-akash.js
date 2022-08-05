import React from 'react'
import  classes from '../coinlist/slider.module.css';
import Link from 'next/link'
import Image from 'next/image'



const slider = (props) => {

        const nftonedata=props.nftCurrentData;
        const nfttwodata=props.nftCurrentData;
        const nftthreedata=nftonedata.concat(nfttwodata)
    
  return (
    <div className={classes.slider}>
        <div className={classes.slide__track}>

        {nftthreedata.map((nft)=>(
            <Link href={nft.nftlink}><a >
            <div className={classes.slide}>
   
                <Image className="object-center" src={nft.nftimage} alt="dog"   height={350} width={334} />
                <h3>{nft.nftname}</h3>
            </div>
            </a></Link>
        ))}
 
        </div>
        
    </div>
  )
}

export default slider