import React from 'react';
import { useState } from 'react';
import { TextField, Button, Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Inventory(props) {
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
        const url = `/backend/search-books/?${query}`;
        
        fetch(url)
        
        .then((response) => response.json())
        .then((data) => setResults(data));

        setName("");
        setAuthor("");
        setYear("");
        setPub("");
    };

    const addButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
                book_name: bookName,
                book_author: bookAuthor,
                book_year: bookYear,
                book_publisher: bookPub,
            }),
        };
        fetch("/backend/add-book/", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));

        setName("");
        setAuthor("");
        setYear("");
        setPub("");
    };

    const deleteButtonPressed = (item) =>{
        const url = `/backend/delete-book/${item.id}`;

        fetch(url,{method: "DELETE"})
        
        .then((response) => response.json())
        .then((data) => console.log(data));


    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
            <TextField
                label="Title"
                placeholder="Enter title"
                value={bookName}
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
            />
            </Grid>

            <Grid item xs={3}>
            <TextField
                label="Author"
                placeholder="Enter author"
                value={bookAuthor}
                variant="outlined"
                onChange={(e) => setAuthor(e.target.value)}
            />
            </Grid>

            <Grid item xs={3}>
            <TextField
                label="Year"
                placeholder="Enter year"
                value={bookYear}
                variant="outlined"
                onChange={(e) => setYear(e.target.value)}
            />
            </Grid>

            <Grid item xs={3}>
            <TextField
                label="Publisher"
                placeholder="Enter publisher"
                value={bookPub}
                variant="outlined"
                onChange={(e) => setPub(e.target.value)}
            />
            </Grid>
            
            <Grid item xs={6} align="right">
            <Button
                variant="contained"
                color="primary"
                onClick={searchButtonPressed}
            >
                Search
            </Button>
            </Grid>

            <Grid item xs={6} align="left">
            <Button
                variant="contained"
                color="secondary"
                onClick={addButtonPressed}
            >
                Add
            </Button>
            </Grid>

            <Grid item xs={12} align="center">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Search Results">
                    <TableHead>
                    <TableRow>
                        <TableCell>Book ID</TableCell>
                        <TableCell align="justify">Title</TableCell>
                        <TableCell align="justify">Author</TableCell>
                        <TableCell align="justify">Year</TableCell>
                        <TableCell align="justify">Publisher</TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="justify">{row.book_name}</TableCell>
                            <TableCell align="justify">{row.book_author}</TableCell>
                            <TableCell align="justify">{row.book_year}</TableCell>
                            <TableCell align="justify">{row.book_publisher}</TableCell>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {deleteButtonPressed(row)}}
                            >
                            Delete
                            </Button>
                            
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>    
            </Grid>




        </Grid>


            
    );
}

export default Inventory;