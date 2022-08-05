import React from "react";
import  classes from "../frame.module.css";

const Heading = (props) => {
    return (
        <h3 className={classes.heading}>
            {props.content}
        </h3>
    );
}

export default Heading;