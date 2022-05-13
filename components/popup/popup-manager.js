import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EnterCrn from './crn-validation';
import OtpValidation from './otp-validation';
import Preloader from '../../pages/preloader';
import { useRouter } from 'next/router';
import styles from '../../public/styles/Home.module.css';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()
export default function PopupManager(props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {setOpen(false); 
    props.SetStateToZero();
  };
  
  const router = useRouter();

  function stepsContent(stepIndex, moveToNextStep) {
    switch (stepIndex) {
      case 1:
        return (
          <div>
            <EnterCrn moveToNextStep={moveToNextStep} />
          </div>)
      case 2:
        return <OtpValidation moveToNextStep={moveToNextStep} onClose={moveToNextStep} />
      case 3:
        return <Preloader moveToNextStep={moveToNextStep} onClose={moveToNextStep} />
    };
  };

  return (

    <div>
     
          
      <Dialog open={open} maxWidth={"xs"} style={{marginTop: '10px', marginBottom: '10px'}}>
      <a onClick={handleClose} className={styles.crossButton}><img
              src={`${publicRuntimeConfig.MY_VAR}/Images/cancel.svg`} alt="Cancel" /></a>
        <DialogContent>
          {stepsContent(props.state, props.moveToNextStep)}
        </DialogContent>
      </Dialog>
    
    </div>
  );
};
