exports.MESSAGES = {
  INVALID_EMAIL: "Invalid email",
  INVALID_TOKEN: "Invalid token",
  INVALID_CREDENTIALS: "Invalid credentials",
  INVALID_ID: "Invalid id",
  INVALID_DATA: "Invalid data",
  FAILED_TO_CREATE: "Failed to create",
  FAILED_TO_UPDATE: "Failed to update",
  FAILED_TO_DELETE: "Failed to delete",
  CREATE_SUCCESSFULLY: "Create successfully",
  UPDATE_SUCCESSFULLY: "Update successfully",
  DELETE_SUCCESSFULLY: "Delete successfully",
  RECORD_FETCH_SUCCESSFULLY: "Record fetch successfully",
  RECORD_ALREADY_EXIST: "Record already exist",
  RECORD_NOT_FOUND: "Record not found",
  USER_LOGIN_SUCCESSFULLY: "User logged in successfully",
  SOMETHING_WENT_WRONG: "Something went wrong please try again",
  EMAIL_ALREADY_EXIST: "Email already exist",
  ACCESS_DENIED: "Access denied",
};

exports.JWT_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || "jwt-secret",
  ACCESS_TOKEN_LIFE: process.env.JWT_ACCESS_TOKEN_LIFE || "24h",
};
