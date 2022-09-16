import React from 'react'
import classes from "../popup/popup.module.css"

import { useState } from 'react'
import {BsTelegram} from 'react-icons/bs'
import {AiFillTwitterCircle} from 'react-icons/ai'
import {TbWorld} from 'react-icons/tb'
import {BsDiscord} from 'react-icons/bs'

const Popup = () => {

    const [isActive , setActive] = useState(true)

        const closeButton = () => {
            setActive(false)
        }

  return (
    <div className={isActive ? classes.popup : classes.popup__inactive}>
        <div className={classes.popup__container}>
            <div className={classes.title__popup}>
                <h2>Our Official Partner</h2>
            </div>
            <div className={classes.popup__close} onClick={closeButton}>
        {/* <button className="mint__now eightbit_btn eightbit_btn--reset">X</button> */}
        <button className= {`${classes.mint__now} ${classes.eightbit_btn} ${classes.eightbitbtnreset}`}>X</button>

            </div>
        <video autoPlay loop muted className={classes.bg__popup}>
        <source src="img/vid.mp4 " type='video/mp4' />
      </video>
    <div className={classes.content__popup}>

    <img src='img/fin.png' className={classes.text__design}></img>
    <h1 className='text-2xl'>Discover A New Era Of Cool NFTs</h1>
    <p>Win 60,000$ Through Minting!</p>
    <a href="https://www.thechihuahuaclub.com/https://www.thechihuahuaclub.com/" rel='noreferrer nofollow'><button className= {`${classes.mint__now} ${classes.eightbit_btn} ${classes.eightbitbtnreset}` }>Mint Now</button></a>
    <div className={classes.social__icons}>
      <a href='https://t.me/TheChihuahuaClub'>
    <BsTelegram className={classes.social__icon} />
        </a>
        <a href='https://twitter.com/ChihuahuaOffl'>
    <AiFillTwitterCircle className={classes.social__icon} />
            </a>
            <a href='https://discord.gg/Ygg2gnGu'>
    <BsDiscord className={classes.social__icon} />
                </a>
                <a href='https://www.thechihuahuaclub.com/'>
    <TbWorld className={classes.social__icon} />
                    </a>  

    </div>
    </div>
    <div className={classes.car__container}>
      <img src="img/bluecar.png" className={classes.civic}></img>
      <img src="img/wheel1.png" className={classes.wheel1}></img>
      <img src="img/wheel1.png" className={classes.wheel2}></img>
      </div>
        </div>
    </div>
  )
}

export default Popup;