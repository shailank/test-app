import * as React from 'react';
import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from '../../public/styles/Home.module.css';
import { useRouter } from 'next/router';
import { ApiCall } from 'pages/api/apiCall';
import * as Constants from 'pages/api/apiurl';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    </Typography>
  );
};

export default function OtpValidation(props) {
  let obj = {};
  try {
    let successResponse = sessionStorage.getItem('OtpSentSuccessfully');
      obj = JSON.parse(successResponse);
  } catch (error) { }
  let handleClick = e => {
    e.preventDefault();
  }
  const router = useRouter();

  const [disableOnClick, setDisableOnClick] = useState(false);
  function disableOnceClick() {
    setDisableOnClick(true);
    handleClick(event);
  };

  const [otp, setotp] = useState("");
  const handleOtpInput = e => {
    if (otp && otp.length == 6) {
      e.preventDefault()
      setotp(otp);
      setotpError("")
      // handleOtpSubmit();
      // handleChange()
    }
    else {
      alert("Please enter valid OTP");
      return false;
    };
  };

  const [otpError, setotpError] = useState("");
  const [resendOtpError, setResendOtpError] = useState("")
  const [disableResendOtp, setDisableResendOtp] = useState(false);

  const handleResendOtpApi = async () => {

    let data = { "trackingId": sessionStorage.getItem("trackingId"), "isResend": true }
    try {
      const res = await ApiCall(Constants.RESENDOTP, data);
      const result = await res.json();
      switch (res.status) {
        case 200:
              if (result.statusCode === 200) {
                if (result.status === "SUCCESS") {
                  setCounter(59)
                }
                else {
                  switch (result.errors[0].errorCode) {
                    case 1101:
                      setResendOtpError(result.errors[0].message);
                      setDisableResendOtp(true);
                      setCounter(0)
                      setotpError("")
                      setotp('')
                      break;
                    case 551:
                      router.push('/servererror')
                      break;
                    default:
                      sessionStorage.clear();
                      router.push('/servererror');
                      break;
                  }
                }
              }
          break;
        default:
          break;
      }
    } catch (error) {
    }
  };

  const handleOtpSubmit = async (otp) => {
    let data = { "trackingId": sessionStorage.getItem("trackingId"), "otp": otp };
    try {
      const res = await ApiCall(Constants.VALIDATEOTP, data);
      const result = await res.json();
      switch (res.status) {
        case 200:
              if (result.statusCode === 200) {
                if (result.status === "SUCCESS") {
                  router.push('/preloader')
                }
                else {
                  switch (result.errors[0].errorCode) {
                    case 1201:
                      setotpError(result.errors[0].message);
                      setotp('')
                      break;
                  }
                }
              }
          break;
        case 404:
          
        default:
          break;
      }
    } catch (error) {
    }
  };

  const [disableOtp, setDisableOtp] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisableOtp(false);
    }, 60000);
    return () => clearTimeout(timeout);
  }, [disableOtp]);

  function handleChange(otp) {
    setotp(otp);
    setotpError("")
    if (otp.length === 6) {
      handleOtpSubmit(otp);
    }
  };

  const [counter, setCounter] = React.useState(59);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box component="form" Validate sx={{ mt: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Typography variant="h5" component="div" align="center" sx={{ px: 3 }} style={{fontSize: "20px", fontWeight: "bold", lineHeight: "1.4", color: "#000"}}>
                {obj.message}
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <Typography fontWeight={500} align="center"> <Link className={(disableOtp || disableResendOtp) ? styles.disabledLink : styles.enabledLink} href="#" variant="body2" onClick={handleResendOtpApi}  style={{fontSize: '16px', textDecoration: "none"}}>Resend OTP </Link> <br /><span style={{ color: "gray", fontWeight: "bold" }}> in 00:{counter < 10 ? '0' + counter : counter}</span> </Typography>
              <label align="center" style={{ color: 'red', fontSize: '12px', marginBottom: '50px' }}>{resendOtpError}</label>
            </Grid>
            <Grid item xs={12} align="center" style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "40px" }}>
              <OtpInput inputStyle={styles.inputStyle}
                isInputNum={true}
                numInputs={6}
                focusStyle={{
                  border: "1px solid #3857ff",
                  outline: "none"
                }}
                onChange={handleChange}
                value={otp}
              />
              {/* <p>otp is: {otp}</p> */}
            </Grid>
            <label style={{ color: 'red', fontSize: '12px', marginBottom: '50px', paddingLeft:'90px', marginTop: '10px'}}>{otpError}</label>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};