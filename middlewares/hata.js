const mekaHataYaniti = require("../utils/mekaHataYaniti");

const mekaErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.code === 11000) {
    const message = `Yinelenen Alan Değeri Girin`;
    error = new mekaHataYaniti(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new mekaHataYaniti(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Bağlantı Hatası",
  });
};

module.exports = mekaErrorHandler;
