import React from "react";
import fixed from '../../../public/styles/fixed.module.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Checkbox } from "@material-ui/core";
import CurrencyInput from 'react-currency-input-field';
import { useState } from "react";
import { useRouter } from 'next/router';
import TermsandCondition from "@/components/External/terms_condition";
import CreditPdf from "@/components/External/credit";
import Lien from "@/components/External/lien";
import Layout from '@/components/layout';
import { ApiCall } from 'pages/api/apiCall';
import * as Constants from 'pages/api/apiurl';

export default function Secure() {
    const [disableOnClick, setDisableOnClick] = useState(false);  
    function disableOnceClick() {
        setDisableOnClick(true);
      };
    const [currencyError, setCurrencyError]  = useState("");
    const [agree, setAgree] = useState(false);    
    const checkboxHandler = () => {     
     setAgree(!agree);    
   }
    const router = useRouter()
    const [fixeddeposit, setFixedDeposit] = useState(0);
    const [fd, setFd] = useState(false);

    function numberWithCommas(x) {
        return x.toString().split('.')[0].length > 3 ? x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3): x.toString();
    }

    function handleChange(value){
        let inputV = value;
        if(inputV >= 10000 && inputV <= 1500000) {
            let curVal = ((inputV/100)*90).toFixed(0);
            // curVal= curVal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            curVal= numberWithCommas(curVal);
            setFixedDeposit(curVal);
        }  
        if ((inputV >= 0) && (inputV < 10000))
       {
           setFd(false);
           setCurrencyError("Please Enter Min Amount 10,000")
           setFixedDeposit(0);
       }
       else if(inputV > 1500000) {
            setFd(false);
            setCurrencyError("Please Enter Max Amount 15,00,000")
            setFixedDeposit(0);
       }
       else {
        setCurrencyError("")
           setFd(true);
       }
       sessionStorage.setItem('fdAmount', inputV); 
    }
    const handleClick = e => {  
        disableOnceClick();
        UpdatePageDetail();

        sessionStorage.setItem('creditLimit', fixeddeposit);

        if((fixeddeposit > 0) && (fixeddeposit < 8999)){
            setDisableOnClick(false);
        }
        else if(agree){
            e.preventDefault()
            setDisableOnClick(true);            
             router.push('/cc/secure/secure-review')
        }
        else{
            setMessage("Please Accept Terms and conditions");  
            setDisableOnClick(false);
        }
    }

    const UpdatePageDetail = async (event) => {
        let data = { "trackingId": sessionStorage.getItem("trackingId"), "pageName": "FD_DETAILS_ENTERED" };
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
                      let responseError = result.errors[1];
                      sessionStorage.setItem("responseError", JSON.stringify(responseError));
                      break;
                    default:
                      break;
                  }
  
                }
              }
              break;
            default:
             
              break;
          }
        } catch (error) { }
       
      }
    
    return(
       <div className={fixed.pagecontainer}>
           <Layout title='SCC_FD_Details_Enter-PreLogin - kotak 811'>
            </Layout>               
                <div className={fixed.fixedpage}>
                    <h2>Enter FD Amount</h2>                    
                    <form action="#" method="post">
                    <div className={fixed.famount}>                        
                    <CurrencyInput intlConfig={{ locale: 'en-IN', currency: 'INR' }} allowNegativeValue={false} minLength={4} maxLength={7} className={fixed.fdamount} placeholder="₹ 0" prefix = "₹ " disableGroupSeparators={false} onValueChange={(value) => handleChange(value)} />
                         <div className ={fixed.err}>
                             <p>{currencyError}</p>
                             </div>             
                    </div>
                    <div className={fixed.creditlimit}>
                            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 12, md: 12 }}>
                                <Grid item xs={6} md={6}>
                                    <p>Your Credit Limit</p>                                   
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <div className={fixed.fdlimit}>
                                    <p><b>₹ {fixeddeposit} </b></p>
                                    <h6>Upto 90% of FD</h6>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    <div className={fixed.check}>                        
                        <Checkbox style ={{color: agree ? "#3857ff":"#cccccc",marginTop: "-8px"}} onChange={checkboxHandler}  />
                        <p>I irrevocably agree and accept to have read and understood all the <TermsandCondition /> applicable to <CreditPdf /> , and <Lien /> on your fixed deposit and agree to be bound by and to be able to abide by the same.</p>
                    </div>
                    <div className={fixed.proceed}>
                    <Button onClick={handleClick}
disabled={disableOnClick || !agree || !fd}className={fixed.start} variant="contained">Proceed</Button>       

                        </div>
                    </form>
                </div>
            </div>
    )
}