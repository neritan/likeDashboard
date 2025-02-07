var express = require('express');
var router = express.Router();

const { getLikesList , getLike, deleteLike, updateLike, createLike } = require('../services/likeService');

router.route('/v1/likes').get(getLikesList).post(createLike);
router.route('/v1/likes/:id').get(getLike).patch(updateLike).delete(deleteLike);

module.exports = router;