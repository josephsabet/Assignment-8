export const validateBook = (req, res, next) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "Title, content, and author are required." });
  }

  next();
};
