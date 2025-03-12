// jsonwebtoken
const jwt = require('jsonwebtoken');
const secretOrPrivateKey = "quachngochung";

const authenticate = (req, res, next) => {
    const token = req.header("token");
    try {
        const decode = jwt.verify(token, secretOrPrivateKey);
        if (decode) {
            req.user = decode; // gán decode để xử lý phân quyền
            return next();
        } else {
            res.status(401).send('You\'re not login');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    authenticate,
};
