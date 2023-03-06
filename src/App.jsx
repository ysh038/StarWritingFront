import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home/home.jsx";
import MemberInfo from "./page/memberInfo/memberInfo.jsx";
import SignUp from "./page/signup/signup.jsx";

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
            <Routes>
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
