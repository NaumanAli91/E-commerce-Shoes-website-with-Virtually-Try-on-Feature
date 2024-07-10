import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styles from './verifyemail.module.css';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOtpChange = (index, value) => {
    if (isNaN(value) || value.length > 1) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value.length === 1 && index < otp.length - 1) {
      const nextIndex = index + 1;
      document.getElementById(`otp-input-${nextIndex}`).focus();
    }
  };
  const verifyEmail = async () => {
    const otpCode = otp.join('');
    console.log(otpCode);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put('http://api.dopes.online/api/verify_otp', { otp: otpCode });
      if (response.status === 200) {
        navigate('/login');
      } else {
        setError('Wrong OTP entered. Please try again.');
      }
    } catch (error) {
     alert('Wrong OTP,Try again')
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') { 
        const currentIndex = parseInt(event.target.id.split('-')[2]); 
        const previousIndex = currentIndex === 0 ? 5 : currentIndex - 1;
        document.getElementById(`otp-input-${previousIndex}`).focus();
      } else if (event.key === 'ArrowRight') { 
        const currentIndex = parseInt(event.target.id.split('-')[2]); 
        const nextIndex = currentIndex === 5 ? 0 : currentIndex + 1;
        document.getElementById(`otp-input-${nextIndex}`).focus();
      } else if (event.key === 'Enter') { 
        event.preventDefault(); 
        if (otp.every(digit => digit !== '')) { 
          verifyEmail(); 
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [otp]); 

  return (
    <div className={styles.container}>
      <h2>Verify Your Email</h2>
      <p className={styles.subText}>Please enter the OTP sent to your email address.</p>

      <div className={styles['otp-container']}>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            autoComplete="off"
            className={styles['otp-input']}
          />
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button
        onClick={verifyEmail}
        variant="contained"
        disabled={loading}
        sx={{
          p: '10px 25px',
          color: '#101820 !important',
          backgroundColor: '#FEE715 !important',
          marginTop: '20px',
        }}
      >
        {loading ? 'Verifying...' : 'Verify Email'}
      </Button>
      {/* You can add additional UI elements like a resend OTP button here */}
    </div>
  );
}
