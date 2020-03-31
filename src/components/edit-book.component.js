import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateBook extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: ``,
            author: ``,
            genre: ``
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    author: res.data.author,
                    genre: res.data.genre
                });
            })
            .catch(err => {
                console.log(err);
            });
    }


    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onChangeGenre(e) {
        this.setState({
            genre: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            genre: this.state.genre
        };

        console.log(book);

        axios.post('http://localhost:5000/update' + this.props.match.params.id, book)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    render() {
        return (
            <div>
                <h3>Update Book</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" required className="form-control" value={this.state.title} onChange={this.onChangeTitle}/>
                    </div>
                    <div className="form-group"> 
                        <label>Author: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.author}
                            onChange={this.onChangeAuthor}
                            />
                    </div>
                    <div className="form-group"> 
                        <label>Genre: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.genre}
                            onChange={this.onChangeGenre}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Book" className="btm btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}