import Layout from '@/components/layout';
import { useEffect } from 'react';
import styles from './style.module.css';


export default function KYCPending() {
    let obj = {};
    let titleAdd = "";
    try {
        let response = sessionStorage.getItem('errorData');
        obj = JSON.parse(response);
        if(obj.errorCode === 1801) {
            titleAdd = "Timed_out"
        } else {
            titleAdd = "Link_expired";
        }
    } catch(error){}
    
    useEffect(()=> {
        setTimeout(() => {
            sessionStorage.clear();
        }, 10000);
    },[]);
    return (
        <div>
        <Layout title={'OPT_OUT_'+titleAdd+'-PreLogin - kotak 811'}>
        </Layout>
        <div className='container w324' maxWidth="xs">
            <div className={styles.adjustTop}>
            <img
               src='../../Images/info.svg' alt="Information" />
                <h3>{obj!=null?obj.message:"Timed out"}</h3>                    
            </div>
        </div>
    </div>
       
    );
};