import TodoModel from "../model/todoModel.js";

const createTodo_Service = async (data) => {
  const todo = new TodoModel({
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    date: data.date,
    tags: data.tags,
    completed: data.completed,
  });
  return await todo.save();
};

const createMultipleTodos_Service = async (todos) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    throw new Error("Invalid input: Expected array of todos");
  }

  const formattedTodos = todos.map((data) => ({
    title: data.title,
    description: data.description,
    status: data.status || "pending",
    priority: data.priority || "low",
    date: data.date || new Date(),
    tags: data.tags || [],
    completed: data.completed || false,
  }));

  return await TodoModel.insertMany(formattedTodos);
};

const getAllTodos_Service = async () => {
  return await TodoModel.find();
};

const getAllTodosCount_Services = async () => {
  const todos = await TodoModel.find();

  const counts = {
    total: todos.length,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  };

  todos.forEach((todo) => {
    switch (todo.status) {
      case "pending":
        counts.pending++;
        break;
      case "in-progress":
        counts.inProgress++;
        break;
      case "completed":
        counts.completed++;
        break;
      case "cancelled":
        counts.cancelled++;
        break;
    }
  });

  return counts;
};

const getTodoById_Service = async (id) => {
  return await TodoModel.findOne({ _id: id });
};

const updateTodo_Service = async (id, data) => {
  return await TodoModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

const deleteTodo_Service = async (id, userId) => {
  return await TodoModel.findOneAndDelete({ _id: id });
};

export {
  createTodo_Service,
  getAllTodos_Service,
  getTodoById_Service,
  updateTodo_Service,
  deleteTodo_Service,
  getAllTodosCount_Services,
  createMultipleTodos_Service,
};
