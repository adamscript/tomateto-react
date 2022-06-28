import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { Login, Signup } from "../components/accounts";
import { auth } from "../firebase";

const Accounts = () => {
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);

    return(
        <Box sx={{ height: "100vh" }}>
            <Routes>
                <Route path="login" element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />} />
                <Route path="signup" element={isLoggedIn ? <Navigate to="/home" replace /> : <Signup />} />
            </Routes>
        </Box>
    )
}

export default Accounts;