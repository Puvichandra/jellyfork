import React from "react";
import  classes from "../frame.module.css";

const Time = (props) => {
    return (
        <div className={classes.time}>
            <p>{props.content}</p>
        </div>
    );
}

export default Time;