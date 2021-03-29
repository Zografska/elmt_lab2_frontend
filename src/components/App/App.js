import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Books from "../Books/BookList/books";
import Categories from "../Categories/categories"
import Authors from "../Authors/authors"
import Header from "../Header/header"
import BookAdd from "../Books/BookAdd/bookAdd";
import "bootstrap/dist/css/bootstrap.min.css"
import EShopService from "../../repository/libraryRepository";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }

    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">

                        <Route path={"/categories"} exact render={() =>
                            <Categories categories={this.state.categories}/>}/>
                        <Route path={"/authors"} exact render={() =>
                            <Authors authors={this.state.authors}/>}/>
                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd categories={this.state.categories}
                                     authors={this.state.authors}
                                     onAddBook={this.addBook}/>}/>
                        <Route path={"/books"} exact render={() =>
                            <Books books={this.state.books} onDelete={this.deleteBook}/>}/>
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }


    loadBooks = () => {
        EShopService.fetchBooks()
            .then((data) =>{
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        EShopService.fetchCategories()
            .then((data) =>{
                this.setState({
                    categories: data.data
                })
            });
    }
    loadAuthors = () => {
        EShopService.fetchAuthors()
            .then((data) =>{
                this.setState({
                    authors: data.data
                })
            });
    }
    addBook = (name, category,authorId,availableCopies) => {
        EShopService.addBook(name,category,authorId,availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    deleteBook = (id) => {
        EShopService.deleteBook(id)
            .then(()=>{
                this.loadBooks()
            });
    }

    getBook = (id) => {
        EShopService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editProduct = (id,name,category,authorId,availableCopies) => {
        EShopService.editBook(id,name,category,authorId,availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }


    componentDidMount() {
        this.loadBooks()
        this.loadCategories()
        this.loadAuthors()
    }
}

export default App;
