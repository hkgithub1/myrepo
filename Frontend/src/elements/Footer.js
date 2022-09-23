import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';

export default function Footer() {
  return (    
      <Grid container spacing={1} position="relative" sx={{
        display:"flex",
        bgcolor:"secondary.main",
        mt:0,
        p:1,
        borderBottom: 1,
        zIndex:1251,      
        }}>
          <Grid item sx={{ display: "inline-flex", flexGrow: 1}}>
            <ElectricBoltRoundedIcon sx={{ pt:1 }} />
            <Typography
              variant="h4"
              component="a"
              href="/"
              sx={{
                pb:1,
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              L&F
            </Typography>
          </Grid>
          
          <Grid item sx={{mt:0.7}}>
            <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  px:2,
                  fontWeight: 200,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  px:2,
                  fontWeight: 200,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  px:2,
                  fontWeight: 200,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Search
              </Typography>
          </Grid>
      </Grid>    
  );
}
