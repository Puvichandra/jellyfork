import React from "react";
import ProfilePic from "./ProfilePic";
import ProfileInfo from "./ProfileInfo";
import  classes from "../frame.module.css";

const Profile = (props)=> {
    return(
        <div className={classes.profile}>
            <ProfileInfo label="Hire Us"  author="Now" link={props.link} />
        </div>
    )
}

export default Profile;