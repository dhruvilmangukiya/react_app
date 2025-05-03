const { MESSAGES } = require("../utils/constant");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const validationErrors = error.details.reduce((acc, detail) => {
        const field = detail.path.join(".");
        acc[field] = detail.message;
        return acc;
      }, {});

      return res.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: MESSAGES.INVALID_DATA,
        validationErrors,
      });
    }

    next();
  };
};

module.exports = validateRequest;
