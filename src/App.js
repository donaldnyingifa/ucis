import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import FAQ from "./pages/faq";
import RegistrationForm from "./pages/registrationForm";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/register' element={<RegistrationForm />} />
                <Route exact path='/faq' element={<FAQ />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
