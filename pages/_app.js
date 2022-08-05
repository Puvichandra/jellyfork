import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NProgress, { set } from 'nprogress';
import { BallTriangle} from  'react-loader-spinner'

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [isLoading,setIsLoading] =useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      setIsLoading(true)
      //console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      setIsLoading(false)
      //console.log(`completed`)
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return <Layout>
  {isLoading?<div className='w-screen h-screen opacity-40 '><div className='absolute left-1/2 top-1/2 w-32  h-32 bg-transparent m-auto'><BallTriangle color='white' height="100" width="100" ariaLabel='loading'/></div></div>:<Component {...pageProps} />}
  </Layout>
}

export default MyApp
