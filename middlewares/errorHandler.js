const ErrorWithStatus = require("../errors/ErrorWithStatus");

module.exports = app => {
  app.use((err, req, res, next) => err instanceof ErrorWithStatus
    ? res.status(err.statusCode).json({ msg: err.message })
    : res.status(500).json({ msg: 'Something went wrong, please try again' })
  );
};
