const productModel = require("../models/Product");

const selectedField = { __v: false };

const createProduct = async (product) => {
  try {
    const result = await productModel.create(product);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllProduct = async (filter, limit, skip) => {
  try {
    const result = await productModel
      .find(filter)
      .select(selectedField)
      .populate("category")
      .skip(skip)
      .limit(limit);
    const count = await productModel.countDocuments(filter);
    return { records: result, count };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductById = async (id, select = selectedField) => {
  try {
    const result = await productModel.findById(id, select);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (
  doc,
  id,
  options = { new: true, fields: selectedField }
) => {
  try {
    const result = await productModel.findByIdAndUpdate(id, doc, options);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const result = await productModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
};
