import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { selectEmail, selectLoginStatusexist } from '../../features/authslice';
import { setGrandTotalsstart, selectGrandTotals } from '../../features/orderhistoryslice';

const YourOrderhistory = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const loginStatusExists = useSelector(selectLoginStatusexist);
  const data = useSelector((state) => state.ordershistory) || { grandTotals: [] };
  const grandTotals = data.grandTotals || [];

  useEffect(() => {
    if (loginStatusExists === true) {
      dispatch(setGrandTotalsstart(email));
    }
  }, [dispatch, email, loginStatusExists]);

  // Render "Please login" message if login status is null or false
  if (loginStatusExists !== true) {
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
          Order History
        </Typography>
  
       
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>
                      Please login to see your Order history
                    </Typography>
                  </TableCell>
                </TableRow>
             
      </Card>
      </>
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
          Order History
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
            <TableBody>
              {/* Table headings */}
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: "bold", fontSize: "15px",color:"#101820" }}>
                    Order #
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontWeight: "bold", fontSize: "15px",color:"#101820" }}>
                    Total Amount
                  </Typography>
                </TableCell>
              </TableRow>
  
              {/* Table data */}
              {grandTotals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>
                      You haven't placed any order yet
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                grandTotals.map((total, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "12px", padding: "8px 10px" }}>
                      <b>Rs.{total}</b>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

export default YourOrderhistory;
