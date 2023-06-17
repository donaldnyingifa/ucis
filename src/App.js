import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import FAQ from "./pages/faq";
import Dashboard from "./pages/dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route exact path='/faq' element={<FAQ />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
