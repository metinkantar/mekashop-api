const router = require("express").Router();
const auth  = require("../controllers/auth");

router.route("/giris").post(auth.Giris)
router.route("/kayit").post(auth.Kayit)

module.exports = router;