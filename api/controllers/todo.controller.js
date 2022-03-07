const { toDo } = require('../models/todo.model');

// Utils
const { filterObject } = require('../utils/filterObject');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await toDo.findAll({
      where: { status: 'active' }
    });

    res.status(200).json({
      status: 'succes',
      data: { todos }
    });
    
  } catch (error) {
    console.log(error);
  }
};

// Create todo 
exports.createTodo = async (req,res) => {
  try {

    const {content} = req.body 

    const newTodo = await toDo.create ({
      content
    })
    
    res.status(201).json({
      status: 'success',
      data: {
        newTodo
      }
    })

  } catch (err) {
    console.log(err)
  }
}


// Update todo by given id
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObject.apply(req.body, 'content');

    const todo = await toDo.findOne({
      where: { id, status: 'active' }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update todo, invalid ID'
      });
      return;
    }

    await todo.update({ ...data });

    res.status(204).json({
      status: 'succes'
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await toDo.findOne({
      where: { id, status: 'active' }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete todo, invalid ID'
      });
      return;
    }

    await todo.update({ status: 'deleted' });

    res.status(204).json({
      status: 'succes',
      message: 'To do deleted'
    });
  } catch (error) {
    console.log(error);
  }
};
