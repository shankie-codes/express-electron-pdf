'use strict';

const express = require('express');
const exec = require("child_process").exec;
// const electronPdf = require('./electron-pdf');

// Constants
const PORT = (process.env.PORT || 8080);
const SECURITY_TOKEN = 'SOSJkSkf8LJeIGdTuOzvwhfbKJOOr2';

// Accept SIGINT from Docker ctrl-c
process.on('SIGINT', function() {
    process.exit();
});

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.get('/pdf', function(req, res){
  if (req.query.token === SECURITY_TOKEN) {
    res.send('Generating... ');
    exec("Xvfb -ac -screen scrn 1280x2000x24 :9.0 & export DISPLAY=:9.0 && electron-pdf http://properdesign.rs/terms /www/terms2.pdf", function(error, stdout, stderr) {
      console.log('Done!', error, stdout, stderr);
    });
  }
  else{
    res.sendStatus(401);
  }
});


app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
// console.log(electronPdf);