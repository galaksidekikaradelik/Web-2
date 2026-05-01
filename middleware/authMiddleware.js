const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mySecretKey';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 1. Check if header exists
    if (!authHeader) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    // 2. Format: Bearer TOKEN
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            message: 'Invalid token format'
        });
    }

    const token = parts[1];

    try {
        // 3. Verify token
        const decoded = jwt.verify(token, SECRET_KEY);

        // 4. Save user info in request
        req.user = decoded;

        next(); // go to next middleware/controller
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

module.exports = authMiddleware;