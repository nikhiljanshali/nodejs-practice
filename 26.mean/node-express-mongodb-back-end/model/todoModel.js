import mongoose from "mongoose";
import todoSchema from "../schema/todoSchema.js";

const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;