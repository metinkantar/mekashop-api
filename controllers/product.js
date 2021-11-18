const Product = require("../models/Product");

exports.getProduct = async (req, res) => {
  const product = await Product.find();
  product && res.status(200).json(product);
};

// ÜRÜN EKLEME İŞLEMİ
exports.postProduct = async (req, res) => {
  const { title, desc, img, categories, size, color, price, inStock } =
    req.body;

  const newProduct = new Product({
    title,
    desc,
    img,
    categories,
    size,
    color,
    price,
    inStock,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ÜRÜN SİLME İŞLEMİ
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: "Ürün Silme İşlemi Başarılı"
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// TEK ÜRÜN GETİRME 
exports.getOneProduct = async (req, res) => {
 const { id } = req.params; 
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }

}
