const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-token'];

    if (!token) return res.status(401).json({ msg: 'No token provided' });

    jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
        if (err) return res.status(401).json({ msg: 'Unauthorized' });
        req.userId = decoded.payload.id;
        req.email = decoded.payload.email;
        req.role = decoded.payload.role;
        next();
    });
}