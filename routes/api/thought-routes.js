const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController.js');

//3001/api/thoughts/
router.route('/').get(getThoughts).post(createThought);

//3001/api/thought/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;