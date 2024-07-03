import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import bookRoutes from "./src/modules/book/book.routes.js";
import authorRoutes from "./src/modules/author/author.routes.js";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
