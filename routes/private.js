const router = require("express").Router();
const { getPrivateData } = require("../controllers/private");
const mekaProtect = require("../middlewares/auth");

router.route("/user").get(mekaProtect, getPrivateData);

module.exports = router;