const UserModel = require('../models/user')
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
exports.userSignUp = async (req, res, next) => {
    try {
        const user = new UserModel();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        await user.save();
        user.password = undefined;
        let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ success: 'true', token: token })
    } catch (error) {
        res.status(200).json(error);
    }
}

exports.signIn = async (req, res, next) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(403).json({ status: 'fail', message: 'user not found' })
        }
        const checkPassword = await user.comparePassword(req.body.password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ status: "fail", message: "email id or password is incorrect" });
        }
        user.password = undefined;
        let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ success: 'true', token: token })
    } catch (error) {
        res.status(200).json(error);
    }


}
exports.checkForAuthorization = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            res.status(403).json({ status: 'fail', message: 'Your not authorized....Please login' })
        }
        const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = decodedToken;
        req.user = currentUser;
        next();
    } catch (error) {
        res.status(403).json({ status: 'fail', message: 'Your not authorized....Please login' })
    }

}