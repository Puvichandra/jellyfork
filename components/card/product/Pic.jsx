import React from "react";
// import Overlay from "./Overlay";
import ArtPic from "./ArtPic";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import  classes from "../frame.module.css";

// import required modules
import { Pagination } from "swiper";


const Pic = (props) => {
    return (
        <div className={classes.art}>
            
            <Swiper pagination={true} modules={[Pagination]} className={classes.mySwiper}>
        <SwiperSlide>  <ArtPic source={props.source1} /></SwiperSlide>
        <SwiperSlide>  <ArtPic source={props.source2} /></SwiperSlide>
        <SwiperSlide>  <ArtPic source={props.source3} /></SwiperSlide>
        <SwiperSlide>  <ArtPic source={props.source4} /></SwiperSlide>
      </Swiper>

            {/* <ArtPic source={props.source} /> */}
            {/* <Overlay /> */}
        </div>
    );
}

export default Pic;