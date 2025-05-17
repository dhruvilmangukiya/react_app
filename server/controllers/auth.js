const Boom = require("@hapi/boom");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/user");
const { MESSAGES, JWT_CONFIG } = require("../utils/constant");

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getOneUserByFilter({
      email,
    });

    if (!user)
      return res.send(Boom.badData(MESSAGES.RECORD_NOT_FOUND).output.payload);

    const isValid = await Bcrypt.compare(password, user.password);
    if (!isValid)
      return res.send(
        Boom.badData(MESSAGES.INVALID_CREDENTIALS).output.payload
      );

    delete user.password;

    // Generate token
    const token = jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      JWT_CONFIG.JWT_SECRET,
      { expiresIn: JWT_CONFIG.ACCESS_TOKEN_LIFE }
    );

    return res.send({
      statusCode: 200,
      message: MESSAGES.USER_LOGIN_SUCCESSFULLY,
      data: { user, token },
    });
  } catch (error) {
    console.log("Error inside loginHandler: ", error.message);
    return Boom.badImplementation(error.message);
  }
};

module.exports = {
  loginHandler,
};
