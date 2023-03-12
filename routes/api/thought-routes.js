const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

//3001/api/thoughts/
router.route('/').get(getThoughts);
//3001/api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
//3001/api/thoughts/:userID
router.route('/:userId').post(createThought);
//3001/api/thoughts/:id/reactions
router.route('/:id/reactions').post(addReaction);
//3001/api/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;