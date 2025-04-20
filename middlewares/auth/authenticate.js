const jwt = require('jsonwebtoken');
const secretOrPrivateKey = process.env.JWT_SECRET_KEY;
const { User } = require('../../models/index'); // Import model User

const authenticate = async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).redirect('../../users/login-page'); // Chuyển hướng đến trang đăng nhập nếu không có token
    }
    try {
        const decode = jwt.verify(token, secretOrPrivateKey);
        if (decode && decode.id && decode.email) {
            // Kiểm tra người dùng trong cơ sở dữ liệu
            const user = await User.findOne({ where: { id: decode.id, email: decode.email } });
            if (!user) {
                return res.status(401).send({ message: "Invalid token. User not found." });
            }
            req.user = decode; // Gán thông tin người dùng từ token
            return next();
        } else {
            return res.status(401).send({ message: "Invalid token. Please log in again." });
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error('Token has expired:', error.message);
            return res.status(401).send({ message: "Token has expired. Please log in again." });
        } else if (error.name === 'JsonWebTokenError') {
            console.error('Invalid token:', error.message);
            return res.status(401).send({ message: "Invalid token. Please log in again." });
        } else {
            console.error('Token verification failed:', error.message);
            return res.status(500).send({ message: "Internal server error during token verification." });
        }
    }
}

module.exports = {
    authenticate,
};