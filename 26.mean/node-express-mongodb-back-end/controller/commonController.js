import {
  getAllCommonCounter_Service,
  createAndBook_Service,
} from "../services/commonServices.js";

export const getAllCommonCounter = async (req, res) => {
  try {
    const result = await getAllCommonCounter_Service();
    console.log(result);
    res.json({
      message: "All counter retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving counter",
      status: false,
      error: error.message,
    });
  }
};

export const createAndBook = async (req, res) => {
  try {
    const result = await createAndBook_Service(req.body);
    res.json({
      message: "All counter retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving counter",
      status: false,
      error: error.message,
    });
  }
};
