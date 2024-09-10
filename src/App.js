import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import BooksList from "./components/books-list.component";
import AddBook from "./components/add-book.component";



function App() {
    return (
        <Router>
            <div className="container">
                <Navbar/>
                <br/>
                <Routes>
                    <Route path="/" exact element={<BooksList />} />
                    <Route path="/edit/:id" element={<AddBook />} />
                    <Route path="/add" element={<AddBook />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
