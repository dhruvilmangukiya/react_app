const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
