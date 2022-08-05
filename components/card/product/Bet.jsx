import React from "react";
import Price from "./Price";
import Time from "./Time";
import  classes from "../frame.module.css";
import {BsFillClockFill} from 'react-icons/bs';

const Bet = (props)=> {
    return (
        <div className={classes.bet}>
        <div>
            <Time content={props.beforePrice} />
            <Price content={props.afterPrice} />

        </div>
        <div>
        <BsFillClockFill className={classes.clock} />
      <small>{props.timePeriod}</small>

        </div>
        </div>
    );
}

export default Bet;