const router = require('express').Router();
const { 
    getThoughts,
    getThoughtById,
    addThought,
    addReaction,
    updateThought,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

router
    .route('/:userId')
    .post(addThought);


router
    .route('/:thoughtId/reactions')
    .post(addReaction);


router
    .route('/:thoughtId/:reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;