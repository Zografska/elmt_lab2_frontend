import axios from '../custom-axios/axios';

const EShopService = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchCategories: () => {
        return axios.get("/books/categories");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`)
    }
}

export default EShopService;
