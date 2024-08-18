const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    completed: {type:Boolean, default:false }
});

const schema = mongoose.model('Task', taskSchema)
module.exports = schema;