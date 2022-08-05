import React from "react";
import  classes from "../frame.module.css";

const Info = (props) => {
    return (
        <p className={classes.info}>
            {props.content}
        </p>
    );
}

export default Info;