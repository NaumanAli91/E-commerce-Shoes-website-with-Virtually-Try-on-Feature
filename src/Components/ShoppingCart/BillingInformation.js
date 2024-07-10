import React, { useState } from "react";
import { Box, Snackbar, Typography, Button, Divider, Slide } from '@mui/material';
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import PaymentIcon from '@mui/icons-material/Payment';
import { Suspense } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import RichTextEditor from '@mantine/rte';
import { useDispatch, useSelector } from 'react-redux';
import { submitBillingInformation } from '../../features/billinginformationslice';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { resetCart } from '../../features/cartslice'; 

const BillingInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subtotal = useSelector(state => state.cart.subtotal);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const products = useSelector(state => state.cart.products);
  const userexist = useSelector(state => state.existingPhone.userInformation);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const email = useSelector(state => state.auth.email);

  const firstintial = userexist?.fname || '';
  const lastintial = userexist?.lname || '';
  const emailintial = userexist?.email || '';
  const contactintial = userexist?.contact || '';
  const addressintial = userexist?.address || '';
  const cityintial = userexist?.city || '';

  // State to manage form fields
  const [formValues, setFormValues] = useState({
    firstName: firstintial,
    lastName: lastintial,
    emailAddress: emailintial,
    phone: contactintial,
    address: addressintial,
    townCity: cityintial,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const billingInfo = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        emailAddress: email, // Use email from Redux state
        phone: formData.get('phone'),
        address: formData.get('address'),
        townCity: formData.get('townCity'),
        subtotalvalue: subtotal, 
        totalAmountvalue: totalAmount, 
        productIds: products.map(product => product.productid),
        orderDate: new Date().toISOString().slice(0, 10) // Adding current date in YYYY-MM-DD format
    };
    dispatch(submitBillingInformation(billingInfo));
    dispatch(resetCart());
    alert('Your order has been placed. Thank you for shopping with us!');
    navigate('/');
};

  const handleSnackbaropen = () => {
    setShowSnackbar(true);
  };
  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Box
        sx={{
          background: '#fff',
          padding: '30px 20px',
          borderRadius: '8px',
          mb: '15px',
        }}
        className="card-dark-bg"
      >
        <Typography
          as="h4"
          fontWeight="500"
          fontSize="18px"
          mb="10px"
          sx={{ color: '#101820' }}
        >
          Billing Information
        </Typography>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={12} lg={6}>
            <Typography
              as="h5"
              sx={{
                fontWeight: '500',
                fontSize: '14px',
                mb: '12px',
              }}
            >
              First Name
            </Typography>

            <TextField
              autoComplete="first-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Enter name"
              autoFocus
              InputProps={{
                style: { borderRadius: 8 },
              }}
              value={formValues.firstName}
          onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
            />
          </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Last Name
              </Typography>

              <TextField
                autoComplete="last-name"
                name="lastName"
                required
                fullWidth
                id="LastName"
                label="Enter name"
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
                value={formValues.lastName}
                onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Phone
              </Typography>

              <TextField
                autoComplete="phone"
                name="phone"
                required
                fullWidth
                id="phone"
                label="Enter phone number"
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
                value={formValues.phone}
          onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
               City
              </Typography>

              <TextField
                autoComplete="town-city"
                name="townCity"
                required
                fullWidth
                id="townCity"
                label="Town/city" 
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
                value={formValues.townCity}
          onChange={(e) => setFormValues({ ...formValues, townCity: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Address
              </Typography>

              <TextField
                autoComplete="address"
                name="address"
                required
                fullWidth
                id="address"
                label="Your location"
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
                value={formValues.address}
                onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Order Notes :
              </Typography>

              <Suspense fallback={<div>Loading...</div>}>
                <RichTextEditor
                  id="rte"
                  controls={[
                    ['bold', 'italic', 'underline', 'link', 'image'],
                    ['unorderedList', 'h1', 'h2', 'h3'],
                    ['sup', 'sub'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                  ]}
                />
              </Suspense>
            </Grid>

            <Grid item xs={12} textAlign="end">
              <Button
                onClick={handleSnackbaropen}
                variant="contained"
                sx={{
                  backgroundColor: '#FEE715 !important',
                  textTransform: 'capitalize',
                  borderRadius: '8px',
                  fontWeight: '500',
                  fontSize: '13px',
                  padding: '12px 20px',
                  color: '#101820 !important',
                }}
              >
                Place Order
              </Button>
            </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={showSnackbar}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'down', timeout: 600 }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ backgroundColor: '#FEE715', color: '#101820' }} // Change background and text color here
        >
          <Typography variant="h6">Confirm your order</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>
            Payment method: Cash on delivery <PaymentIcon />
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1" sx={{ marginTop: '20px' }}>
            Confirm your order and your order will be delivered to you in 3-4 working days
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSnackbarClose}
              sx={{
                backgroundColor: '#fff !important',
                color: '#101820 !important',
                fontWeight: '500',
                padding: '8px 14px',
                marginTop: '20px',
                fontSize: '11px',
                borderRadius: '8px',
                marginRight: '10px',
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#101820 !important',
                marginTop: '20px',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '11px',
                padding: '8px 14px',
                color: '#fff !important',
              }}
              endIcon={<CheckCircleOutlineIcon />}
            >
              Confirm Order
            </Button>
          </Box>
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default BillingInformation;
