import Layout from '@/components/layout';
import Container from '@mui/material/Container';
import styles from '../public/styles/response.module.css';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()

export default function Env(props) {
    const DevDetails = process.env.DevDetails;
    const ProdDetails = process.env.ProdDetails;
    console.log("&&&&", ProdDetails)
  return (
    <div>
      <Layout title='Server Error'>
      </Layout>
      <Container maxWidth="xs" className={styles.w330}>
        <div className={styles.adjustTop}>
        <img
              src={`${publicRuntimeConfig.MY_VAR}/Images/error.svg`} alt="Server Error" />
          <h3>Environment Variable Testing</h3>
          <h4>Validate CRN: {process.env.NEXT_PUBLIC_ENDPOINT}</h4>
          <p>Production Server Details: {ProdDetails}</p>
        </div>
      </Container>
    </div>

  );
};
