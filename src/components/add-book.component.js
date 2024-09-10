import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function () {
    const url = 'http://localhost:5000/';
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');

    const fetchData = async (url) => {
        try{
            const res = await axios.get(url);

            setTitle(res.data.title);
            setAuthor(res.data.author);
            setGenre(res.data.genre);
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    useEffect(() => {
        if (id) {
            fetchData(url + id);
        }
    }, [id]); 

    const onChangeTitle = (e) => setTitle(e.target.value);

    const onChangeAuthor = (e) => setAuthor(e.target.value);

    const onChangeGenre = (e) => setGenre(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();

        const book = {
            title,
            author,
            genre,
        };

        try {
            if (id) {
                await axios.post('http://localhost:5000/update/', id, book);
            } else {
                await axios.post('http://localhost:5000/add', book);
            }
            window.location = '/';
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    return (
        <div>
            <h3>Add a Book</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={title}
                        onChange={onChangeTitle}
                    />
                </div>
                <div className="form-group"> 
                    <label>Author: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={author}
                        onChange={onChangeAuthor}
                    />
                </div>
                <div className="form-group"> 
                    <label>Genre: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={genre}
                        onChange={onChangeGenre}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value={id ? "Update Book" : "Add Book"}
                        className="btm btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
