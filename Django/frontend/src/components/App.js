import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage';
import Inventory from './Inventory';


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <HomePage/> } />
                <Route path="inventory" element={ <Inventory/> } />
            </Routes>
        </div>
    );

}

export default App;