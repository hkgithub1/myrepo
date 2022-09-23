import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import SearchPage from "./components/SearchPage.js";
import BookMainPage from "./components/BookMainPage.js";
import CheckoutPage from "./components/CheckoutPage.js";
import TestPage from "./components/TestPage.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="search/" element={<SearchPage />} />          
          <Route path="book/" element={<BookMainPage />} />
          <Route path="book/:id" element={<BookMainPage />} />
          <Route path="checkout/" element={<CheckoutPage />} />
          <Route path="test/" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

const theme = createTheme({
  palette: {
    primary: {
      main: "#24248f"
    },

    secondary: {
      main: "#ffcc00"
    },

    tertiary: {
      main: "#004d00"
    },

    background: {
      main: "#e6e6e6",
      secondary: "#262626"
    },

    button: {
      main: "#ffd633"
    }
  },
});