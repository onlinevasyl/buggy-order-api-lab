const jwt = require('jsonwebtoken');

const auth = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        const bearerToken = typeof authHeader === 'string'
            ? authHeader.match(/^Bearer\s+(\S+)$/i)
            : null;

        if (!bearerToken) {
            res.set('WWW-Authenticate', 'Bearer');
            return res.status(401).json({ message: 'Bearer token required' });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT_SECRET is not configured');
            return res.status(500).json({ message: 'Authentication is not configured' });
        }

        try {
            const payload = jwt.verify(bearerToken[1], secret, {
                algorithms: ['HS256']
            });

            if (!payload || typeof payload !== 'object') {
                res.set('WWW-Authenticate', 'Bearer error="invalid_token"');
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = payload;
            return next();
        } catch {
            res.set('WWW-Authenticate', 'Bearer error="invalid_token"');
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
};

module.exports = auth;
