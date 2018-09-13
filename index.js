// dependencies
const config = require('config');
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const coursesRouter = require('./routes/courses');
const pagesRouter = require('./routes/pages');

// debugging
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

// middleware
const app = express();
app.use(express.static('public'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/courses', coursesRouter);
app.use('/', pagesRouter);

// views
app.set('view engine', 'pug');
app.set('views', './views');

// config
console.log(`App name: ${config.get('name')}`);
console.log(`Mail host: ${config.get('mail.host')}`);
console.log(`Mail password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}
dbDebugger('db connected');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port:${PORT}`);
});

// app logic
