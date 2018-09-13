const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express App',
    message: 'Hello, World'
  });
});

module.exports = router;
