const mongoose = require("mongoose");
const DB_BAGLANTI = "mongodb+srv://root:root47tahmin@cluster0.xruvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbBaglanti = async () => {
  await mongoose
    .connect(DB_BAGLANTI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Bağlantısı Başarılı...");
    })
    .catch((hata) => console.log("Mongodb bağlantısı başarısız... Hata sebebi : ", hata));
};

module.exports = dbBaglanti;
