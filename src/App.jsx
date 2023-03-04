import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home/home.jsx";
import MemberInfo from "./page/memberInfo/memberInfo.jsx";

function App() {
    const connect = () => {};

    useEffect(() => {
        connect();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/memberInfo/:id" element={<MemberInfo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
