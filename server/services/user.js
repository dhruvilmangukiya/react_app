const userModel = require("../models/User");

const selectedField = { __v: false, password: false };

const createUser = async (user) => {
  try {
    const result = await userModel.create(user);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUser = async (filter) => {
  try {
    const result = await userModel.find(filter).select(selectedField);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id, select = selectedField) => {
  try {
    const result = await userModel.findById(id, select);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (
  doc,
  id,
  options = { new: true, fields: selectedField }
) => {
  try {
    const result = await userModel.findByIdAndUpdate(id, doc, options);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOneUserByFilter = async (query, select = { __v: false }) => {
  try {
    return userModel.findOne(query, select).lean();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    return userModel.findByIdAndRemove(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  getOneUserByFilter,
  deleteUser,
};
