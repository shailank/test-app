import Layout from '@/components/layout';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styles from '../../public/styles/unsecucc.module.css';
import { useRouter } from 'next/router';
import { useState } from "react";
import Button from '@mui/material/Button';
import * as Constants from 'pages/api/apiurl';
import { ApiCall } from 'pages/api/apiCall';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()

export default function CC811() {
    let handleClick = e => {
        e.preventDefault()
        router.push('/cc/professional-detail')
    };
    const router = useRouter();
    let obj = {};
    let cardLimit = '';
    try {
        let productsData = sessionStorage.getItem('products');
        obj = JSON.parse(productsData);
        cardLimit = obj.creditLimit.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
        console.log(obj.cardType, "productsData");
    } catch(error){}
    const [disableOnClick, setDisableOnClick] = useState(false);
    function disableOnceClick() {
        UpdatePageDetail();
        setDisableOnClick(true);
        handleClick(event);

    };

    const UpdatePageDetail = async (event) => {
        let data = { "trackingId": sessionStorage.getItem("trackingId"), "pageName": "PROFESSIONAL_DETAILS_PAGE_SHOWN" };
        debugger;
        try {
          const res = await ApiCall(Constants.UPDATEPAGEDETAIL, data);
          const result = await res.json();
          switch (res.status) {
            case 200:
              if (result.statusCode === 200) {
                if (result.status === "SUCCESS") {
                  sessionStorage.setItem("UserInfoData", JSON.stringify(result.data.message));
                }
                else {
                  switch (result.errors[0].errorCode) {
                    case 2003:
                      let responseErrorData = result.errors[0];
                      sessionStorage.setItem("responseErrorData", JSON.stringify(responseErrorData));
                      break;
                    case 551:
                      sessionStorage.clear();
                      let responseError = result.errors[1];
                      sessionStorage.setItem("responseError", JSON.stringify(responseError));
                     
                      break;
                    default:
                  }
  
                }
              }
              break;
            default:
              break;
          }
        } catch (error) { }
       
      }

    return (
        <div>
            <Layout title='USCC_811_CardDetail-PreLogin - kotak 811'>
            </Layout>
            <Container maxWidth="md">
                <div className={styles.creditStyle}>
                    <p>811 Credit Card</p>
                    <h5>Congratulations! 🥳</h5>
                    <h5>You are eligible for Kotak811 Credit Card</h5>
                </div>

                <Grid container justifyContent="center">
                    <Grid item xs={8} sm={5} marginBottom={3}>
                        <img src={`${publicRuntimeConfig.MY_VAR}/Images/unsecured-card.png`} width={300} height={350} alt="Unsecured Card" />
                        <Grid container marginY={3}>
                            <Grid item xs={6} md={5}>
                                <span className={styles.priceText}>Joining Fee</span>
                                <p className={styles.price}>₹ {obj!=null?obj.joiningFee:''} <span className={styles.smallText}>One-time</span></p>
                            </Grid>
                            <Grid item xs={6}>
                                <span className={styles.priceText}>Annual Fee</span>
                                <p className={styles.price}>₹ {obj!=null?obj.annualFee:''}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} md={5}>
                        <div className={styles.textStyle}>
                            <div className={styles.textLeft}>Credit Limit offered</div>
                            <div className={styles.textRight}>₹{cardLimit!=null?cardLimit:''}</div>
                        </div>
                        <div className={styles.keyProps}>Key Propositions</div>
                        <ul className={styles.arrow}>
                            <li>500 reward points on ₹5000 spends in first 45 days</li>
                            <li>1 reward point on ₹100 spent</li>
                            <li>2X reward point on all online spend</li>
                            <li>Earn ₹750 on spending ₹75,000/year</li>
                            <a href="https://www.kotak.com/en/personal-banking/cards/credit-cards/kotak-811-credit-card.html" target="_blank" style={{fontSize:"14px", color: "#3857ff", position: "relative", top: "12px", lineHeight: 1.79,textDecoration:"none"}}>know more</a>
                        </ul>
                        <div className={styles.securestart}>
                        <Button  disabled={disableOnClick} onClick={disableOnceClick} className={styles.start} variant="contained">Get Card</Button>
                    </div>
                     
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};