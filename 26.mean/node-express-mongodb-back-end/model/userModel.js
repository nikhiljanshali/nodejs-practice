import mongoose from "mongoose";
import userSchema from "../schema/userSchema.js";

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
