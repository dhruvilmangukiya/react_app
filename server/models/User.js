const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
