const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/class-calendar'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/class-calendar/'});
});


app.listen(process.env.PORT || 8000);
