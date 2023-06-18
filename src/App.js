import React from "react";
import { UserProvider } from "./UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import FAQ from "./pages/faq";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";

const App = () => {
    return (
      <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route exact path='/faq' element={<FAQ />} />
                <Route exact path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
        </UserProvider>
    );
};

export default App;
