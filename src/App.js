import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//components:
import TitleDetails from './components/TitleDetails';
import TitleList from './components/TitleList';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TitleList />} />
                <Route path="/titles/:id" element={<TitleDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
