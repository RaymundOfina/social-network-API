const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');
const { route } = require('./user-routes');

// thoughts
router.route('/').get(getAllThoughts);

// userId
router.route('/:userId').post(addThought);

// thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)

// userId & thoughtId
router
    .route('/:userId/:thoughtId')
    .delete(removeThought);

// thoughtId & reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// reactions & reactionId 
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;