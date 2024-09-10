import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Book = props => (
    <tr>
        <td>{props.book.title}</td>
        <td>{props.book.author}</td>
        <td>{props.book.genre}</td>
        <td>
            <Link to={"/edit/" + props.book._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBook(props.book._id) }}>delete</a>
        </td>
    </tr>
);

export default function BookList() {
    const url = 'http://localhost:5000/';
    const [books, setBooks] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(url);
            setBooks(res.data);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const deleteBook = async (id) => {
        try {
            await axios.delete(url+ id)
            setBooks(books.filter(el => el._id !== id));
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    const booksList = () => {
        return books.map(curr => {
            return <Book book={curr} deleteBook={deleteBook} key={curr._id}/>
        });
    }

    return (
        <div>
            <h3>List of Books</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { booksList() }
                </tbody>
            </table>
        </div>
    );
}
