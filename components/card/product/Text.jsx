import React from "react";
import Heading from "./Heading";
import Info from "./Info";
import Bet from "./Bet";
import  classes from "../frame.module.css";


function Text(props) {
    return (
        <div className={classes.text}>
            <Heading content={props.name} />
            <Info content={props.description} />
            <Bet beforePrice={props.beforePrice} afterPrice={props.afterPrice} timePeriod={props.timePeriod} />
        </div>
    );
}

export default Text;