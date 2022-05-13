import Container from '@mui/material/Container';
import styles from '../../public/styles/response.module.css';
import Layout from '@/components/layout';
import getConfig from 'next/config';
const {publicRuntimeConfig } = getConfig()

export default function NotSubmitted() {
    let obj = {};
    try{
        let response = sessionStorage.getItem('errorData');
        obj = JSON.parse(response);
    }catch(error){}
    return (
        <div>
            <Layout title='USCC_REJECT_PINCODE-PreLogin - kotak 811'>
            </Layout>
            <Container maxWidth="xs" className={styles.w340}>
                <div className={styles.adjustTop}>
                    <img src={`${publicRuntimeConfig.MY_VAR}/Images/error1.svg`} alt="Server Error" />
                    <h3>Application not submitted</h3>
                    <p>{obj!=null?obj.message:''}</p>
                </div>
            </Container>
        </div>
    );
};