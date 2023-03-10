const userModel = require('../models/userModel')
const jwt = require("jsonwebtoken");

module.exports = {
    authentication : (req, res, next) => {
        try {
            const token = req.headers["token"];
            if (!token) {
                return res.status(400).send({ status: false, message: "Token is missing" });
            }
            jwt.verify(token, "Secret-key", function (error, decoded) {
            if (error) {
                return res.status(401).send({ status: false, msg: "Authentication Failed" });
            } else {
                req.decodedToken = decoded;
                next();
            }
        });
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
        }
    },
    authorization : async (req, res, next) => {
        try {
            const {userId} = req.params
            if (!userId) {
                return res.status(400).send({ status: false, msg: "plz enter userId" });
            }
            const findUserType = await userModel.findOne({_id: userId, isDeleted: false})
            if (req.decodedToken.userId != userId || findUserType.userType != 'Moderators') {
                return res.status(403).send({ status: false, msg: "Unauthorized person" });
            }
            next()
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
        }
    },
    // moderatorAuthorization : async (req, res, next) => {
    //     try {
    //         const {userId} = req.params
    //         if (!userId) {
    //             return res.status(400).send({ status: false, msg: "plz enter userId" });
    //         }
    //         const findUserType = await userModel.findOne({_id: userId, isDeleted: false})
    //         if (findUserType.userType != 'Moderators') {
    //             return res.status(403).send({ status: false, msg: "you are not a moderator" });
    //         }
    //     } catch (error) {
    //         return res.status(500).send({ status: false, message: error.message });
    //     }
    // }
}