import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.String,
    ref: "Author",
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

export const Book = mongoose.model("Book", bookSchema);
