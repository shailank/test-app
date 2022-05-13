

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from "react";
import Recaptcha from "demos-react-captcha";
import React from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import styles from '../../public/styles/profile.module.css';
import TermsandCondition from "@/components/External/terms_condition";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import Hidden from '@material-ui/core/Hidden';
import { ApiCall } from 'pages/api/apiCall';
import * as Constants from 'pages/api/apiurl';
import LoadingButton from '@mui/lab/LoadingButton';
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function CrnVal(props) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const campaignSource = urlParams?.get('campaignSource');
  const campaignSubChannel = urlParams?.get('campaignSubChannel');
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [disableOnClick, setDisableOnClick] = useState(false);

  function disableOnceClick() {
    setDisableOnClick(true);
  };

  const [claimButton, setClaimButtonClick] = useState('');
  let claimButtonClick = () => {
    setClaimButtonClick(true);
  };

  claimButtonClick = claimButtonClick.bind(this);
  const calimButtonClose = () => {
    setClaimButtonClick(false);
  };

  const [dob, setDob] = useState(null);
  const [dobError, setDobError] = useState("");
  const [dobHint, setDobHint] = useState('');
  function handleDobChange(dob) {
  
    setDobError("");
    setDobHint('dd/mm/yyyy')
    if(dob === null) {
      setDob('');
      setDobHint('')
    } else {
      let reg = /^((0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/](19|20)?[0-9]{4})*$/;
      let date = new Date(dob);
      let dateCheck = (date.getDate()) + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
      if (reg.test(dateCheck)){
        setDob(dob);
        setDobHint('')
       
      } else {
        setDob('');
        
      }
    }
  };
    let date = new Date(dob);
    let month=date.getMonth()+1;
    let newDate = date.getDate();
    if(newDate < 10) {
      newDate = '0'+newDate;
    }
    if(month < 10) {
      month = '0'+month;
    }
    let finaldate = newDate + '-' + month + '-' + date.getFullYear();  
  
  const [captcha, setCaptcha] = useState('');
  function handleCaptcha(captcha) {
    setCaptcha(captcha);
    
  };

  const [crnNumber, setCrnNumber] = useState('');
  const[empId, setEmpId] =useState('');
  function handleEmphange(event){
    const num = event.target.value;
    setEmpId(num);
  }
  const [crnError, setCrnError] = useState("");
  function handleCrnChange(event) {
    setCrnError("");
    const num = event.target.value;
    if (num.length >=6 && num.length <=14 ) {
      setCrnNumber(num);
    } else {
      setCrnNumber('');
    };
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault(); 
    let data = { "crn": crnNumber, "dob": finaldate, "employeeRefCode": empId, "campaignSource": campaignSource,
    "campaignSubChannel": campaignSubChannel};
    try {
      const  res = await ApiCall(Constants.VALIDATECRN, data);
      const result = await res.json();
      switch (res.status) {
        case 200:
              if (result.statusCode === 200) {
                if (result.status === "SUCCESS") {
                  let trackingId = result.data.trackingId;
                  handleDefaultOtpApi(trackingId);
                  disableOnceClick();
                }
                else if (result.status === "FAILED"){
                  switch (result.errors[0].errorCode) {
                    case 1001:
                      sessionStorage.clear();
                      setCrnError(result.errors[0].message);
                      setCrnNumber('');
                      setLoading(false)
                      setDisableOnClick(false)
                      break;
                    case 1002:
                      sessionStorage.clear();
                      router.push('/Responses/811-response');
                      break;
                    case 1003:
                      sessionStorage.clear();
                      setDobError(result.errors[0].message);
                      setDob('');
                      setLoading(false)
                      setDisableOnClick(false)
                      break;
                    case 555:
                      router.push(result.errors[0].redirectUrl);
                      break;
                    case 551:
                      router.push('/servererror');
                      break;
                    default:
                      router.push('/servererror');
                      break;
                  }
                }
                else{
                  router.push('/servererror');
                }
              }
          break;
        default:
          break;
      }
    } catch (error) {
      router.push('/servererror');
    }
  };

  const handleDefaultOtpApi = async (trackingId) => {

    let data = {'trackingId': trackingId};
    try {
      const res = await ApiCall(Constants.GENERATEOTP, data);
      const result = await res.json();
      switch (res.status) {
        case 200:
              if (result.statusCode === 200) {
                if (result.status === "SUCCESS") {
                  sessionStorage.setItem("OtpSentSuccessfully", JSON.stringify(result.data));
                  sessionStorage.setItem('trackingId', trackingId);
                  props.moveToNextStep();
                }
                else {
                  switch (result.errors[0].errorCode) {
                    case 551:
                      router.push('/servererror')
                      break;
                    case 1101:
                        router.push('/servererror');
                        break;  
                  }
                }
              }
          break;
        default:
          router.push('/servererror')
          break;
      }
    } catch (error) {
      router.push('/servererror')
    }
  };
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: '#000',
      border: '1px solid #e6e6e6',
      padding: '24px 30px',
      borderRadius: '8px',
      boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
      maxWidth: "360px"
    },
  }));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      <Container component="main" maxWidth="xs">
        <h style = {{fontWeight:'bold', fontSize:'15px'}}>Enter your Details</h>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" Validate>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  error={!!crnError}
                  helperText={crnError}
                  required
                  fullWidth
                  id="outlined-number"
                  label="CRN (Customer Relationship No.)"
                  type="number"
                  name="number"
                  autoComplete="number"
                  variant="standard"
                  onChange={handleCrnChange}
                  onInput = {(e) =>{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,9)
                }}
                />
                <HtmlTooltip title={
                  <React.Fragment>
                    <Typography>
                      <div className='crnHead' style={{fontSize: "16px", lineHeight: "1.75"}}><b>What is my CRN?</b></div>
                      <div className='crnbody' style={{fontSize: "14px", color: '#666', fontWeight: "500", lineHeight: "1.86", paddingTop: "5px"}}>Your CRN is the number under your name on <br />your Debit/Credit Card.
                      <br />SMS CRN to 9971056767 from your <br />registered mobile number to know your CRN</div>
                    </Typography>
                  </React.Fragment>
                }
                  placement='right' arrow><span className='crnSpan' style={{fontSize: "14px", textDecoration: "underline",cursor:"pointer", fontWeight: "500", color: "#666"}} onClick={handleOpen}>What is my CRN?</span></HtmlTooltip>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    required
                    disableOpenPicker
                    label="Date of Birth"
                    value={dob}
                    inputFormat='dd/MM/yyyy'
                    onChange={handleDobChange}
                    renderInput={(params) => <TextField error={!!dobError} helperText={dobError} variant='standard' fullWidth {...params} />}
                  />
                     <div> <span  className='crnSpan' style={{fontSize: "14px", fontWeight: "500", color: "#666"}}>{dobHint}</span></div>
       
                              </LocalizationProvider>
                              

                                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-number"  
                  label="Employee ID (Optional)"
                  type="text"
                  name="EmpId"
                  inputFormat="Enter Code"
                  variant="standard"
                  onChange={handleEmphange}
                />
                </Grid>
              <Grid item xs={12} display="flex"
                alignItems="center"
                minHeight="3vh">
                <Recaptcha
                  sitekey="6LfQ31gaAAAAAI4uTvABblYhygdFooBFWs9KwcoJ"
                  render="explicit"
                  length={3}
                  onChange={handleCaptcha}
                  
                  
                />
              </Grid>
           
            <Grid item xs={12} style = {{top:'0px'}}>
            <LoadingButton
            loading={loading}
            loadingPosition="end"
              onClick={handleSubmit}
              disabled={disableOnClick || !crnNumber || !dob || !captcha}
              type="button"
              variant="contained"
              className={styles.checkEleButton}>
              Check eligibility
            </LoadingButton>
            </Grid>
            </Grid>
            <Typography variant="caption" display="block" gutterBottom className='termsCondition'>
                 <span className={styles.bottomtext}>By proceeding you agree to accept all applicable&nbsp;</span>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              <TermsandCondition />,&nbsp;
              <span  variant="body2" className='privacyPolicy'>811 Fees &amp; charges </span> &nbsp;and&nbsp;
              <span variant="body2" className='privacyPolicy'>Privacy Policy</span><br />
                <span className={styles.bottomtext}>By submitting above details, you are authorizing Kotak Mahindra Bank to call you &amp; send promotional communication even though you are registered under DNC. Terms and Conditions apply</span>
            </Typography>
          </Box>
          <Hidden smUp>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.crnBottomStyle}>
              <div className='crnHead' style={{fontSize: "17px", lineHeight: "1.65"}}>
                  <b>What is my CRN?</b>
                  <a className={styles.crossButton} onClick={handleClose}> <img  src={`${publicRuntimeConfig.MY_VAR}/Images/cancel.svg`}
              alt="Cancel"/></a>
              </div>
              <div className='crnbody' style={{fontSize: "16px", color: '#666', fontWeight: "500", lineHeight: "1.63", paddingTop: "16px"}}>Your CRN is the number under your name on <br />your Debit/Credit Card.
              <p>SMS CRN to 9971056767 from your <br />registered mobile number to know your CRN</p></div>
          </Box>
          </Modal>
          </Hidden>
        </Box>
      </Container>
  );
};