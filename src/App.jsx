import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Home from "./page/Home";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/inicio" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;