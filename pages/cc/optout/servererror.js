import Layout from '@/components/layout';
import getConfig from 'next/config';
import styles from './style.module.css';




export default function Custom500() {

  return (
    <div>
    <Layout title='Technical_Failure-PreLogin - kotak 811'>
    </Layout>
    <div className='container w324' maxWidth="xs">
      <div className={styles.adjustTop}>
      <img
               src='../Images/error.svg'  alt="Server Error" />
        <h3>Something went wrong</h3>
        <p>We regret to inform that there was an error in processing your request.
          Try again after sometime</p>
      </div>
    </div>
  </div>
   

  );
};
