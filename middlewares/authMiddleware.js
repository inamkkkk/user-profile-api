const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded._id).then(user => {
            req.user = user;
            next();
        }).catch(err => {
            res.status(400).json({ message: 'Invalid token.' });
        });

    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};