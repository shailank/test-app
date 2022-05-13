
import Layout from '@/components/layout';
import { useEffect } from 'react';
import styles from './style.module.css';


export default function SuccessfullyApplied() {

    let obj = {};
    try {
        let response = sessionStorage.getItem('successData');
        obj = JSON.parse(response);
    } catch(error){}

    useEffect(()=> {
        setTimeout(() => {
            sessionStorage.clear();
        }, 10000);
    },[]);
    return (
        <div>
        <Layout title='OPT_OUT_Response_captured-PreLogin - kotak 811'>
        </Layout>
        <div className='container w324' maxWidth="xs">
            <div className={styles.adjustTop}>
            <img
               src='../../Images/blue_check.svg'
                 alt="Check" />
                <h3>Response captured</h3>
                <p>Customer cancelled the lead.</p>
                {/* <a href="/">Track your application</a> */}
            </div>
            </div>
    </div>
        );
};