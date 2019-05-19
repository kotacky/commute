var express = require("express");

var userRouter = express.Router();

const users = {
  users: [
    {
      id: 0,
      name: 'user0'
    },
    {
      id: 1,
      name: 'user1'
    }
  ]
};

userRouter.get('/', function(req, res, next) {
  res.json(users);
});

module.exports = userRouter;