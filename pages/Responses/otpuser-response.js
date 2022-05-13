import Container from '@mui/material/Container';
import styles from '../../public/styles/response.module.css';
import Layout from '@/components/layout';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()
export default function FKYCPending() {

    return (
        <div>
            <Layout title='Fund &amp; KYC Pending'>
            </Layout>
            <Container maxWidth="xs" className={styles.w324}>
                <div className={styles.adjustTop}>
                    <img style={{ marginLeft: "15px" }} src={`${publicRuntimeConfig.MY_VAR}/Images/info.svg`}  alt="Information" />
                    <img style={{ position: "relative", left: "-20px" }}  src={`${publicRuntimeConfig.MY_VAR}/Images/info.svg`}  alt="Information" />
                    <h3>KYC Pending</h3>
                    <p style={{ paddingLeft: 0, paddingRight: 0 }}>You will have to <u>complete your KYC and fund your account</u> to receive your credit card within 45 days.</p>
                    <button style={{ width: "90%" }}>Complete your KYC</button>
                </div>
            </Container>
        </div>
    );
};