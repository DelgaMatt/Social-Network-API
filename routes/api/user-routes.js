const router = require('express').Router();
const { getAllUsers } = require('../../controllers/userController.js');

//3001/api/users/
router.route('/').get(getAllUsers);

module.exports = router;