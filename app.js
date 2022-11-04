const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('./public'));

require('./routes')(app);
require('./middlewares')(app);

module.exports = app;
