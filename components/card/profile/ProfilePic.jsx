import React from "react";

const ProfilePic = (props)=> {
    return(
        <img className="profile-pic" src={props.source} alt="Artist picture"></img>
    );
}

export default ProfilePic;