const mongoose = require("mongoose");

const dbBaglanti = async () => {
  await mongoose
    .connect(process.env.DB_BAGLANTI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Bağlantısı Başarılı...");
    })
    .catch((hata) => console.log("Mongodb bağlantısı başarısız... Hata sebebi : ", hata));
};

module.exports = dbBaglanti;
