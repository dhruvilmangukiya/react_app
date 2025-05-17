const categoryModel = require("../models/Category");

const selectedField = { __v: false };

const createCategory = async (category) => {
  try {
    const result = await categoryModel.create(category);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCategory = async () => {
  try {
    const result = await categoryModel.find().select(selectedField);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOneCategoryByFilter = async (query, select = { __v: false }) => {
  try {
    return categoryModel.findOne(query, select).lean();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getOneCategoryByFilter,
};
