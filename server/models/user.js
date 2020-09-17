import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
});

export default mongoose.model("User", UserSchema);
