exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        islem: true,
        data: "Bu rotadaki özel verilere erişim yetkiniz var. Akıllıca takıl."
    });
};