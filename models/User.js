const mongoose = require('mongoose');

//create schema//create model using schema//

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, unique: true, match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/},
    thoughts: {type: Schema.Types.ObjectId, ref: 'Thoughts' }, //{array of id referencing thought model};,
    friends: {type: Schema.Types.ObjectId, ref: 'User' } //see above
});

const User = mongoose.model('User', userSchema);

module.exports = User;