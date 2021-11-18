require("dotenv").config({ path: "config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mekaErrorHandler = require("./middlewares/hata");
const app = express();

//MongoDB Bağlantısı
const dbBaglanti = require("./config/db");
dbBaglanti();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



// Auth Route Middleware
app.use('/api/auth', require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/product", require("./routes/product"));



app.get("/", (req, res) => {
  res.status(200).json({
    islem: true,
    data: "MeKaShop Restful Api",
  });
});


//Error Handler
app.use(mekaErrorHandler);


const PORT = process.env.PORT || 5000;
const server = app.listen(5000, () => {
  console.log(`5000 numaralı port adresinden gelen istekler dinleniliyor...`);
});


process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
})