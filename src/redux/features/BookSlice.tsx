import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TBook } from "../../component/BookManagement/BookManagement";
import { BooksApi } from "../../apis/BooksApi";

type BookState = {
  data: TBook[];
  loading: boolean;
};

const initialState: BookState = {
  data: [],
  loading: false,
};

export const fetchBooks = createAsyncThunk("books/fetch", async () => {
  return await BooksApi.getAllBooks();
});

export const addBook = createAsyncThunk("books/add", async (book: TBook) => {
  await BooksApi.addBook(book);
  return book;
});

export const editBook = createAsyncThunk(
  "books/edit",
  async ({
    id,
    updatedBook,
  }: {
    id: string;
    updatedBook: Omit<TBook, "id">;
  }) => {
    await BooksApi.editBookById(updatedBook, id);
    return { id, updatedBook };
  }
);

export const deleteBook = createAsyncThunk(
  "books/delete",
  async (id: string) => {
    await BooksApi.deleteBookBYId(id);
    return id;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<TBook[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(addBook.fulfilled, (state, action: PayloadAction<TBook>) => {
        state.data.unshift(action.payload);
      })
      .addCase(
        editBook.fulfilled,
        (
          state,
          action: PayloadAction<{
            id: string;
            updatedBook: Omit<TBook, "id">;
          }>
        ) => {
          const index = state.data.findIndex((b) => b.id === action.payload.id);
          if (index !== -1) {
            state.data[index] = {
              ...state.data[index],
              ...action.payload.updatedBook,
            };
          }
        }
      )
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((book) => book.id !== action.payload);
      });
  },
});

export default bookSlice.reducer;
