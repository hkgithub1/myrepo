import React, { useState, useEffect } from "react";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import { Grid, Typography, TextField, Button, Paper } from "@mui/material";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow } from "@mui/material";


const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");


function CheckoutPage() {
    const [name, setName] = useState("");
    const [address, setAdd] = useState("");
    const [email, setEmail] = useState("");
    const [ccinfo, setCCinfo] = useState("");

    const [cartItems, setCartItems] = useState(cartFromLocalStorage);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const removeFromCart = (removeitem) => {
        setCartItems(cartItems.filter((item) => item !== removeitem));
    };

    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += parseFloat(item.book_price);
    });

    const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];
    console.log(toFixed(totalPrice,2))
    
    return (
        <>
        <Header />
        <Grid container spacing={1} xs={12} sx={{bgcolor:"background.main", height:475, mt:0}}>
            <Grid container xs={6} sx={{flexDirection:"column", p:4}}>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Name"
                        placeholder="Enter Name"
                        value={name}
                        sx={{py:1}}                        
                        /*onChange={(e) => setName(e.target.value)}*/
                    />
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Address"
                        placeholder="Enter Address"
                        value={address}
                        sx={{py:1}}                        
                        /*onChange={(e) => setName(e.target.value)}*/
                    />
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Email"
                        placeholder="Enter Email"
                        value={email}
                        sx={{py:1}}                        
                        /*onChange={(e) => setName(e.target.value)}*/
                    />
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Credit Card Number"
                        placeholder="Enter Credit Card Number"
                        value={ccinfo}
                        sx={{py:1}}                        
                        /*onChange={(e) => setName(e.target.value)}*/
                    />                    
            </Grid>
            <Grid container xs={6} sx={{flexDirection:"column", p:4, borderLeft:1}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="Cart Items">
                    <TableHead sx={{bgcolor:"tertiary.main"}}>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Issues</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell></TableCell>                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((row, index) => (                            
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor:"background.main" }}>                            
                            <TableCell>{row.book_name}</TableCell>                            
                            <TableCell>{row.book_issues}</TableCell>
                            <TableCell>{row.book_price}</TableCell>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {removeFromCart(row)}}
                                sx={{mt:0.8}}>
                            Remove
                            </Button>
                            </TableRow>                            
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid item sx={{mt:2, flexDirection:"column"}}>
                <Typography variant="h6">Total Price: {toFixed(totalPrice,2)}</Typography>
                <Button variant="contained" color="secondary" sx={{mt:0.8}}>Place Order</Button>
            </Grid>
            </Grid>

        
        </Grid>
        <Footer />
        </>
    );
}

export default CheckoutPage;