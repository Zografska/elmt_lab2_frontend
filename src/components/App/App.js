import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Books from "../Books/BookList/books";
import Categories from "../Categories/categories"
import Header from "../Header/header"
import "bootstrap/dist/css/bootstrap.min.css"
import EShopService from "../../repository/libraryRepository";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: []
        }

    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Route path={"/books"} exact render={() =>
                            <Books books={this.state.books} onDelete={this.deleteBook}/>}/>
                        <Route path={"/categories"} exact render={() =>
                            <Categories categories={this.state.categories}/>}/>
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

    deleteBook = (id) => {
        EShopService.deleteBook(id)
            .then(()=>{
                this.loadBooks()
            });
    }

    componentDidMount() {
        this.loadBooks()
        this.loadCategories()
    }
}

export default App;
