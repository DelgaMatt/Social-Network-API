const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
        type: Date, default: Date.now,
        get: createdAt => new Date(createdAt).toLocaleDateString('en-gb',
            { year: 'numeric', month: 'long', day: 'numeric' })
    }
});

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: {
        type: Date, default: Date.now,
        get: createdAt => new Date(createdAt).toLocaleDateString('en-gb',
            { year: 'numeric', month: 'long', day: 'numeric' })
    },
    username: { type: String, required: true },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;