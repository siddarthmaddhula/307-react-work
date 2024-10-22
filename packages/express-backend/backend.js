import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose.connect(MONGO_CONNECTION_STRING).catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userService
    .getUsers(name, job)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => res.status(500).send(error.name));
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService
    .findUserById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => res.status(500).send(error.name));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService
    .addUser(userToAdd)
    .then((result) => res.status(201).send(req.body));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService
    .deleteUserById(id)
    .then((result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => res.status(500).send(error.name));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
