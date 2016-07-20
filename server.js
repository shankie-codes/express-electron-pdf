'use strict';

const express = require('express');
const exec = require("child_process").exec;

// Constants
const PORT = (process.env.PORT || 8080);
const SECURITY_TOKEN = (process.env.TOKEN || 'yoursecrettoken');

const os = require("os");
const hostname = os.hostname();
const fs = require("fs");

// Accept SIGINT from Docker ctrl-c
process.on('SIGINT', function() {
    process.exit();
});

// App
const app = express();

app.get('/', function(req, res){
  if (req.query.token === SECURITY_TOKEN) {
    if(req.query.url){
      // Generate a unique filename. This could probably do with a bit more thought, but will work for now
      var tempFilename = `output-${Date.now()}.pdf`
      var tempFilePath = `/www/${tempFilename}`

      // exec(`Xvfb -ac -screen scrn 1280x2000x24 :9.0 & export DISPLAY=:9.0 && electron-pdf ${req.query.url} /www/output.pdf`, function(error, stdout, stderr) {
      exec(`xvfb-run -a electron-pdf ${req.query.url} ${tempFilePath}`, function(error, stdout, stderr) {
        res.download(tempFilePath, (req.query.filename || 'output') + '.pdf', function(){
          // Successfully downloaded. Delete the file
          fs.unlink(tempFilePath, (err) => {
            if (err) throw err;
            // console.log(`Successfully deleted ${tempFilePath}`);
          });
        });
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
console.log(`express-electron-pdf running on http://${hostname}:${PORT}`);
