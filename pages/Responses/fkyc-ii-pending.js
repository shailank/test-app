import Container from '@mui/material/Container';
import styles from '../../public/styles/response.module.css';
import Layout from '@/components/layout';
import { useEffect } from 'react';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()

export default function FKYCPending() {
    let obj = {};
    let titleAdd = "";
    try {
        let response = sessionStorage.getItem('successData');
        obj = JSON.parse(response);
        let customerType = sessionStorage.getItem("customerType");
        let cardType = sessionStorage.getItem("cardType");
        if(customerType === "WALLET" && cardType == "UNSECURED") {
            titleAdd = "USCC";
        } else {
            titleAdd = "SCC";
        }
    } catch(error){}
    function handleClick() {
        window.open(obj.vkycUrl);
       
      }
    return (
        <div>
            <Layout title={"KycPending-"+titleAdd+"-PreLogin - kotak 811"}>
            </Layout>
            <Container maxWidth="xs" className={styles.w324}>
                <div className={styles.adjustTop}>
                    <img style={{ marginLeft: "15px" }}  src={`${publicRuntimeConfig.MY_VAR}/Images/info.svg`} alt="Information" />
                    <img style={{ position: "relative", left: "-20px" }} src={`${publicRuntimeConfig.MY_VAR}/Images/info.svg`} alt="Information" />
                    <h3>KYC Pending</h3>
                    <p style={{ paddingLeft: 0, paddingRight: 0 }}> <p>{obj!=null?obj.message:''}</p></p>
                   
                    {obj.showVkycButton === true ?
                    <button onclick={handleclick}>Complete your KYC</button>: ''}
                </div>
            </Container>
        </div>
    );
};