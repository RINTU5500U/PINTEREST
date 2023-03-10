const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    like: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    likedAt: {
        type: String,
        default: null
    },
    disLikedAt: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Like', likeSchema)