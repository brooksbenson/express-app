const express = require('express');
const Joi = require('joi');

const router = express.Router();

const courses = [
  { id: 1, name: 'React' },
  { id: 2, name: 'Node' },
  { id: 3, name: 'JavaScript' }
];

function validateCourse(course) {
  return Joi.validate(course, {
    name: Joi.string()
      .min(3)
      .required()
  });
}

function findCourse(id) {
  id = ~~id;
  return new Promise((res, rej) => {
    courses.forEach((c, i) => {
      if (c.id === id) {
        res({
          index: i,
          course: c
        });
      }
    });
    rej(`Course with id ${id} not found`);
  });
}

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  findCourse(req.params.id)
    .then(({ course }) => {
      res.status(200).send(course);
    })
    .catch(e => {
      res.status(404).send(e);
    });
});

router.post('/', (req, res) => {
  validateCourse(req.body)
    .then(({ name }) => {
      const course = {
        id: courses.length + 1,
        name: name
      };
      courses.push(course);
      res.status(200).send(course);
    })
    .catch(e => {
      const { message } = e.details[0];
      res.status(400).send(message);
    });
});

router.put('/:id', (req, res) => {
  validateCourse(req.body)
    .then(({ name: update }) => {
      findCourse(req.params.id)
        .then(({ course }) => {
          course.name = update;
          res.status(200).send(course);
        })
        .catch(e => {
          res.status(404).send(e);
        });
    })
    .catch(e => {
      const { message } = e.details[0];
      res.status(400).send(message);
    });
});

router.delete('/:id', (req, res) => {
  findCourse(req.params.id)
    .then(({ index }) => {
      const course = courses.splice(index, 1);
      res.status(200).send(course);
    })
    .catch(e => {
      res.status(404).send(e);
    });
});

module.exports = router;
