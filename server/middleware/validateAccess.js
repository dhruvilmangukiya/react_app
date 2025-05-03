const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const { MESSAGES, JWT_CONFIG } = require("../utils/constant");

const validateAccess = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send(Boom.unauthorized(MESSAGES.INVALID_TOKEN).output.payload);

    const data = jwt.verify(token, JWT_CONFIG.JWT_SECRET);
    req.user = data?.user;

    const userRole = data?.user?.role;
    if (!userRole || !["admin"].includes(userRole))
      return res
        .status(403)
        .send(Boom.forbidden(MESSAGES.ACCESS_DENIED).output.payload);

    next();
  } catch (error) {
    console.log("Error inside authenticate: ", error.message);
    return Boom.unauthorized();
  }
};

module.exports = validateAccess;
