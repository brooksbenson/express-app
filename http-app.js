const http = require('http');

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello, World');
    res.end();
  } else if (req.url === '/api/numbers') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

app.listen(3000);
