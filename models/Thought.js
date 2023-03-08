const {Schema, Types, model} = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, min: 1, max: 280 },
    createdAt: { type: Date, default: Date.now }, //getter method to format the timestamp on query
    username: { type: String, required: true },
    reactions: reactionSchema
});

const reactionSchema = new Schema({
    reactionId: {type: new Schema.Types.ObjectId, default: () => new Types.ObjectId }, 
    reactionBody: { type: String, required: true, min: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } //getter method to format the timestamp on query
})

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;