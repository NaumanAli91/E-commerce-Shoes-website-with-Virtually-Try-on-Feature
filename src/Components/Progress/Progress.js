import React from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Circular({ children, isLoading }) {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Set the height to 100% of the viewport height
        }}
      >
        {isLoading ? (
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
          </Stack>
        ) : (
          children
        )}
      </Card>
    </>
  );
}
