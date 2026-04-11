// import TodoModel from "../model/todoModel.js";
import {
  createTodo_Service,
  getAllTodos_Service,
  getTodoById_Service,
  updateTodo_Service,
  deleteTodo_Service,
  getAllTodosCount_Services,
  createMultipleTodos_Service,
} from "../services/todoServices.js";

const createTodo = async (req, res) => {
  try {
    const result = await createTodo_Service(req.user.id, req.body);
    res.json({
      message: "Todo created successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating todo",
      status: false,
      error: error.message,
    });
  }
};

const createMultipleTodos = async (req, res) => {
  try {
    const result = await createMultipleTodos_Service(req.user.id, req.body);
    res.json({
      message: "Todos created successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating todo",
      status: false,
      error: error.message,
    });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const result = await getAllTodos_Service(req.user.id);
    res.json({
      message: "Todos retrieved successfully......",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving todos",
      status: false,
      error: error.message,
    });
  }
};

const getAllTodosCount = async (req, res) => {
  try {
    const result = await getAllTodosCount_Services(req.user.id);
    res.json({
      message: "Todos retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving todos",
      status: false,
      error: error.message,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const result = await getTodoById_Service(req.params.id, req.user.id);
    if (result) {
      res.json({
        message: "Todo retrieved successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Todo not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving todo",
      status: false,
      error: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const result = await updateTodo_Service(req.params.id, req.user.id, req.body);
    if (result) {
      res.json({
        message: "Todo updated successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Todo not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating todo",
      status: false,
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const result = await deleteTodo_Service(req.params.id, req.user.id);
    if (result) {
      res.json({
        message: "Todo deleted successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Todo not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting todo",
      status: false,
      error: error.message,
    });
  }
};

export {
  createTodo,
  createMultipleTodos,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getAllTodosCount,
};
