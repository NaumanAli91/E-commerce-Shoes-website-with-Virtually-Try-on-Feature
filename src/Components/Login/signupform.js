import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateOTP } from 'simple-otp-generator'; 
import { useNavigate, Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  Grid,
} from '@mui/material';
import {
  registerUserStart,
  checkEmailExistsStart,
  selectEmailExists,
  selectEmailCheckLoading,
} from '../../features/authslice';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailExists = useSelector(selectEmailExists);
  const emailCheckLoading = useSelector(selectEmailCheckLoading);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [DOB, setDOB] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [status, setStatus] = useState('notverified');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterClick = async () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!DOB) newErrors.DOB = 'Date of Birth is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter and one special character(&,#,..).');
      return;
    }

    // Check if the email exists
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      alert('Email already exists, try login');
      navigate('/login');
    } else {
      const otp = generateOTP(6);
      dispatch(registerUserStart({
        email,
        firstName,
        lastName,
        password,
        DOB,
        otp,
        status,
      }));
      navigate('/verifyemail');
    }
  };

  const checkIfEmailExists = async (email) => {
    const response = await fetch('http://api.dopes.online/api/check_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    return result.exists;
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  return (
    <div style={{ backgroundColor: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container component="main" maxWidth="xs">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Now let's make you a DOPES member
          </Typography>
          <Typography component="p" style={{ marginTop: '10px' }}>
            Please fill the form to create an account
          </Typography>
          <form style={{ width: '100%', marginTop: '30px' }} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  InputProps={{
                    style: { borderRadius: 4 },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  InputProps={{
                    style: { borderRadius: 4 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmailState(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  autoComplete="off"
                  InputProps={{
                    style: { borderRadius: 4 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password || !!passwordError}
                  helperText={errors.password || passwordError}
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
                    style: { borderRadius: 4 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  id="dob"
                  value={DOB}
                  onChange={(e) => setDOB(e.target.value)}
                  error={!!errors.DOB}
                  helperText={errors.DOB}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    style: { borderRadius: 4 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I accept the Terms of Use & Privacy Policy."
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              style={{
                margin: '24px 0px 16px',
                color: '#101820',
                backgroundColor: '#FEE715',
                '&:hover': { backgroundColor: '#FEE715' },
              }}
              onClick={handleRegisterClick}
            >
              Sign Up
            </Button>
            <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
              Already a DOPES member? <Link to="/login" style={{ color: '#101820', textDecoration: 'underline' }}>Try Login</Link>
            </Typography>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignupForm;
