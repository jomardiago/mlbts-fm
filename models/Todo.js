const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    todo: { type: String, required: true }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);