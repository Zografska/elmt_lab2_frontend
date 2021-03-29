import axios from '../custom-axios/axios';

const EShopService = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchCategories: () => {
        return axios.get("/books/categories");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (name,category,authorId,availableCopies) => {
        return axios.post("/books/add", {
            "name" : name,
            "category" : category,
            "authorId" : authorId,
            "availableCopies" : availableCopies
        });
    },
    editBook: (id,name,category,authorId,availableCopies) => {
        return axios.put(`/books/edit/${id}`,
            {
                "name" : name,
                "category" : category,
                "authorId" : authorId,
                "availableCopies" : availableCopies
            });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    }

}

export default EShopService;
