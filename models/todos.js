const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const TodoModel = mongoose.model('todos', todoSchema)

todoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

todoSchema.set('toJSON', { virtuals: true, });


const validateTodo = (post) => {
    const todoSchema = Joi.object({
        title: Joi.string().required()
    });

    return todoSchema.validate(post);
}


module.exports = { TodoModel, validateTodo }