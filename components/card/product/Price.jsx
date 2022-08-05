import React from "react";
import  classes from "../frame.module.css";

const Price = (props) => {
    return (
        <div className={classes.price}>
            <p>{props.content}</p>
        </div>
    );
}

export default Price;