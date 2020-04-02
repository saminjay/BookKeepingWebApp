import React, { Component } from 'react';
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
)

export default class BooksList extends Component {
    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);

        this.state = {books:[]};
    }

    async fetchData(url) {
        try {
            const res = await axios.get(url);
            this.setState({books: res.data});
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }

    componentDidMount() {
        this.fetchData('http://localhost:5000/');
    }

    async deleteBook(id) {
        try {
            const res = await axios.delete('http://localhost:5000/' + id)
            this.setState({
                books: this.state.books.filter(el => el._id !== id)
            });
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    booksList() {
        return this.state.books.map(curr => {
            return <Book book={curr} deleteBook={this.deleteBook} key={curr._id}/>
        })
    }

    render() {
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
                        { this.booksList() }
                    </tbody>
                </table>
            </div>
        );
    }
}