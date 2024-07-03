import Author from "../../../database/models/author.model.js";

export const addAuthor = async (req, res) => {
  const { name, bio, birthDate, books } = req.body;
  const newAuthor = new Author({ name, bio, birthDate, books });

  try {
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllAuthors = async (req, res) => {
  const { page, limit, name, bio } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  try {
    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (bio) {
      query.bio = { $regex: bio, $options: "i" };
    }
    const authors = await Author.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "books",
        // to get title book only
        // select: "title ",
      });

    const totalAuthors = await Author.countDocuments(query);

    res.status(200).json({
      authors,
      totalPages: Math.ceil(totalAuthors / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.authorId).populate({
      path: "books",
      // to get title book only
      // select: "title ",
    });
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAuthorById = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.authorId,
      req.body,
      { new: true }
    ).populate("books");
    if (!updatedAuthor)
      return res.status(404).json({ message: "Author not found" });
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAuthorById = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.authorId);
    if (!deletedAuthor)
      return res.status(404).json({ message: "Author not found" });
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
