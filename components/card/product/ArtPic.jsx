import React from "react";
import  classes from "../frame.module.css";
const ArtPic = (props) => {
    return (
        <img className={classes.artpic} src={props.source} alt="Equilibrium #3429"></img>
    );
}

export default ArtPic;