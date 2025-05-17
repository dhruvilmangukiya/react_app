const Boom = require("@hapi/boom");
const productService = require("../services/product");
const { MESSAGES, STATUS } = require("../utils/constant");
const Product = require("../models/Product");

const createProductHandler = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    if (!product)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.FAILED_TO_CREATE).output.payload);

    return res.send({
      statusCode: 201,
      message: MESSAGES.CREATE_SUCCESSFULLY,
    });
  } catch (error) {
    console.log("Error inside createProductHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

const getAllProductHandler = async (req, res) => {
  try {
    const { category, limit = 10, skip = 0 } = req.query;
    console.log(skip);
    const filter = {};
    category ? (filter.category = category) : "";

    const { count, records } = await productService.getAllProduct(
      filter,
      parseInt(limit),
      parseInt(skip)
    );

    return res.send({
      statusCode: 200,
      message: MESSAGES.RECORD_FETCH_SUCCESSFULLY,
      data: {
        count,
        records,
      },
    });
  } catch (error) {
    console.log("Error inside getAllProductHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

const getCategoryWiseTotal = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $project: {
          _id: 0,
          categoryId: "$categoryInfo._id",
          categoryName: "$categoryInfo.name",
          totalAmount: 1,
        },
      },
    ]);

    res.status(200).json({
      statusCode: 200,
      message: "Category-wise total fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Aggregation Error:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const productObj = await productService.getProductById(id);
    if (!productObj)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.RECORD_NOT_FOUND).output.payload);

    const product = await productService.updateProduct(req.body, id);
    if (!product)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.FAILED_TO_UPDATE).output.payload);

    return res.send({
      statusCode: 200,
      message: MESSAGES.UPDATE_SUCCESSFULLY,
      data: product,
    });
  } catch (error) {
    console.log("Error inside updateProductHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const productObj = await productService.getProductById(id);
    if (!productObj)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.RECORD_NOT_FOUND).output.payload);

    const product = await productService.deleteProduct(id);

    if (!product)
      return res
        .status(422)
        .send(Boom.badData(MESSAGES.FAILED_TO_DELETE).output.payload);

    return res.send({
      statusCode: 200,
      message: MESSAGES.DELETE_SUCCESSFULLY,
      data: product._id,
    });
  } catch (error) {
    console.log("Error inside deleteProductHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

module.exports = {
  createProductHandler,
  getAllProductHandler,
  getCategoryWiseTotal,
  updateProductHandler,
  deleteProductHandler,
};
