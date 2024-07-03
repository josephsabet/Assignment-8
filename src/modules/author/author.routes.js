import express from "express";
import {
  addAuthor,
  deleteAuthorById,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
} from "./author.controllers.js";
import { validateAuthor } from "./author.middlewares.js";

const authorRoutes = express.Router();

authorRoutes.route("/").post(validateAuthor, addAuthor).get(getAllAuthors);

authorRoutes
  .route("/:authorId")
  .get(getAuthorById)
  .put(validateAuthor, updateAuthorById)
  .delete(deleteAuthorById);

export default authorRoutes;
