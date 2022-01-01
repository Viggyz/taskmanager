const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Tasks = require("../models/tasks");

const taskRouter = express.Router();

function sendResp(res, json) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(json);
}

taskRouter
  .route("/")
  .get((req, res, next) => {
    Tasks.find(req.query)
      .then(
        (tasks) => {
          sendResp(res, tasks);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Tasks.create(req.body)
      .then(
        (task) => {
          sendResp(res, task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported in /tasks");
  })
  .delete((req, res, next) => {
    Tasks.remove({})
      .then(
        (resp) => {
          sendResp(res, resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

taskRouter
  .route("/:taskid")
  .get((req, res, next) => {
    Tasks.findById(req.params.taskid)
      .then(
        (task) => {
          sendResp(res, task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported in /tasks/" + req.params.taskid);
  })
  .put((req, res, next) => {
    Tasks.findByIdAndUpdate(
      req.params.taskid,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (task) => {
          sendResp(res, task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Tasks.findByIdAndDelete(req.params.taskid)
      .then(
        (task) => sendResp(res, task),
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = taskRouter;
