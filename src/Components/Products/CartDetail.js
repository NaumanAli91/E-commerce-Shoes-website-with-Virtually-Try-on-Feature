import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import { Box, Typography, Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { checkcontactExistsStart } from '../../features/existingphoneslice';
import { setloginShowModal } from '../../features/Loginmodalslice';
import { selectLoginStatusexist } from '../../features/authslice';
import { setShowModal } from '../../features/modalslice';
import { removeFromCartStart, decrementQuantityStart, incrementQuantityStart } from '../../features/cartslice';
import { fetchDiscountStart } from '../../features/DiscountSlice';

const CartDetail = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactExists = useSelector((state) => state.existingPhone.exists);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const discounts = useSelector((state) => state.discount.discounts);
  const loginStatusExists = useSelector(selectLoginStatusexist);

  useEffect(() => {
    dispatch(fetchDiscountStart());
  }, [dispatch]);

  const handleIncrement = (productID) => {
    dispatch(incrementQuantityStart(productID));
  };

  const handleDecrement = (productID) => {
    dispatch(decrementQuantityStart(productID));
  };

  const handleDelete = (productID) => {
    dispatch(removeFromCartStart(productID));
  };

  useEffect(() => {
    if (contactExists) {
      console.log('Phone number exists, autofill billing information and navigate to ShoppingCart');
    }
  }, [contactExists]);

  const contactcheck = () => {
    dispatch(checkcontactExistsStart(phoneNumber));
    navigate('/ShoppingCart');
  };

  const handleCheckout = () => {
    if (loginStatusExists) {
      setIsModalOpen(true);
    } else {
      dispatch(setShowModal(true));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePhoneNumberChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    setPhoneNumber(numericValue);
  };

  const getDiscountedPrice = (price) => {
    const today = new Date();
    const discount = discounts.find(discount => {
      const startDate = new Date(discount.startDate);
      const endDate = new Date(discount.endDate);
      return discount.isActive === 1 && today >= startDate && today <= endDate;
    });

    if (discount) {
      const discountAmount = discount.amount;
      const discountedPrice = price - (price * (discountAmount / 100));
      return discountedPrice.toFixed(2);
    }

    return price.toFixed(2);
  };

  if (!products || !products.length) {
    return (
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "20px",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          Your Cart is Empty!
        </Typography>
      </Card>
    );
  }

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "20px",
          }}
        >
          Shopping Cart
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                  }}
                >
                  Product
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                  }}
                >
                  Total Amount
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((pro) => {
                const firstImage = pro.image ? pro.image.split(',')[0].trim() : '';
                const image1URL = `https://api.dopes.online/${firstImage}`;
                const discountedPrice = getDiscountedPrice(pro.price);

                return (
                  <TableRow key={pro.productid}>
                    <TableCell>
                      <Box>
                        <img
                          src={image1URL}
                          alt="Product"
                          width={50}
                          className="borderRadius10"
                        />
                        <Typography sx={{ fontWeight: "500", fontSize: "12px" }} className='ml-10px'>
                          {pro.productname}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "12px", padding: "8px 10px" }}>
                    Rs.{discountedPrice}
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "12px", padding: "8px 10px" }}>
                      <Button onClick={() => handleDecrement(pro.productid)}>-</Button>
                      <span>{pro.quantity}</span>
                      <Button onClick={() => handleIncrement(pro.productid)}>+</Button>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "12px", padding: "8px 10px" }}>
                      <b>Rs.{(discountedPrice * pro.quantity).toFixed(2)}</b>
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "12px", padding: "8px 10px" }}>
                      <Tooltip title="Remove" placement="left" arrow>
                        <IconButton onClick={() => handleDelete(pro.productid)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2}>
          <Typography fontWeight="500" mb="5px">Add a Note:</Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder="Some demo text ... "
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '1px solid #E7EBF5',
              borderRadius: '10px',
              padding: '10px'
            }}
            className="dark-textarea"
          />
          <Box align="end">
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon sx={{ color: "#101820 !important" }} />}
              onClick={handleCheckout}
              sx={{
                backgroundColor: "#FEE715",
                p: "10px 25px",
                mt: '10px',
                textTransform: 'capitalize',
                color: "#101820 !important",
                '&:hover': {
                  backgroundColor: "#FEE715",
                },
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '400px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#FFF',  // Background color of the modal
            p: 4,
            borderRadius: '10px',
          }}
        >
          <h2
            id="modal-modal-title"
            style={{
              background: '#FEE715',
              color: '#101820',
              fontSize: '15px',
              textAlign: 'center',
              padding: '10px',
              borderRadius: '2px',
              marginBottom: '10px',
            }}
          >
            Enter your phone number
          </h2>
          <TextField
            type='tel'
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Grid container justifyContent="flex-end">
            <Button 
              onClick={handleModalClose} 
              variant="contained" 
              color="primary" 
              style={{ fontSize: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: '#101820' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={contactcheck} 
              variant="contained" 
              style={{ fontSize: '10px', backgroundColor: '#FEE715', marginTop: '10px', color: '#101820' }}
            >
              Proceed to billing
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default CartDetail;
