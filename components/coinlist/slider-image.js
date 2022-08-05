import Image from 'next/image';
import Slider from 'react-slick';
import React, { Component } from "react";
import Link from 'next/link';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  

export default class AutoPlay extends Component {

 

  render() {

    const pnft=this.props.nftCurrentData
    // console.log("kkk",pnft)

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: this.props.slidenumber,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

   
    return (
        <div>
       <div>
    <div className="max-w-6xl text-2xl lg:text-4xl  text-txtborderColor font-poppins pl-5 py-10 mx-auto" >
     Promoted NFT Collection
   </div>
   </div>   
    <Slider {...settings}>

    {pnft.map((nft)=>
    
  
    <div key={nft._id} className='bg-bodygray text-center   inline w-auto ' >
    <div className='bg-lightgrey mx-1 py-5  rounded-2xl' style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>
    
    <a href= {nft.nftlink} rel="noreferrer" target="_blank"><Image className='object-center' src={nft.nftimage} alt="nft one" width={250} height={250} /></a>
    <p className='text-center text-txtborderColor'>{nft.nftname}</p>
    </div>
    </div> )}
  
          </Slider>
        </div>
      );
  }
} 

