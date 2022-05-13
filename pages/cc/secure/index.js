import React from "react";
import secures from '../../../public/styles/secure.module.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useState } from "react";
import Layout from '@/components/layout';
import Link from '@mui/material/Link';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()


export default function Secure() {
    
    let joinFee;
    let annualFee;
    try {
        let productsData = sessionStorage.getItem('products');
        const obj = JSON.parse(productsData)        
        joinFee= obj.joiningFee;
        annualFee= obj.annualFee
    } catch(error){}

    const [disableOnClick, setDisableOnClick] = useState(false);
    function handleOnceClick() {
        setDisableOnClick(true);
        handleClick(event);
    };

    const handleClick = e => {
        e.preventDefault()
        router.push('/cc/secure/fixed-deposit')
    };
    const router = useRouter();

    return (
        
        <div className={secures.pagecontainer}>
            <Layout title='SCC_Dream_CardDetail-PreLogin - kotak 811'>
            </Layout>
            <div className={secures.secureinfo}>
                <h1 className={secures.credit}>811 First Credit Card</h1>
                <p className={secures.dream}>Congratulations! 🥳<br />You are eligible for a credit card<br /> against a Fixed Deposit</p>
            </div>
            <div className={secures.carddetail}>
                <div className={secures.carddesign}>
                    <div className={secures.cardarea}>
                    <img
                        src={`${publicRuntimeConfig.MY_VAR}/Images/secure-card.png`}
                      alt="Kotak Logo" />
                    </div>
                    <div className={secures.fee}>
                        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 12, md: 12 }}>
                            <Grid item xs={6} md={6}>
                                <p style={{paddingTop:'30px'}}>Joining Fee</p>
                                <b>₹ {joinFee}</b>                               
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <p style={{paddingTop:'30px'}}>Annual Fee</p>
                                <p><b>₹ {annualFee}</b></p>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={secures.userdetail}>
                    <div className={secures.creditoffered}>
                        <p>Credit Limit offered</p>
                        <p className={secures.creditlimit}>Upto 90% of FD</p>
                    </div>
                   
                    <div className={secures.boost}>
                        <p>Boost your credit score<br /> using this FD-linked<br /> credit card</p>
                    </div>
                    <div className={secures.propositions}>
                        <p style={{paddingYop:'40px'}}>Key Propositions</p>
                        <ul>
                            <li>Book fixed deposit & earn higher interest rate</li>
                            <li>500 reward points on ₹5,000 spends in first 45 days</li>
                            <li>1 reward point on ₹100 spent</li>
                            <li>2X reward point on all online spend</li>
                            <a href="https://www.kotak.com/en/personal-banking/cards/credit-cards/811-dream-different-credit-card.html" target="_blank" style={{fontSize:"14px", color: "#3857ff", position: "relative", top: "15px",textDecoration:'none'}}>know more</a>
                        </ul>
                        
                    </div>
                    <div className={secures.securestart}>
                        <Button disabled={disableOnClick} onClick={handleOnceClick} className={secures.start} variant="contained">Get Card</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};