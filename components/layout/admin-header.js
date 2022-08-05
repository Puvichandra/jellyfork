import Link from 'next/link'
import Image from 'next/image';

import { useState } from 'react';
import Search from '../ui/searchButton';





function AdminMainHeader(){

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

                                <Link  href="/nftadd" target="_blank"><a className="text-txtborderColor font-poppins  hover:bg-lightgrey dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium xl:text-sm 2xl:text-md"  >
                                    Nft Add </a></Link>
                            
                                <Link  href="/advadd"><a className="text-txtborderColor font-poppins  hover:bg-lightgrey dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium xl:text-sm 2xl:text-md"  >
                                    Ad Add </a></Link>

                                    <Link  href="/jfadedit"><a className="text-txtborderColor font-poppins  hover:bg-lightgrey dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium xl:text-sm 2xl:text-md"  >
                                    Ad List </a></Link>

                                    <Link  href="/contact/contactlist"><a className="text-txtborderColor font-poppins  hover:bg-lightgrey dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium xl:text-sm 2xl:text-md"  >
                                    Message Panel </a></Link>

                                    <Link  href="/admin3xcrtyyu1245"><a className="text-txtborderColor font-poppins  hover:bg-lightgrey dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium xl:text-sm 2xl:text-md"  >
                                    Admin Panel </a></Link>

                               
                               
                                
                            </div>
                        </div>
                    </div>
                  
       
                </div>
            </div>
         
        </nav>
    </div>


    )

}

export default AdminMainHeader;