import Head from 'next/head'
import Header from './headers/header'
import { useRouter } from 'next/router'
import Grid from "@mui/material/Grid"
import { useEffect } from 'react'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import "@fontsource/manrope";


export default function Layout({title, keywords, discriptions})
{
 useEffect(()=>{

    document.addEventListener('contextmenu', event => event.preventDefault());
    document.onkeydown = disableSelectCopy;

    function disableSelectCopy(e) {
        // current pressed key
        let pressedKey = String.fromCharCode(e.keyCode).toLowerCase();
        if ((e.ctrlKey && (pressedKey == "c" || pressedKey == "x" || pressedKey == "v" || pressedKey == "a" || pressedKey == "u")) ||  e.keyCode == 123) {
            return false;
        }
    }


   function preventBack() {
    window.history.forward();
    }
    setTimeout(preventBack(), 0);
    window.onunload = function () { null };

    restrictUrlAccess();
    
  }, []);

  const router = useRouter();
  const restrictUrlAccess = () => {
    try {
        let trackingId = sessionStorage.getItem('trackingId');
        let responsesData = sessionStorage.getItem('successData');
        let errorData = sessionStorage.getItem('errorData');
        //if(trackingId == null && !router.pathname.match('/Responses/') && !router.pathname.match('/opt-out') && !router.pathname.match('/500')) {
          //  router.push('/');
        //}
    //    if(responsesData == null && router.pathname.match('/Responses/')){
      //      router.push('/');
      //  }
     //   if(trackingId == null && errorData == null && router.pathname.match('/opt-out')){
//router.push('/');
//}
    } catch(error){}
  }
  

 return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={discriptions} />
            <link rel="icon" href={process.env.PUBLIC_URL + '/favicon.svg'} />      
            <meta name="keywords" content={keywords} />
            <script
          src="https://www.google.com/recaptcha/api.js?&render=explicit"
          async
          defer
        ></script>
        </Head>
        {(router.pathname !=='/' && !router.pathname.match('/Responses/') && !router.pathname.match('/preloader') && !router.pathname.match('/opt-out')) ?
            <Grid container justifyContent="center">
                <Grid item xs={10}>
                    <Header />
                </Grid>
            </Grid>
        :null}
    </div>
    )
}
Layout.defaultProps = {
 title: 'Depends on Page | Xyz',
 descriptions : 'About Page Desicription',
 keywords: 'music, dj, event', 
}


