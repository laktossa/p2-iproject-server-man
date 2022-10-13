function errorHandlers(err, req, res, next) {
  let code;
  let msg;

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      code = 400;
      msg = err.errors.map((e) => e.message);
      break;

    case "JsonWebTokenError":
      code = 401;
      msg = "Invalid";
      break;

    case "Not Found":
      code = 404;
      msg = "Data Not Found";
      break;

    case "NOT FOUND":
      code = 404;
      msg = "Data Not Found";
      break;

    case "Not Filled":
      code = 400;
      msg = "Please Input Username/Email/Password";
      break;

    case "Invalid":
      code = 401;
      msg = "Wrong Email/Password";
      break;

    case "Login First":
      code = 401;
      msg = "Please Login First";
      break;

    case "Forbidden":
      code = 403;
      msg = "Access Denied";
      break;

    default:
      code = 500;
      msg = "Internal Server Error";
      break;
  }
  res.status(code).json({ msg });
}

module.exports = errorHandlers;
