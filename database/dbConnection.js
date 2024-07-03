import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect("mongodb://127.0.0.1:27017/ass8")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    "error in db ", err;
  });
