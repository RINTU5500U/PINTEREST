const express = require("express");
const router = express.Router();

const { createUser, login, updateUser, deleteUser } = require('../controllers/userController')
const { postImage, downloadImage, searchImage, deleteImage } = require('../controllers/imageController')
const { postCommet, updateCommet, deleteCommet , hitLike, hitDislike} = require('../controllers/reactionController')
const { blockUser, deletePost } = require('../controllers/moderatorController')
const { authentication, authorization } = require('../middlewares/auth')
const { userValidation, updateUserValidation, loginValidation } = require('../middlewares/validator')

router.post('/createUser', userValidation, createUser)
router.post('/login', loginValidation, login)
router.put('/updateUser/:userId', authentication, authorization, updateUserValidation, updateUser)
router.delete('/deleteUser/:userId', authentication, authorization, deleteUser)

router.post('/postImage/:userId', authentication, postImage)
router.get('/user/:userId/searchImage/:imageId', searchImage)
router.get('/user/:userId/downloadImage/:imageId', authentication, downloadImage)
router.delete('/user/:userId/deleteImage/:imageId', authentication, authorization, deleteImage)

router.post('/user/:userId/postCommet/:imageId', authentication, authorization, postCommet)
router.put('/user/:userId/updateCommet/:commetId', authentication, authorization, updateCommet)
router.delete('/user/:userId/deleteCommet/:commetId', authentication, authorization, deleteCommet)
router.put('/user/:userId/hitLike/:imageId', authentication, authorization, hitLike)
router.put('/user/:userId/hitLike/:imageId', authentication, authorization, hitDislike)

router.delete('/user/:userId/blockUser', authentication, moderatorAuthorization, blockUser)
router.delete('/user/:userId/deletePost', authentication, moderatorAuthorization, deletePost)

router.all("/*", (req, res) => {
  return res.status(400).send({ status: false, msg: "end point is not valid" });
});

module.exports = router;