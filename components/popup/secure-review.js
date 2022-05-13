import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import secure from '../../public/styles/securereview.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Securereview(props) {
  const pop = props.option;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
console.log(pop);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={secure.review1}>
        <Box sx={style}>
            <Grid item container spacing={0}> 
            <Grid item xs={12}>               
                <h3>Review</h3>                
            </Grid>    
            <Grid item xs={12} columns={{ xs: 12, md: 12 }} className={secure.card} >
              <Grid item={true} xs={12} lg={12}>
                <Typography variant="body2" fontWeight={600} color="#000" display="block" gutterBottom  align="left">Credit Card</Typography>
              </Grid>  
            </Grid>   
            <Grid container item columns={{ xs: 12, md: 12 }} className={secure.card_info} >
                 <Grid item={true} xs={6} lg={6}>
                    <Typography variant="body2" display="block" gutterBottom  align="left">Limit</Typography>
                  </Grid>   
                  <Grid item={true} xs={6} lg={6}>
                    <Typography variant="body2" fontWeight={600} color="#000" gutterBottom  align="right">₹ creditLimit </Typography>
                  </Grid>
               </Grid>   
               <Grid item xs={12} columns={{ xs: 12, md: 12 }} className={secure.fixed}>
              <Grid item={true} xs={12} lg={12}>
                <Typography variant="body2" fontWeight={600} color="#000" display="block" gutterBottom  align="left">Fixed Deposit</Typography>
            </Grid>  
            </Grid>  
               <Grid container item columns={{ xs: 12, md: 12 }} className={secure.fixed_info}>
                 <Grid item={true} xs={6} lg={6}>
                    <Typography variant="body2" display="block" gutterBottom  align="left">FD Amount</Typography>
                  </Grid>   
                  <Grid item={true} xs={6} lg={6} >
                    <Typography variant="body2" fontWeight={600} color="#000" gutterBottom  align="right">₹  fdAmount</Typography>
                  </Grid>
               </Grid>
            
               <Grid container item columns={{ xs: 12, md: 12 }} className={secure.fixed_info}>
                 <Grid item={true} xs={6} lg={6}>
                    <Typography variant="body2" display="block" gutterBottom  align="left">Time Period</Typography>
                  </Grid>   
                  <Grid item={true} xs={6} lg={6} >
                    <Typography variant="body2" fontWeight={600} color="#000" gutterBottom  align="right">13 months</Typography>
                  </Grid>
               </Grid>
               <Grid container item columns={{ xs: 12, md: 12 }} className={secure.fixed_interest}>
                 <Grid item={true} xs={8} lg={8} align="left">
                    <Typography variant="body2" display="block" gutterBottom  align="left">Interest Earned</Typography>
                    <Typography variant="caption" fontSize={12} fontWeight={500} color="#999" gutterBottom align="left">FD Interest will be as applicable at the time of creating FD</Typography>
                  </Grid>   
                  <Grid item={true} xs={4} lg={4} >
                    <Typography variant="body2" fontWeight={600} color="#000" gutterBottom  align="right">4.9%</Typography>
                  </Grid>
               </Grid>
               <Grid container item columns={{ xs: 12, md: 12 }} className={secure.fixed_interest}>
                 <Grid item={true} xs={7} lg={7} align="left">
                    <Typography variant="body2" display="block" gutterBottom  align="left">Maturity</Typography>
                    <Typography variant="caption" fontSize={12} fontWeight={500} color="#999" gutterBottom align="left">Your Fixed Deposit will be auto renewed to compound your returns</Typography>
                  </Grid>   
                  <Grid item={true} xs={5} lg={5} >
                    <Typography variant="body2" fontWeight={600} color="#000" gutterBottom  align="right">Principal+interest</Typography>
                  </Grid>
               </Grid>   
            </Grid>
            <Button
           // onClick={handleOnceClick}
           // disabled={disableOnClick}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              style={{maxHeight: '60px', minHeight: '54px',borderRadius: 12, backgroundColor: "#3857ff"}}>
              Confirm
            </Button>           
          </Box>
          </div>
      </Modal>
    </div>
  );
}