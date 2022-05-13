import Layout from '@/components/layout';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ApiCall } from 'pages/api/apiCall';
import * as Constants from 'pages/api/apiurl';
import { useRouter } from 'next/router';
import Link from 'next/link'
import styles from './style.module.css';

export default function OptOutReview() {
  let trackingId = 0;
  let optOutToken = "";
  let customerName = ""
  try {
    customerName = sessionStorage.getItem("customerName");
    trackingId = sessionStorage.getItem("trackingId");;
    optOutToken = sessionStorage.getItem("optOutToken");
  } catch (error) { }

  const router = useRouter()

  const handlecancelApplication = async () => {

    let data = { "optOutToken": optOutToken, "trackingId": trackingId }

    try {
      const res = await ApiCall(Constants.CANCELLEAD, data);
      const result = await res.json();
      switch (res.status) {
        case 200:
          if (result.statusCode === 200) {
            if (result.status === "SUCCESS") {
              router.push('/cc/opt-out/response');
            }
            else {
              switch (result.errors[0].errorCode) {
                case 1801:
                  let errorData = result.errors[0];
                  sessionStorage.setItem("errorData", JSON.stringify(errorData));
                  router.push('/cc/opt-out/timeOut')
                  break;
                case 551:
                  router.push('/cc/opt-out/servererror')
                  break;
                default:
                  router.push('/cc/opt-out/servererror')
              }
            }
          }
          break;
        default:
          router.push('/cc/opt-out/servererror')
          break;
      }
    } catch (error) { }
  };

  return (

    <div>
      <Layout title='OPT_OUT_Details-PreLogin - kotak 811'>
      </Layout>
      <div className='container' maxWidth="sm">
        <Grid container justifyContent="center">
          <Grid item xs={11} marginY={8}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>👋 Hi {customerName}</div>
            <p style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'hsl(0, 0%, 10%)',
              lineHeight: '1.75'
            }}>If you are having second thoughts of getting the FD-link Credit Card, below are the top reasons why you should reconsider</p>
            <ul style={{
              paddingLeft: '0px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#000',
              marginBottom: '40px'
            }} >
              <li>500 reward points on ₹5000 spends in first 45 days</li>
              <li>2X reward point on all online spend</li>
              <li>1 reward point on ₹100 spent</li>
            </ul>
            <Link href="/cc/opt-out/response"><Button className={styles.cardButton}>Continue application</Button></Link>
            <Button onClick={handlecancelApplication} className={styles.cardButton} style={{ background: "#fff", color: "#3857ff" }}>Cancel application</Button>
          </Grid>
        </Grid>
      </div>
    </div>

  )
} 