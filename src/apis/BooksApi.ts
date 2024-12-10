import axios from "axios";
import { TBook } from "../component/BookManagement/BookManagement";

export const BooksApi = {
  getAllBooks: async (params: any = {}) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/books`, {
      params: params,
    });
    return response.data;
  },
  deleteBookBYId: async (id: string | number) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/books/${id}`);
  },
  addBook: async (book: TBook) => {
    const payload = {
      ...book,
      createAt: new Date().getTime(),
    };
    await axios.post(`${process.env.REACT_APP_API_URL}/books`, payload);
  },
  editBookById: async (editBook: Omit<TBook, "id">, id: string | number) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/books/${id}`, editBook);
  },
};
