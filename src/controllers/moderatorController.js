const userModel = require('../models/userModel')
const imageModel = require('../models/imageModel')
const reactionModel = require('../models/commetModel')

module.exports = {
    blockUser : async (req, res) => {
        try {
            const {userId} = req.params
            await userModel.findOneAndUpdate({ _id: userId, isDeleted: false},{ isDeleted: true, deletedAt: new Date().toLocaleString() })
            return res.status(200).send({ status: false, msg: 'Data deleted successfully' })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message})
        }
    },

    deletePost : async (req, res) => {
        try {
            const {imageId} = req.params
            await imageModel.findOneAndUpdate({_id: imageId, isDeleted: false},{isDeleted: true, deletedAt: new Date().toLocaleString()})
            await reactionModel.updateMany({imageId: imageId, isDeleted: false},{isDeleted: true, deletedAt: new Date().toLocaleString()})
            return res.status(200).send({ status: false, msg: 'Image deleted successfully'})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }
}