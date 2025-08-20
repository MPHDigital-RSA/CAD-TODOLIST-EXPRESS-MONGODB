const mongoose = require('mongoose');

// create the schematic
const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

// create a model from the todoSchema
const Todo = mongoose.model('Todo', todoSchema);

// export the todo model
module.exports = Todo;