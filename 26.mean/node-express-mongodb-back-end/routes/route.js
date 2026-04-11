import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  createMultipleTodos,
  getAllTodosCount
} from "../controller/todoController.js";

const todoRouter = express.Router();

todoRouter.post("/create", authMiddleware, (req, res) => {
  createTodo(req, res);
});

todoRouter.post("/createMultiple", authMiddleware, (req, res) => {
  createMultipleTodos(req, res);
});

todoRouter.post("/update/:id", authMiddleware, (req, res) => {
  updateTodo(req, res);
});

todoRouter.delete("/delete/:id", authMiddleware, (req, res) => {
  deleteTodo(req, res);
});

todoRouter.get("/read/:id", authMiddleware, (req, res) => {
  getTodoById(req, res);
});

todoRouter.get("/read", authMiddleware, (req, res) => {
  getAllTodos(req, res);
});

todoRouter.get("/counter", authMiddleware, (req, res) => {
  getAllTodosCount(req, res);
});

export default todoRouter;
