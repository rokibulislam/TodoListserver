const { TodoModel, validateTodo } = require('../models/todos');
const mongoose = require('mongoose')

const todoList = async ( req, res ) => {
    try {
        let todos = await TodoModel.find().sort({ order: -1 });    
        return res.send(todos)
    } catch(err) {
        res.status(400).send(err)
    }
}

const todoCreate = async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);
    
    let { title } = req.body;

    try { 
        let data = { title: title }
        let todo = TodoModel(data);
        await todo.save();
        res.send(todo);
    } catch(err) {
        return res.status(400).send(err);
    }
}

const todoUpdate = async (req, res) => {
    console.log(req.body)
    let id = req.params.id;
    let { title, completed } = req.body
    console.log(completed)
    console.log(id)
    try {
        let todo = await TodoModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, {
            $set: {
                title: title,
                completed: completed
            }
        }, { new: true } )
        console.log(todo)
        res.send(todo)
    } catch(err) {
        return res.status(401).send('The todo with given id was not found!');
    }
}

const todoDelete = async (req, res) => {
    let id   = req.params.id;
    try {
        let todo = await TodoModel.findOneAndDelete( { _id: id } )
        res.send(todo)
    } catch(err) {
        return res.status(401).send('todo with given id not found!')
    }
}

const todoRead = async ( req, res ) => {
    let id = req.params.id;
    try {
        let todo = await TodoModel.findOne({ _id: id });
        console.log(todo)
        return res.send(todo);
    } catch(err) {
        return res.status(401).send('todo with given id not found!')
    }
}

module.exports = { todoCreate, todoUpdate, todoDelete, todoList, todoRead }