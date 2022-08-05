import React from 'react'
import Pic from "./product/Pic";
import Text from "./product/Text";
import Profile from "./profile/Profile";
import classes from './frame.module.css'
import "swiper/css/bundle";


const Frame = (props) => {
  return (
    <div className={classes.frame}>
    <Pic source1={props.imgURL1} source2={props.imgURL2} source3={props.imgURL3} source4={props.imgURL4} />
    <Text name={props.name} description={props.description} beforePrice={props.beforePrice} afterPrice={props.afterPrice} timePeriod={props.timePeriod} />
    <Profile link={props.link} />
</div>
  )
}

export default Frame