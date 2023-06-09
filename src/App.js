import React from "react";
import { UserProvider } from "./UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import FAQ from "./pages/faq";
import User from "./pages/user";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";
import Update from "./pages/update";
import Header from "./components/header";
import Footer from "./components/footer";

const App = () => {
    return (
      <UserProvider>
        <BrowserRouter>
        <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/user' element={<User />} />
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route exact path='/faq' element={<FAQ />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/update' element={<Update/>} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </UserProvider>
    );
};

export default App;
