import React, { useState, useEffect } from "react";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import { useLocation, Link } from "react-router-dom";
import MainCarousel from "../elements/MainCarousel.js";
import { Grid, Typography, Box, Button, Modal, Paper } from "@mui/material";
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { Drawer } from "@mui/material";



const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.secondary",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");


function BookMainPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(cartFromLocalStorage);
    const [comicsResults, setResults] = useState([]);

    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    useEffect(() => {
        fetchComicsData();
    },[]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleCartOpen = () => setCartOpen(true);
    const handleCartClose = () => setCartOpen(false);

    const fetchComicsData = () => {
        const params = new URLSearchParams({
            bp: data.book_publisher,
         });

        const query = params.toString();
        const url = `http://127.0.0.1:8000/backend/search-books/?${query}`;
        
        fetch(url)
        
        .then((response) => response.json())
        .then((data) => setResults(data));        
    };

    const addToCart = (newitem) => {
        setCartItems([...cartItems, {...newitem}]);       
    };

    const removeFromCart = (removeitem) => {
        setCartItems(cartItems.filter((item) => item !== removeitem));
    };

    return (
        <>
        <Header/>
        <Grid container spacing={1} sx={{display:"flex", mt:0}}>
            <Grid item xs={6} sx={{bgcolor:"background.main", flexDirection:"column", p:1}}>
                <Box align="center">
                <img 
                    src={require("../images/"+data.first_image+".jpg")}
                    height="auto"
                    width="90%"
                    onClick={handleModalOpen} />
                </Box>
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                
                <MainCarousel {...data} />

                </Box>
                </Modal>
                <Typography variant="subtitle2" align="center">
                    Click image to enlarge
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{bgcolor:"background.main", flexDirection:"column"}}>
                <Typography variant="h5">Book Name: {data.book_name} </Typography>
                <Typography variant="h5">Author: {data.book_author} </Typography>
                <Typography variant="h5">Year: {data.book_year} </Typography>
                <Typography variant="h5">Publisher: {data.book_publisher} </Typography>
                <Grid item xs={6} sx={{my:2}}>
                <Button color="secondary" variant="contained" onClick={() => {addToCart(data)}}>Add to Cart</Button> 
                <Button color="secondary" variant="contained" onClick={handleCartOpen} sx={{ml:2}}>Show Cart ({cartItems.length})</Button>
                </Grid>
                <Grid item xs={6} sx={{my:2}}>
                <Button color="secondary" variant="contained" href="/checkout">Checkout</Button> 
                </Grid>               
            </Grid>        
        </Grid>
        <Grid item xs={12} sx={{bgcolor:"tertiary.main", pl:2}}>
        <Typography
                variant="h6"
                sx={{
                    mt:0.5,
                    fontWeight: 500,
                }}
                >
                Similar results
                </Typography>
        </Grid>
        <Box sx={{ bgcolor:"background.main", px:2, py:0.5 }}>
        <ImageList sx={{ width: "100%", height: 275 }} cols={5} gap={5} rowHeight={250}>            
            {comicsResults.map((item) => (
                <Link to={`../book/${item.id}`} state={item} key={item.id}>
                <ImageListItem key={item.id}>
                    <img
                        src={require("../images/"+item.first_image+".jpg")}
                        alt={item.book_name}
                        loading="lazy"/>
                <ImageListItemBar
                    position="bottom"
                    title={item.book_name}
                    subtitle={item.book_author}
                    actionIcon={
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.book_name}`}                            >
                            <InfoIcon />
                        </IconButton>}/>
                </ImageListItem>
                </Link>
            ))}
        </ImageList>
        </Box>
        <Box sx={{ flexDirection:"column", bgcolor:"background.main" }}>
            <Drawer
            open={cartOpen}
            onClose={handleCartClose}
            variant="temporary"
            anchor="right"
            sx={{
            width: 550,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 550,
                boxSizing: 'border-box',
            },
            }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550, mt:10.5 }} aria-label="Cart Items">
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


            </Drawer>
        </Box>
        <Footer />
        </>
    );
}

export default BookMainPage;