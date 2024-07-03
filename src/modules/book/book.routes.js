import express from "express";
import {
  addBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "./book.controllers.js";
import { validateBook } from "./book.middlewares.js";

const bookRoutes = express.Router();

bookRoutes.route("/").post(validateBook, addBook).get(getAllBooks);

bookRoutes
  .route("/:bookId")
  .get(getBookById)
  .put(validateBook, updateBookById)
  .delete(deleteBookById);

export default bookRoutes;
