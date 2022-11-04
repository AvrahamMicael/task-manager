const { disconnect, isValidObjectId } = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const connect = require('../../db/connect');

beforeAll(async () => await connect(true));
afterAll(async () => await disconnect());

const basePath = '/api/v1/tasks';
const pathWithId = id => `${basePath}/${id}`;

const newTasks = [
  { name: 'foo' },
  { name: 'bar' },
  { name: 'smt' },
  { name: 'Morbi imperdiet eleifend massa, eget vulputate urna dignissim eu.' },
];

const updatedData = [
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Nullam in egestas elit. Suspendisse potenti. Curabitur venenatis' },
  { name: 'volutpat mi ac', completed: true },
  { name: 'Mauris cursus tempor sagittis.', completed: true },
];

describe('Test taskController functions', () => {
  describe('CreateTask function', () => {
    test.each(newTasks)('Check data received', newTask =>
      request(app)
        .post(basePath)
        .send(newTask)
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(201);
          expect(body.name).toBe(newTask.name);
          expect(body.completed).toBe(false);
          expect(isValidObjectId(body._id)).toBe(true);
          newTask._id = body._id;
          newTask.completed = body.completed;
        })
    );

    test('Empty task error', () => 
      request(app)
        .post(basePath)
        .send({ name: '' })
        .then(({ statusCode }) => {
          expect(statusCode).toBe(500);
        })
    );
  });

  describe('GetAllTasks function', () => {
    test('Check created newTasks', () =>
      request(app)
        .get(basePath)
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(200);
          body.forEach(bodyTask => expect(bodyTask).toMatchObject(newTasks.find(({ _id }) => _id == bodyTask._id)));
        })
    );
  });

  describe('UpdateTask function', () => {
    test.each(newTasks)('Update NewTasks', newTask => {
      const updatedTaskData = updatedData[newTasks.indexOf(newTask)];
      return request(app)
        .patch(pathWithId(newTask._id))
        .send(updatedTaskData)
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(200);
          expect(body).toMatchObject(updatedTaskData);
          newTask.name = body.name;
          newTask.completed = body.completed;
        });
    });

    test('Empty task error', () => {
      const { _id } = newTasks[0];
      return request(app)
        .patch(pathWithId(_id))
        .send({ name: '' })
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(500);
          expect(body).toHaveProperty('msg');
        });
    });
  });

  
  describe('getTask function', () => {
    test.each(newTasks)('Match Tasks', ({ _id, name, completed }) => 
      request(app)
        .get(pathWithId(_id))
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(200);
          expect(body._id).toBe(_id);
          expect(body.name).toBe(name);
          expect(body.completed).toBe(completed);
        })
    );
  });
  

  describe('deleteTask function', () => {
    test.each(newTasks)('Delete created newTasks', ({ _id }) =>
      request(app)
        .delete(pathWithId(_id))
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(204);
          expect(body).toEqual({});
        })
    );
  });
});
