import Link from 'next/link'
import Image from 'next/image';

import { useState } from 'react';
import Search from '../ui/searchButton';





function MainHeader(){

  const [show, setShow] = useState(false);
    return (
        <div className="sticky top-0 z-50">
        <nav className='bg-nftColor'>
            <div className="max-w-9xl mx-auto px-8">
                <div className="flex items-center justify-center h-20">
                    <div className=" flex items-center">
                        
                        <div className="hidden lg:block">
                            <div className="ml-10 flex items-center space-x-40 md:space-x-40 sm:space-x-20 ">
                            
                                {/* <Link href="/"><a className="flex-shrink-0" >
                                <Image className='relative z-30 inline object-cover w-12 h-12 border-20 border-white rounded-full' src="/img/main1.jpg" alt="Workflow" width={70} height={70}/>
                                </a></Link> */}

                                <Link href="/"><a className="text-white font-poppins dark:hover:text-white px-3 py-2 rounded-md text-4xl font-bold -mt-2 xl:text-4xl xl:px-0"  >
                                    jellyfork<span className="text-4xl text-txtred">.</span></a></Link>
                            
                                <Link  href="/"><a className="text-txtborderColor font-poppins  hover:bg-lightgrey dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium xl:text-sm 2xl:text-md"  >
                                    Home </a></Link>

                                <Link  href="/list-coin-form"><a className="text-txtborderColor  font-poppins dark:text-white  hover:bg-lightgrey dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium xl:text-sm 2xl:text-md" style={{marginLeft:"auto"}} >
                                   List Coin</a></Link>

                                   <Link  href="/dappmaker"><a className="text-txtborderColor  font-poppins dark:text-white  hover:bg-lightgrey dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium xl:text-sm 2xl:text-md" style={{marginLeft:"auto"}} >
                                   Dapp Maker</a></Link>
                                   
                             
                                <Link  href="/contact/contact-form"><a className="text-txtborderColor  font-poppins dark:text-white  hover:bg-lightgrey  dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium xl:text-sm 2xl:text-md" style={{marginLeft:"auto"}}>
                                  Contact Us</a></Link>

                                  <Search />
                                  <div className='p-2 text-center hover:bg-lightgrey ' >
                                  <a href="https://t.me/jellyfork" target="_blank" rel="noreferrer">
                                  <svg fill="#9bbcd1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px"><path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"/></svg> 
                                  </a>
                                  </div>

                                  <div className='p-2 text-center hover:bg-lightgrey' style={{marginLeft:"auto"}} >
                                  <a href="https://twitter.com/jellyforkoffl" target="_blank" rel="noreferrer">
                                  <svg fill="#9bbcd1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px"><path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"/></svg>
                                  </a>
                                  </div> 
                            </div>
                        </div>
                    </div>
                  
                    <div className="flex w-full flex-row lg:hidden items-center justify-between mt-10 pb-5">
                        <div className="items-start">
                        <a className="text-white font-poppins hover:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-2xl font-bold -mt-2"  >
                                    jellyfork<span className="text-4xl text-txtred">.</span></a>
                         
                        </div>
                      <div >
                        <button className="text-white dark:text-white hover:text-gray-300 inline-flex items-end justify-end p-2 rounded-md focus:outline-none mobile-menu-button"
                        onClick={() => setShow((s) => !s)}>
                            <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                </path>
                            </svg>
                        </button>
                      </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:hidden mobile-menu duration-300 ease-out sm:transition-none"  style={{ display: show ?   "block":"none" }}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/"><a className="text-white font-poppins  hover:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium block">
                    Home
                </a></Link>
                <Link  href="/list-coin-form"><a className="text-white font-poppins dark:text-white  hover:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium block">
                List Coin
                </a></Link>

                <Link  href="/dappmaker"><a className="text-white font-poppins dark:text-white  hover:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium block">
                Dapp Maker
                </a></Link>
  
                <Link href="/contact/contact-form"><a className="text-white  font-poppins dark:text-white  hover:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium  block">
                Contact Us
               </a></Link>

              <Search />

               {/* <Link href="/"><a className="flex-shrink-0 hidden lg:block" >
                <div className="h-16 my-8">
                  <Image className='relative z-30 inline object-cover w-12 h-12 border-20 border-white rounded-full' src="/img/main1.jpg" alt="Workflow" width={100} height={100}/>
                  </div>
              </a></Link> */}
                
                </div>
            </div>
        </nav>
    </div>


    )

}

export default MainHeader;