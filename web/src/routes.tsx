import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';

import Home from "../src/pages/index";
import Login from "../src/pages/login";
import Ads from "../src/pages/ads";
import User from './pages/user';

export default function Rotas() {

    //VERIFICANDO SE TEM O ID PARA CONTINUAR
    const PrivateRoute = () => (

        sessionStorage.getItem('identify') ? (
            <Outlet />
        ) : (
            <Navigate to="/login" />
        )
    );

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>

                <Route path="/ads/:id" element={<PrivateRoute />}>
                    <Route path="/ads/:id" element={<Ads />} />
                </Route>

                <Route path="/user" element={<PrivateRoute />}>
                    <Route path="/user" element={<User />} />
                </Route>

                <Route path="/login" element={<Login />} />

            </Routes>

        </BrowserRouter>
    )
};
