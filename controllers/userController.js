const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({_id: req.params.id})
        .populate({path:'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((user) =>
            !user
                ? res.status(404).json({message: 'No user found with that id!'})
                : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
  
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then((user) =>
            !user
                ? res.status(404).json({message: 'No user found with that id!'})
                : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
        .then((user) => 
            !user
                ? res.status(404).json({message: 'No user found with that id!'})
                : Thought.deleteMany({_id: { $in: user.thoughts}})
            )
        .then(() => res.json({message: 'User and associated thoughts deleted!'}))
        .catch((err) => res.json(err));
    },
    // <-------- FRIEND CONTROLLERS -------->
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: {friends: req.params.friendId} },
            { new: true }
            )
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((user) =>
            !user
                ? res.status(404).json({message: 'No user found with that id!'})
                : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: {friends: req.params.friendId} },
            { new: true }
            )
        .then((user) => 
            !user
                ? res.status(404).json({message: 'No user found with that id!'})
                : res.json({message: 'User successfully removed from friends list!'})
        )
        .catch((err) => res.status(500).json(err));
    }

};