const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController.js');

//3001/api/thoughts/
router.route('/').get(getThoughts);
//3001/api/thought/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:userId').post(createThought);


module.exports = router;