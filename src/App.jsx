import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [hello, setHello] = useState("no connect");

    const connect = () => {
        axios
            .get("/api", {})
            .then((res) => {
                console.log(res);
                setHello(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        connect();
    }, []);

    return (
        <div className="App">
            <h1>{hello}</h1>
        </div>
    );
}

export default App;
