import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "../src/pages/index";
import Login from "../src/pages/login";

export default function Rotas() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>

        </BrowserRouter>
    )
};
