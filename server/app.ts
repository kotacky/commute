// import * as express from 'express';
// import * as path from 'path';
// import { json, urlencoded } from 'body-parser';
// import * as compression from 'compression';

// import { userRouter } from './routes/users';

var express = require("express");
var path = require("path");
var { json, urlencoded } = require("body-parser");
var compression = require("compression");
var userRouter = require("./routes/users");
var getEmailAddress = require("./models/getEmailAddress");

var app = express();
app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports =  app;