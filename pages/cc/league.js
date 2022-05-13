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
export default function CCLeague() {
   
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
        setDisableOnClick(true);
        UpdatePageDetail();
        handleClick(event);
       

    };

    return (

        <div>
            <Layout title='USCC_League_CardDetail-PreLogin - kotak 811'>
            </Layout>
            <Container maxWidth="md">
                <div className={styles.creditStyle}>
                    <p>811 Credit Card</p>
                    <h5>Congratulations! 🥳 </h5>
                    <h5>You are eligible for League Credit Card</h5>
                </div>

                <Grid container justifyContent="center">
                    <Grid item xs={8} md={6} marginBottom={3}>
                    <img
                src={`${publicRuntimeConfig.MY_VAR}/Images/league-card.png`} alt="Unsecured Card" style={{maxWidth: "100%"}} style={{maxWidth: "100%"}} />
                       <Grid container  marginY={3}>
                            <Grid item xs={6} md={5} className={styles.plstyle}>
                                <span className={styles.priceText}>Joining Fee</span>
                                <p className={styles.price}>₹ {obj!=null?obj.joiningFee:''}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <span className={styles.priceText}>Annual Fee</span>
                                <p className={styles.price}>₹  {obj!=null?obj.annualFee:''} <span className={styles.smallText}></span></p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} md={5}>
                        <div className={styles.textStyle}>
                            <div className={styles.textLeft}>Credit Limit offered</div>
                            <div className={styles.textRight}>₹ {cardLimit!=null?cardLimit:''} </div>
                        </div>
                        <div className={styles.keyProps}>Key Propositions</div>
                        <ul className={styles.arrow}>
                            <li>1% fuel surcharge waiver upto ₹3,500/year</li>
                            <li>Movie voucher worth ₹500 on joining</li>
                            <li>2X reward point on all online spend</li>
                            <li>Use rewards points to shop online Kotak rewards</li>
                            <a href="https://www.kotak.com/en/personal-banking/cards/credit-cards/league-platinum-card.html" target="_blank" style={{fontSize:"15px", color: "#3857ff", position: "relative", top: "12px"}}>know more</a>
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