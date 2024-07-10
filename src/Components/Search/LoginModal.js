import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Divider } from '@mui/material';
import { loginSuccess, setEmailEntered, setEmail } from '../../features/authslice';
import { selectloginShowModal, setloginShowModal } from '../../features/Loginmodalslice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Updated width to be responsive
    maxWidth: 400, // Added maxWidth to limit the width on larger screens
    bgcolor: '#fff !important',
    border: '10px solid #fff',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

const LoginModal = () => {
  const globalShowloginModal = useSelector(selectloginShowModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    // Dispatch the action to close the modal
    dispatch(setloginShowModal(false));
  };
  
  const handleCreateAccountClick = () => {
    // Navigate to the "/Orderhistory" route
    navigate('/Orderhistory');
    dispatch(setloginShowModal(false));
  };

  const handleLogoutClick = () => {
    dispatch(loginSuccess({ exists: null }));
    dispatch(setEmailEntered(false)); // Dispatch action to set login status exist to false
    dispatch(setEmail('')); // Clear the email from Redux state
    navigate('/');
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={globalShowloginModal}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={globalShowloginModal}>
        <Box sx={style} className="bg-black" onClick={(e) => e.stopPropagation()}>
          <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', color: '#101820' }}>
            You are Logged in now
          </Typography>
          <Button
            onClick={handleCreateAccountClick}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mr: 2, bgcolor: '#FEE715', color: '#101820', '&:hover': { backgroundColor: '#FEE715' } }}
          >
            My orders history
          </Button>
        
          <Divider sx={{ mt: 2, mb: 2, borderColor: 'grey.500' }} />
          <Typography id="transition-modal-description" sx={{ mt: 2, color: 'gray' }}>
            Wants to Logout ?
            <Button color="primary" sx={{ color: '#101820' }} onClick={handleLogoutClick}>
              LogOut
            </Button>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
