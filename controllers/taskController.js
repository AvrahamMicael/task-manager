const { isValidObjectId } = require("mongoose");
const ErrorWithStatus = require("../errors/ErrorWithStatus");
const Task = require("../models/Task");
const asyncWrapper = require("../utils/asyncWrapper");

module.exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  return res.json(tasks);
});
// try
// {
//   const tasks = await Task.find({});
//   return res.json(tasks);
// }
// catch(error)
// {
//   return res.status(500).json(error);
// }

module.exports.createTask = asyncWrapper(async ({ body }, res) => {
  const task = await Task.create(body);
  return res.status(201).json(task);
});
// try
// {
//   const task = await Task.create(body);
//   return res.status(201).json(task);
// }
// catch(error)
// {
//   return res.status(500).json(error);
// }

module.exports.getTask = asyncWrapper(async ({ params: { id } }, res, next) => {
  if(!isValidObjectId(id)) throw 'Id is not valid';
  const task = await Task.findById(id);
  if(!task) return next(new ErrorWithStatus('Not found', 404));
  return res.json(task);
});
// try
// {
//   if(!isValidObjectId(id)) throw 'Id is not valid';
//   const task = await Task.findById(id);
//   if(!task) return res.status(404).json({ msg: `No task with id: ${id}` });
//   return res.json(task);
// }
// catch(error)
// {
//   return res.status(500).json({ msg: error });
// }

module.exports.updateTask = asyncWrapper(async ({ params: { id }, body }, res) => {
  if(!isValidObjectId(id)) throw 'Id is not valid';
  const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if(!task) return res.status(404).json({ msg: `No task with id: ${id}` });
  return res.status(200).json(task);
});
// try
// {
//   if(!isValidObjectId(id)) throw 'Id is not valid';
//   const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true });
//   if(!task) return res.status(404).json({ msg: `No task with id: ${id}` });
//   return res.status(200).json(task);
// }
// catch(error)
// {
//   return res.status(500).json({ msg: error });
// }

module.exports.deleteTask = asyncWrapper(async ({ params: { id } }, res) => {
  if(!isValidObjectId(id)) throw 'Id is not valid';
  const task = await Task.findByIdAndDelete(id);
  if(!task) return res.status(404).json({ msg: `No task with id: ${id}` });
  return res.status(204).send();
});
// try
// {
//   if(!isValidObjectId(id)) throw 'Id is not valid';
//   const task = await Task.findByIdAndDelete(id);
//   if(!task) return res.status(404).json({ msg: `No task with id: ${id}` });
//   return res.status(204).send();
// }
// catch(error)
// {
//   return res.status(500).json({ msg: error });
// }
