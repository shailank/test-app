import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function Lien() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div className="mod">
        <span className="terms" onClick={handleOpen}>Lien marking</span>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="terms-pop" >   
        <p className="close" onClick={handleClose}>X</p>         
            <iframe src="https://www.kotak.com/bank/mailers/2020/files/Lienonfd/Lienonfd.htm" width="90%" height="100%"></iframe>           
        </Box>
      </Modal>
    </div>
  );
}