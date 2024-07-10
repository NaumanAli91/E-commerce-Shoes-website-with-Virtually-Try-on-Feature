import * as React from "react";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const HaveAPromoCode = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 20px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "10px",
          }}
        >
          Have a Promo Code?
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          position="relative"
        >
          <TextField
            fullWidth
            id="couponCode"
            label="Coupon code"
            name="email"
            autoComplete="Coupon code"
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor:"#FEE715",
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "10px 18px",
              position: "absolute",
              right: "5px",
              top: "5px",
              color: "#101820 !important",
              '&:hover': {
                backgroundColor: "#FEE715", // Set the same background color as the default state
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default HaveAPromoCode;
