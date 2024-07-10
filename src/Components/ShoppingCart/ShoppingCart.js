import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { selectLoginStatusexist } from '../../features/authslice';
import { setSubtotal, setTotalAmount } from '../../features/cartslice'; 
import { fetchDiscountStart } from '../../features/DiscountSlice';

const ShoppingCart = () => {
  const dispatch = useDispatch(); 
  const products = useSelector((state) => state.cart.products); 
  const discounts = useSelector((state) => state.discount.discounts);
  const loginStatusExists = useSelector(selectLoginStatusexist);
  
  useEffect(() => {
    dispatch(fetchDiscountStart());
  }, [dispatch]);

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

  const shippingCharges = 6; 
  const estimatedTax = 0; 

  const subtotal = products.reduce((acc, product) => {
    const price = parseFloat(getDiscountedPrice(product.price));
    return acc + price * product.quantity;
  }, 0);
  
  const discountPercentage = subtotal > 1000 ? 0.10 : 0;
  const discount = subtotal * discountPercentage;
  const adjustedDiscount = subtotal === 0 ? 0 : discount;
  const adjustedShippingCharges = subtotal === 0 ? 0 : shippingCharges;
  const adjustedEstimatedTax = subtotal === 0 ? 0 : estimatedTax;
  const totalAmount =
    subtotal + adjustedShippingCharges + adjustedEstimatedTax - adjustedDiscount;

  useEffect(() => {
    dispatch(setSubtotal(subtotal));
    dispatch(setTotalAmount(totalAmount));
  }, [dispatch, subtotal, totalAmount]);

  return (
    <>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '10px',
          p: '25px',
          mb: '15px',
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px',
            color: '#101820',
          }}
        >
          Your Shopping Cart
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table aria-label="simple table" className="dark-table">
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell
                 align="left"
                 colSpan={2}
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                  }}
                >
                  Product
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                  }}
                >
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => {
                const firstImage = product.image ? product.image.split(',')[0].trim() : '';
                const image1URL = `https://api.dopes.online/${firstImage}`;
                const discountedPrice = getDiscountedPrice(product.price);
                
                return (
                  <TableRow key={product.productId}>
                    <TableCell
                     align="left"
                     colSpan={2}
                      sx={{
                        borderBottom: '1px solid #F7FAFF',
                        fontSize: '12px',
                        padding: '8px 10px',
                      }}
                    >
                      <img
                        src={image1URL}
                        alt="Product Img"
                        width={50}
                        className="borderRadius10"
                      />
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        borderBottom: '1px solid #F7FAFF',
                        fontSize: '12px',
                        padding: '8px 10px',
                      }}
                    >
                     Rs.{discountedPrice}
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow>
                <TableCell
                  align="left"
                  colSpan={2}
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '12px',
                    padding: '8px 10px',
                    fontWeight: '500',
                  }}
                >
                  Sub Total :
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '12px',
                    padding: '8px 10px',
                    fontWeight: '500',
                  }}
                >
                 Rs.{subtotal.toFixed(2)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  align="left"
                  colSpan={2}
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '12px',
                    padding: '8px 10px',
                    fontWeight: '500',
                  }}
                >
                  Discount :
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '12px',
                    padding: '8px 10px',
                    fontWeight: '500',
                  }}
                >
                 Rs.{adjustedDiscount.toFixed(2)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  align="left"
                  colSpan={2}
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '12px',
                    padding: '8px 10px',
                    fontWeight: '500',
                  }}
                >
                  Shipping Charge :
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '12px',
                    padding: '8px 10px',
                    fontWeight: '500',
                  }}
                >
                 Rs.{adjustedShippingCharges.toFixed(2)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  align="left"
                  colSpan={2}
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '12px',
                    padding: '8px 10px',
                    fontWeight: '500',
                  }}
                >
                  Estimated Tax :
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '12px',
                    padding: '8px 10px',
                    fontWeight: '500',
                  }}
                >
                 Rs.{adjustedEstimatedTax.toFixed(2)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  align="left"
                  colSpan={2}
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '13px',
                    padding: '8px 10px',
                    fontWeight: '500',
                    color: '#000',
                  }}
                >
                  Total (USD) :
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: '1px solid #F7FAFF',
                    fontSize: '13px',
                    padding: '8px 10px',
                    fontWeight: '500',
                    color: '#000',
                  }}
                >
                 Rs.{totalAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default ShoppingCart;
