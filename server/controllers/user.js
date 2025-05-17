const Boom = require("@hapi/boom");
const Bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const userService = require("../services/user");
const { MESSAGES, STATUS } = require("../utils/constant");

function deleteFile(image) {
  const imagePath = path.join(__dirname, "../public/userImages/");
  fs.unlinkSync(imagePath + image);
}

const createUserHandler = async (req, res) => {
  try {
    const data = req.body;
    data.image = req.file ? req.file.filename : "";

    const userObj = await userService.getOneUserByFilter({
      email: data.email,
    });

    if (userObj) {
      data.image ? deleteFile(data.image) : "";
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.EMAIL_ALREADY_EXIST).output.payload);
    }

    // Store hash password
    const hashPassword = await Bcrypt.hash(data.password, 10);
    data.password = hashPassword;

    const user = await userService.createUser(data);
    if (!user)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.FAILED_TO_CREATE).output.payload);

    return res.send({
      statusCode: 201,
      message: MESSAGES.CREATE_SUCCESSFULLY,
      data: user._id,
      fullData: user,
    });
  } catch (error) {
    req.file ? deleteFile(req.file.filename) : "";
    console.log("Error inside createUserHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

const getAllUserHandler = async (req, res) => {
  try {
    const filter = { ...req.query, status: STATUS.ACTIVE };

    // Add additional filter for subadmin role
    if (req.user.role === "subadmin") {
      filter.$or = [{ assignedTo: req.user.id }, { _id: req.user.id }];
    }

    const userList = await userService.getAllUser(filter);

    return res.send({
      statusCode: 200,
      message: MESSAGES.RECORD_FETCH_SUCCESSFULLY,
      data: {
        count: userList.length,
        records: userList,
      },
    });
  } catch (error) {
    console.log("Error inside getAllUserHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

const getOneUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    if (!user)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.RECORD_NOT_FOUND).output.payload);

    return res.send({
      statusCode: 200,
      message: MESSAGES.RECORD_FETCH_SUCCESSFULLY,
      data: user,
    });
  } catch (error) {
    console.log("Error inside getOneUserHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const userObj = await userService.getUserById(id);
    if (!userObj)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.RECORD_NOT_FOUND).output.payload);

    const user = await userService.updateUser(req.body, id);
    if (!user)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.FAILED_TO_UPDATE).output.payload);

    return res.send({
      statusCode: 200,
      message: MESSAGES.UPDATE_SUCCESSFULLY,
      data: user,
    });
  } catch (error) {
    console.log("Error inside updateUserHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const userObj = await userService.getUserById(id);
    if (!userObj)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.RECORD_NOT_FOUND).output.payload);

    const user = await userService.updateUser({ status: STATUS.INACTIVE }, id);
    if (!user)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.FAILED_TO_DELETE).output.payload);

    return res.send({
      statusCode: 200,
      message: MESSAGES.DELETE_SUCCESSFULLY,
      data: user._id,
    });
  } catch (error) {
    console.log("Error inside deleteUserHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

module.exports = {
  createUserHandler,
  getAllUserHandler,
  getOneUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
