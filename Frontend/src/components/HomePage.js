import React, { useState, useEffect } from "react";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import SlideShow from "../elements/SlideShow.js";
import { Link } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";
import { ImageList, ImageListItem, ImageListItemBar, IconButton, } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';


function HomePage() {
    const [marvelResults,setMarvel] = useState([]);
    const [dcResults, setDC] = useState([]);
    const [tableState, setTableState] = useState("Marvel");

    useEffect(() => {        
        fetchMarvelData();
        fetchDCData();
    },[]);
    
    const fetchMarvelData = () => {
        const params = new URLSearchParams({
            bp: "Marvel",
         });

        const query = params.toString();
        const url = `http://127.0.0.1:8000/backend/search-books/?${query}`;
        
        fetch(url)
        
        .then((response) => response.json())
        .then((data) => setMarvel(data));
    };

    const fetchDCData = () => {
        const params = new URLSearchParams({
            bp: "DC",
         });

        const query = params.toString();
        const url = `http://127.0.0.1:8000/backend/search-books/?${query}`;
        
        fetch(url)
        
        .then((response) => response.json())
        .then((data) => setDC(data));        
    };


    const renderImageTable = () => {
        if(tableState === "Marvel") {        
            return(
            <Box sx={{ bgcolor:"background.main", px:2, py:0.5 }}>
                <ImageList sx={{ width: "100%", height: 750, pr:1 }} cols={3} gap={20} rowHeight={350}>            
                    {marvelResults.map((item) => (
                        <Link to={`book/${item.id}`} state={item} key={item.id}>    
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
            );
        } else {
            return(
            <Box sx={{ bgcolor:"background.main", px:2, py:0.5 }}>
                <ImageList sx={{ width: "100%", height: 750, pr:1 }} cols={3} gap={20} rowHeight={350}>            
                    {dcResults.map((item) => (
                        <Link to={`book/${item.id}`} state={item} key={item.id}>    
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
                );
        }        
    };
    
    return (
        <>
        <Header />
        <Grid container sx={{display:"flex", bgcolor:"background.main"}}>
                <Grid item xs={4} sx={{flexDirection:"column"}}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 200,
                            color: "secondary.main",
                            p:2
                        }}>
                        Lost and Found Comics
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 200,
                            p:2,
                        }}>
                        Search our collection of thousands of books from all eras.
                    </Typography>                            
                    <Box align="center">
                    <Button
                        color="secondary"                             
                        variant="contained"
                        href="/search">
                        Search
                    </Button>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <SlideShow />
                </Grid>
        </Grid>        
        
        <Grid container spacing={1} sx={{
            display:"flex",
            bgcolor:"tertiary.main",
            mt:0,
            borderBottom: 1,
            borderTop:1,        
            }}>
            <Grid item sx={{ display: "inline-flex", flexGrow: 1}}>
                <ElectricBoltRoundedIcon sx={{ pt:1 }} />
                <Typography
                variant="h6"
                sx={{
                    mt:0.5,
                    fontWeight: 500,
                }}
                >
                Browse by Publisher
                </Typography>
            </Grid>
            
            <Grid item sx={{pb:0.5}}>
                <Button 
                    variant="text"
                    color="inherit"
                    size="large"
                    onClick={() => {setTableState("Marvel")}}>
                    Marvel</Button>
                <Button 
                    variant="text"
                    color="inherit"
                    size="large"
                    onClick={() => {setTableState("DC")}}>
                    DC</Button>              
            </Grid>
        </Grid>

        {renderImageTable()}        
        
        <Footer />
        </>
    );
}

export default HomePage;