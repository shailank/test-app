import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import {useEffect} from 'react';
import { ApiCall } from '../../api/apiCall'
import * as Constants from '../../api/apiurl';
import styles from './style.module.css';


 export default function OptOut({optOutToken}) {
    const router = useRouter();
    useEffect(() => {
        const validateoptOutToken = async (event) => {
          let data = { "optOutToken" : optOutToken.replaceAll(' ', '+')};
          try {
            const res = await ApiCall(Constants.VALIDATETOKEN, data);
            const result = await res.json();
              switch (res.status) {
                case 200:
                      if(result.statusCode === 200) {
                        if(result.status === "SUCCESS") {
                            let customerData = result.data;
                            sessionStorage.setItem('customerName', customerData.customerName);
                            sessionStorage.setItem('trackingId', customerData.trackingId);
                            sessionStorage.setItem('optOutToken', optOutToken);
                            router.push('/cc/optout/review');                        
                        }
                        else {switch (result.errors[0].errorCode) {
                          case 1801:
                          let responseErrorData = result.errors[0];
                            sessionStorage.setItem("responseErrorData", JSON.stringify(responseErrorData));
                            router.push('/cc/optout/timeOut') 
                          break;
                          case 1802:
                            let errorData = result.errors[0];
                            sessionStorage.setItem("errorData", JSON.stringify(errorData));
                            router.push('/cc/optout/timeOut') 
                          break;
                          case 551:
                            sessionStorage.clear();
                            router.push('/cc/optout/servererror') 
                          break;
                          default:
                            sessionStorage.clear();
                            router.push('/cc/optout/servererror') 
                          }
                        
                        }
                      }
                    break;
                default:
                  router.push('/cc/optout/servererror')  
                break;
              }
          } catch(error) {}
          };
            validateoptOutToken();
      }, []);
  return (
    <div>
    <Layout title='OPT_OUT_ELIGIBILTY-PreLogin - kotak 811'>
    </Layout>
    <div className='container' maxWidth="xs">
      <div className={styles.loaderStyle}>
        <p>Checking Your application status</p>
        <img className={styles.loader} src='../../Images/loader.svg' alt="Server Error" />
        </div>
    </div>
  </div>
    
  );
};
OptOut.getInitialProps = ({query}) => {
  const {optOutToken} = query
  return {optOutToken}
}