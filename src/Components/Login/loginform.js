import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  loginStart,
  selectLoginStatusexist,
  setEmail,
  selectEmail,
} from '../../features/authslice';

const Loginform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatusExist = useSelector(selectLoginStatusexist);
  const email = useSelector(selectEmail);
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    dispatch(loginStart({ email, password }));
  };

  useEffect(() => {
    if (loginStatusExist === true) {
      navigate('/');
    } else if (loginStatusExist === false) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
    }
  }, [loginStatusExist, navigate]);

  return (
    <div style={{ height: '100vh', width: '100%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          variant="body1"
          style={{
            color: '#101820',
            marginBottom: '20px',
            fontSize: '30px',
          }}
        >
          Already a member? What's your email and password?
        </Typography>
        <form style={{ width: '100%' }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                id="email"
                placeholder="Email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                style={{ marginBottom: '0px' }} // Reduce the bottom margin
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                placeholder="Password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSignIn}
                variant="contained"
                fullWidth
                sx={{
                  color: '#101820',
                  backgroundColor: '#FEE715',
                  '&:hover': { backgroundColor: '#FEE715' },
                  borderRadius: '15px',
                  marginTop: '5px',
                }}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '10px' }}>
              <Typography variant="body2">
                Not a member? <Link to="/signup" style={{ color: '#101820', textDecoration: 'none' }}>Sign Up</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
      {showErrorMessage && (
        <Snackbar
          open={showErrorMessage}
          autoHideDuration={5000} // Hide after 5 seconds
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <SnackbarContent
            style={{
              textAlign: 'center !important',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }} // Center text
            message="Invalid Email or Password"
          />
        </Snackbar>
      )}
    </div>
  );
};

export default Loginform;
