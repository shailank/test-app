import Container from '@mui/material/Container';
import styles from '../../public/styles/response.module.css';
import Grid from '@mui/material/Grid';
import Layout from '@/components/layout';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()

export default function NotAn811Customer() {

    return (
        <div>
            <Layout title='Non_811_Customer-PreLogin - kotak 811'>
            </Layout>
            <Container maxWidth="xs">
                <div className={styles.adjustTop}>
                <img
               src={`${publicRuntimeConfig.MY_VAR}/Images/error.svg`} alt="Server Error" />
                    <h3>Not an 811 Customer?</h3>
                    <div className={styles.w324}>
                        <p>Sorry! This feature is only available for Kotak811 customers. Please submit your credit card application from Kotak Mobile banking app.</p>
                    </div>
                    <div><img className={styles.img1} 
               src={`${publicRuntimeConfig.MY_VAR}/Images/kotak_811.png`} alt="Kotak 811" /></div>
                    <span>Download App</span>
                    <Grid container justifyContent="center" spacing={1.5} style={{ paddingTop: 25 }}>
                        <Grid item xs={10} md={6}>
                            <img className={styles.responsive}  src={`${publicRuntimeConfig.MY_VAR}/Images/google_play.svg`} alt="Google Play" />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <img className={styles.responsive}  src={`${publicRuntimeConfig.MY_VAR}/Images/app_store.svg`} alt="App Store" />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};