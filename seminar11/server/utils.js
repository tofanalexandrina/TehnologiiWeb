const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader?.split(' ')[1];

    if (!token) {
        return res.status(404).json({ success: false, message: "Token not found", data: {} });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Unauthorized - Invalid token", data: {} });
        }

        req.userId = decoded.id;

        next();
    })
}

module.exports = {
    verifyToken
}