'use strict';

const express = require('express');
const exec = require("child_process").exec;

// Constants
const PORT = (process.env.PORT || 8080);
const SECURITY_TOKEN = (process.env.TOKEN || 'im-a-placholder-that-you-should-set-using-env-vars');

const os = require(“os”);
const hostname = os.hostname();

// Accept SIGINT from Docker ctrl-c
process.on('SIGINT', function() {
    process.exit();
});

// App
const app = express();

app.get('/', function(req, res){
  if (req.query.token === SECURITY_TOKEN) {
    if(req.query.url){
      // res.send('Generating... ');
      exec(`Xvfb -ac -screen scrn 1280x2000x24 :9.0 & export DISPLAY=:9.0 && electron-pdf ${req.query.url} /www/output.pdf`, function(error, stdout, stderr) {
        res.download('/www/output.pdf', (req.query.filename || 'output') + '.pdf');
      });
    }
    else{
      // Can't generate a PDF without a URL
      res.sendStatus(400);
    }
  }
  else{
    res.sendStatus(401);
  }
});

app.listen(PORT);
console.log(`express-electron-pdf running on ${hostname}:${PORT}`);
