import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  checked: Boolean,
  title: String,
  description: String,
});

const TodoModel = mongoose.model("Todo", TodoSchema);

export default TodoModel;
