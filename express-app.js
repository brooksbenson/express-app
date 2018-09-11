const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port:${PORT}`);
});

const courses = [
  { id: 1, name: 'React' },
  { id: 2, name: 'Node' },
  { id: 3, name: 'JavaScript' }
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/posts/:year/:month', (req, res) => {
  const { year, month } = req.params;
  res.send({
    year,
    month
  });
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const id = ~~req.params.id;
  const course = courses.find(c => c.id === id);
  course
    ? res.status(200).send(course)
    : res.status(404).send(`Course with id ${id} not found`);
});

app.post('/api/courses', (req, res) => {
  const validation = Joi.validate(req.body, {
    name: Joi.string()
      .min(3)
      .required()
  })
    .then(value => {
      const course = {
        id: courses.length + 1,
        name: req.body.name
      };
      courses.push(course);
      res.status(200).send(course);
    })
    .catch(e => {
      const { message } = e.details[0];
      res.status(400).send(message);
    });
});
