const { MongooseError } = require("mongoose");

exports.getErrorMesage = (err) => {
  let message = "";
  if (err instanceof MongooseError) {
    message = Object.values(err.errors).at(0).message;
  } else if (err instanceof Error) {
    message = err.message;
  }
  return message;
};
