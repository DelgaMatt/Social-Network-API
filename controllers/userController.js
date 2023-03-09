const { User } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({_id: req.params._Id})
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
        .catch((err) => res.status(500).json(err))
    },

    //update user
    //delete user
    //look into .select() and .populate() methods
};