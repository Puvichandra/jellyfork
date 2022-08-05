import React from "react";
import Profile from "./Profile";
import  classes from "../frame.module.css";

const ProfileInfo = (props)=> {
    return(
        <div className={classes.profileinfo}>
            <p>
                {props.label}
                <a href={props.link} target='_blank'  without rel="noreferrer">
                    <span className={classes.authorname}> {props.author}</span>
                    
                    </a>
            </p>
        </div>
    );
}

export default ProfileInfo;