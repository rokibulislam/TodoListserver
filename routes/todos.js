const express = require('express')
const router = express.Router();

const { todoCreate, todoUpdate, todoDelete, todoList, todoRead } = require('../controllers/todos')

router.get("/", todoList );

router.post("/", todoCreate );

router.get('/:id', todoRead );

router.put('/:id', todoUpdate );

router.delete('/:id', todoDelete);

module.exports = router;