const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    }

    //get single thought
    //create thought
    //update thought
    //delete thought

    
};