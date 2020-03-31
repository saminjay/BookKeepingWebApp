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

    componentDidMount() {
        axios.get('http://localhost:5000/')
            .then(res => {
                this.setState({books: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteBook(id) {
        axios.delete('http://localhost:5000/' + id)
            .then(res => console.log(res.data));

        this.setState({
            books: this.state.books.filter(el => el._id !== id)
        });
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