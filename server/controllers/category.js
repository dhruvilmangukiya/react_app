const Boom = require("@hapi/boom");
const categoryService = require("../services/category");
const { MESSAGES, STATUS } = require("../utils/constant");

const createCategoryHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryObj = await categoryService.getOneCategoryByFilter({
      name,
    });

    if (categoryObj) {
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.RECORD_ALREADY_EXIST).output.payload);
    }

    const category = await categoryService.createCategory(req.body);
    if (!category)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.FAILED_TO_CREATE).output.payload);

    return res.send({
      statusCode: 201,
      message: MESSAGES.CREATE_SUCCESSFULLY,
    });
  } catch (error) {
    console.log("Error inside createCategoryHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

const getAllCategoryHandler = async (req, res) => {
  try {
    const categoryList = await categoryService.getAllCategory();

    return res.send({
      statusCode: 200,
      message: MESSAGES.RECORD_FETCH_SUCCESSFULLY,
      data: {
        count: categoryList.length,
        records: categoryList,
      },
    });
  } catch (error) {
    console.log("Error inside getAllCategoryHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

module.exports = {
  createCategoryHandler,
  getAllCategoryHandler,
};
