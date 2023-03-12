const router = require('express').Router();
const { 
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
    } = require('../../controllers/userController.js');

//3001/api/users/
router.route('/').get(getAllUsers).post(createUser);

//3001/api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

//3001/api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;