import Container from '@mui/material/Container';
import styles from '../../public/styles/response.module.css';
import Layout from '@/components/layout';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()

export default function AppProgress() {
    let obj = {};
    let showVkycButton = true;
    try {
        let response = sessionStorage.getItem('successData');
        obj = JSON.parse(response);
    } catch(error){}

    return (
        <div>
            <Layout title='App In Progress'>
            </Layout>
            <Container maxWidth="xs" className={styles.w324}>
                <div className={styles.adjustTop}>
                    <img src={`${publicRuntimeConfig.MY_VAR}/Images/blue_check.svg`}   alt="Check" />
                    {showVkycButton==false?<h3>Application in Process</h3>:''}
                    <p>{obj!=null?obj.message:''}</p>
                    {/* <a href="/">Track your application</a> */}
                </div>
            </Container>
        </div>
    );
};