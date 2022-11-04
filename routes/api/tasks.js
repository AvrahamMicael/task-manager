const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../../controllers/taskController');

module.exports = app => {
  const taskRouter = require('express').Router();

  taskRouter.route('/')
    .get(getAllTasks)
    .post(createTask);
  
  taskRouter.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask);

  app.use('/api/v1/tasks', taskRouter);
};
