import Container from '@mui/material/Container';
import styles from '../../public/styles/response.module.css';
import Layout from '@/components/layout';
import { useEffect } from 'react';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()

export default function SuccessfullyApplied() {

    let obj = {};
    let titleAdd = "";
    try {
        let response = sessionStorage.getItem('successData');
        obj = JSON.parse(response);
        let customerType = sessionStorage.getItem("customerType");
        let cardType = sessionStorage.getItem("cardType");
        if(customerType === "FKYC" && cardType == "UNSECURED") {
            titleAdd = "USCC";
        } else {
            titleAdd = "SCC";
        }
    } catch(error){}
    
    return (
        <div>
            <Layout title={"KycPending-"+titleAdd+"-PreLogin - kotak 811"}>
            </Layout>
            <Container maxWidth="xs" className={styles.w324}>
                <div className={styles.adjustTop}>
                    <img   src={`${publicRuntimeConfig.MY_VAR}/Images/blue_check.svg`} alt="Check" />
                    <h3>Successfully applied</h3>
                    <p>{obj!=null?obj.message:''}</p>
                    {/* <a href="/">Track your application</a> */}
                </div>
            </Container>
        </div>
    );
};