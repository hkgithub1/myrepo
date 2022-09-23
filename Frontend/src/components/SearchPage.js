import React, { useState } from "react";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Box, Paper } from "@mui/material";
import { Drawer, Divider, } from "@mui/material";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow } from "@mui/material";

function SearchPage() {
    const [bookName, setName] = useState("");
    const [bookAuthor, setAuthor] = useState("");
    const [bookYear, setYear] = useState("");
    const [bookPub, setPub] = useState("");
    const [results, setResults] = useState([]);

    
    const searchButtonPressed = () => {
        const params = new URLSearchParams({ 
            bn: bookName,
            ba: bookAuthor,
            by: bookYear,
            bp: bookPub,
         });

        const query = params.toString();
        const url = `http://127.0.0.1:8000/backend/search-books/?${query}`;
        
        fetch(url)
        
        .then((response) => response.json())
        .then((data) => setResults(data));

        setName("");
        setAuthor("");
        setYear("");
        setPub("");
    };


    return (
        <>  
        <Header sx={{zIndex:1251}} />  
        <Box sx={{ flexDirection:"column", bgcolor:"background.main", mt:1, height:475}}>
            <Drawer
            sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="left"
            >
                <Grid container spacing={1} sx={{flexDirection: "column", bgcolor:"background.main", height:500, mt:8.4, py:3, px:1}}>
                    <Grid item>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Title"
                        placeholder="Enter title"
                        value={bookName}                        
                        onChange={(e) => setName(e.target.value)}
                    />
                    </Grid>

                    <Grid item>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Author"
                        placeholder="Enter author"
                        value={bookAuthor}                    
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    </Grid>

                    <Grid item>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Year"
                        placeholder="Enter year"
                        value={bookYear}                    
                        onChange={(e) => setYear(e.target.value)}
                    />
                    </Grid>

                    <Grid item>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Publisher"
                        placeholder="Enter publisher"
                        value={bookPub}                    
                        onChange={(e) => setPub(e.target.value)}
                    />
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={searchButtonPressed}
                    sx={{ml:7, mt:4}}
                    >
                        Search
                    </Button>
                    </Grid>
                </Grid>
            <Divider />                                                
            </Drawer> 

            <Grid container sx={{ pl:30, mt:-1 }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Search Results">
                    <TableHead sx={{bgcolor:"tertiary.main"}}>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Publisher</TableCell>                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row) => (                            
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor:"background.main" }}
                            >
                            
                            <TableCell>
                            <Link to={`/book/${row.id}`} key={row.id} state={row}>
                                {row.book_name}
                            </Link>
                            </TableCell>
                            
                            <TableCell>{row.book_author}</TableCell>
                            <TableCell>{row.book_year}</TableCell>
                            <TableCell>{row.book_publisher}</TableCell>
                            </TableRow>                            
                        ))}
                    </TableBody>

                </Table>
            </TableContainer> 
            </Grid>                                         
        </Box>
        <Footer sx={{zIndex:1251}} />         
        </>
    );
}

export default SearchPage;