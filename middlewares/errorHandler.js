const ErrorWithStatus = require("../errors/ErrorWithStatus");

module.exports = app => {
  app.use((err, req, res, next) => {
    if(err instanceof ErrorWithStatus) return res.status(err.statusCode).json({ msg: err.message });
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
  });
};
