const mongoose = require('mongoose');

const thoughtSchema = mongoose.Schema({
    thoughtText: { type: String, required: true, min: 1, max: 280 },
    createdAt: { type: Date, default: Date.now }, //getter method to format the timestamp on query
    username: { type: String, required: true },
    reactions: reactionSchema
});

const reactionSchema = mongoose.Schema({
    reactionId: {type: new mongoose.Schema.Types.ObjectId, default: new ObjectId }, //?//
    reactionBody: { type: String, required: true, min: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } //getter method to format the timestamp on query
})

const Thoughts = mongoose.model('Thoughts', thoughtSchema);

module.exports = Thoughts;