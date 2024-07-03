import mongoose from "mongoose";
const { Schema } = mongoose;

const authorSchema = new Schema({
  name: { type: String, required: true },
  bio: String,
  birthDate: Date,
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const Author = mongoose.model("Author", authorSchema);

export default Author;