import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectShowModal, setShowModal} from '../../features/modalslice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { setEmailEntered,checkEmailExistsSuccess, selectEmailEntered,    selectRegistrationStatusexist, selectEmail,setEmail,registerUserStart, selectRegistrationStatus, checkEmailExistsStart, selectEmailExists, selectEmailCheckLoading } from '../../features/authslice';
import { Typography, Button, Divider } from '@mui/material';
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

const MyModal = () => {
  const globalShowModal = useSelector(selectShowModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    // Dispatch the action to close the modal
    dispatch(setShowModal(false));
  };
  const handleCreateAccountClick = () => {

    navigate('/signup');
  };

  const handleLoginClick = () => {
    // Navigate to the "/login" route
    navigate('/login');
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={globalShowModal}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={globalShowModal}>
        <Box sx={style} className="bg-black" onClick={(e) => e.stopPropagation()}>
          <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', color: '#101820' }}>
            Become a DOPES Member Now
          </Typography>
          <Button
            onClick={handleCreateAccountClick}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mr: 2, bgcolor: '#FEE715', color: '#101820', '&:hover': { backgroundColor: '#FEE715' } }}
          >
            Create your Account
          </Button>
          <Divider sx={{ mt: 2, mb: 2, borderColor: 'grey.500' }} />
          <Typography id="transition-modal-description" sx={{ mt: 2 ,color:'gray'}} >
            Already have an account?{' '}
            <Button color="primary" sx={{ color: '#101820' }} onClick={handleLoginClick}>
              Login Now
            </Button>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MyModal;
