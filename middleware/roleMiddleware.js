const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const roles = Array.isArray(allowedRoles)
            ? allowedRoles
            : [allowedRoles];

        // 1. Check if user exists (from authMiddleware)
        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        // 2. Check role
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        next();
    };
};

module.exports = roleMiddleware;