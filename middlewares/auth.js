const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mekaHataYaniti = require("../utils/mekaHataYaniti");

const mekaProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next( new mekaHataYaniti("Bu rotaya erişim yetkiniz yok!", 401));
  }

  try {
    const JWT_SECRET = "dbdc78b927c1d410e0b9c22d48493c674900170bc67f902290d61ff4dcd0b5a0c8b232";
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return next( new mekaHataYaniti("Bu ID'ye sahip kullanıcı bulunamadı!", 401));
    }
    req.user = user;
    next();
  } catch (error) {
    return next( new mekaHataYaniti("Bu rotaya erişim yetkiniz yok", 401));
  }
};

module.exports = mekaProtect;