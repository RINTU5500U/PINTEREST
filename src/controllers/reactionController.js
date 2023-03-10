const commetModel = require('../models/commetModel')
const likeModel = require('../models/likeModel')
module.exports = {
    postCommet : async (req, res) => {
        try {
            const {userId, imageId} = req.params
            const {commet} = req.body
            const saveData = await commetModel.create({userId: userId, imageId: imageId, commet: commet, like: like})
            return res.status(201).send({status: true, Commet: saveData})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    updateCommet : async (req, res) => {
        try {
            const {userId, commetId} = req.params
            req.body['updatedAt'] = new Date().toLocaleString()
            const saveData = await commetModel.findOneAndUpdate({ userId: userId, _id: commetId }, req.body ,{ new: true})
            if (!saveData) {
                return res.status(404).send({status: false, Data: 'Data not found'})                
            }
            return res.status(200).send({status: true, msg: 'Data updated successfully', Commet: saveData})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    deleteCommet : async (req, res) => {
        try {
            const {commetId} = req.params
            await commetModel.findOneAndUpdate({_id: commetId, isDeleted: false},{isDeleted: true, deletedAt: new Date().toLocaleString()})
            return res.status(200).send({ status: true, msg: 'commet deleted successfully'})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    hitLike : async (req, res) => {
        try {
            const {userId, imageId} = req.params
            await likeModel.findOneAndUpdate({userId: userId, imageId: imageId, isDeleted: false}, {like: true, likedAt: new Date().toLocaleString()}, {upsert: true})
            return res.status(200).send({ status: true, msg: '👍🏻👍🏻👍🏻👍🏻'})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    hitDislike : async (req, res) => {
        try {
            const {userId, imageId} = req.params
            await likeModel.findOneAndUpdate({userId: userId, imageId: imageId, isDeleted: false, like: true}, {like: false, disLikedAt: new Date().toLocaleString()})
            return res.status(200).send({ status: true, msg: '👎👎👎👎'})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }
}