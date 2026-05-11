// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);

//   res.status(500).json({
//     error: err.message || "Server Error"
//   });
// };

// module.exports = errorHandler;

const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err.message);

  // Handle invalid ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format"
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error"
  });
};

module.exports = errorHandler;