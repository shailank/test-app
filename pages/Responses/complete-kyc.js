import Container from '@mui/material/Container';
import styles from '../../public/styles/response.module.css';
import Layout from '@/components/layout';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()
export default function KYCPendingNew() {
    return (
        <div>
            <Layout title='KYC Pending'>
            </Layout>
            <Container maxWidth="xs" className={styles.w324}>
                <div className={styles.adjustTop}>
                    <img src={`${publicRuntimeConfig.MY_VAR}/Images/info.svg`}   alt="Information" />
                    <h3>KYC Pending</h3>
                    <p>You will have to complete your KYC to receive your credit card within 45 days</p>
                    {/* <button>Complete your KYC</button> */}
                </div>
            </Container>
        </div>
    );
};