import React  from 'react';
import { Link } from "react-router-dom";

export default function () {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">BookKeeper</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/add" className="nav-link">Add Book</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
