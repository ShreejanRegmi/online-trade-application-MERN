const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token || token == "{{auth-token}}")
            return res.status(401).json({ msg: "No token found" });
        const decodedData = jwt.verify(token, config.get('jwtKey'));
        const user = await User.findOne({ _id: decodedData.id, 'tokens.token': token });
        if (!user)
            res.status(401).json({ msg: "Provide valid credentials" });
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ msg: "Not authorized" });
    }
}

module.exports = authenticate;