import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Signup } from "../components/accounts";
import { auth } from "../firebase";

const Accounts = (props: any) => {
    return(
        <Box sx={{ height: "100vh" }}>
            <Routes>
                <Route path="login" element={props.isLoggedIn ? <Navigate to="/home" replace /> : <Login />} />
                <Route path="signup" element={props.isLoggedIn ? <Navigate to="/home" replace /> : <Signup />} />
            </Routes>
        </Box>
    )
}

export default Accounts;