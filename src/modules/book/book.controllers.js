import { Book } from "../../../database/models/book.model.js";

export const addBook = async (req, res) => {
  // way1
  const { title, content, author, publishedDate } = req.body;
  const newBook = new Book({ title, content, author, publishedDate });
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  //   way2
  // let book = await Book.insertMany(req.body);
  // res.json({ message: "success", book });
};

export const getAllBooks = async (req, res) => {
  const { page, limit, title, author } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  try {
    let query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    const books = await Book.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalBooks = await Book.countDocuments(query);

    res.status(200).json({
      books,
      totalPages: Math.ceil(totalBooks / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBookById = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedBook)
      return res.status(404).json({ message: "book not found" });

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
    if (!deletedBook)
      return res.status(404).json({ message: "book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
