const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token =  req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "Token tidak tersedia, akses ditolak"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Token berhasil di verifikasi : ", decoded);
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({message: 'Token telah kadaluarsa', expiredAt: error.expiredAt});
        }
        res.status(403).json({ message: 'Token tidak valid', "error": error.message });
    }
}

module.exports = {authenticate}