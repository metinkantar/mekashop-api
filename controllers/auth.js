const User = require("../models/User");
const mekaHataYaniti = require("../utils/mekaHataYaniti");
const nodemailer = require("nodemailer");

exports.Kayit = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ islem: false, hata: error.message });
  }
};

exports.Giris = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return next(new mekaHataYaniti("Lütfen e-posta ve şifre girin."), 400);
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new mekaHataYaniti("Geçersiz giriş bilgileri", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new mekaHataYaniti("Geçersiz giriş bilgileri", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ islem: false, hata: error.message });
  }
};

exports.sifremiUnuttum = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(
        new mekaHataYaniti("E-posta sıfırlama isteği gönderilemedi!")
      );
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();
    const resetUrl = `http://localhost:5000/sifresifirlama/${resetToken}`;
    const message = `
      <h1>Şifre sıfırlama talebinde bulundunuz.</h1>
      <p>Şifrenizi sıfırlamak için lütfen bu bağlantıya gidin</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587 || 25,
        secure: false,
        requireTLC: true,
        auth: {
          user: "apikey",
          pass: "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",
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        to: user.email,
        from: "tahminworldapi@gmail.com",
        subject: "Şifre sıfırlama isteği",
        text: "Plaintext version of the message",
        html: message,
      });

      /*  await sendEmail({
        to: user.email,
        subject: "Şifre sıfırlama isteği",
        text: message,
      }); */
      res.status(200).json({
        islem: true,
        data: "E-posta gönderildi",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      return next(new mekaHataYaniti("E-posta gönderilemedi!"), 500);
    }
  } catch (error) {
    next(error);
  }
};

exports.sifreSifirla = (req, res) => {
  res.send("Reset Password Route");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ islem: true, token });
};
