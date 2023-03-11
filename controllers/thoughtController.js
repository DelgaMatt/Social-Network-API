const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },
    //get single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.id})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({message: 'No thoughts found with that id!'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //create thought
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {thoughts: _id} },
                { new: true }
            );
        })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    //update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({message: 'No thought found with that id!'})
                : res.json(thought)
        )
        .catch((err) => res.json(err))
    },
    //delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then((thought) => 
            !thought
                ? res.status(404).json({message: 'No thought found with that id!'})
                : res.json(thought)
        )
        .then(() => res.json({message: 'Thought successfully deleted!'}))
    }
};