const router = require("express").Router();
const mekaProtect = require("../middlewares/auth");
const product = require("../controllers/product");

router.route("/").get(product.getProduct);
router.route("/find/:id").get(product.getOneProduct);
router.route("/").post(product.postProduct);
router.route("/:id").delete(product.deleteProduct);

module.exports = router;
