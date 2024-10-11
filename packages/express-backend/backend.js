import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(express.json());

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByJob = (job) => {
  return users["users_list"].filter((user) => user["job"] === job);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    if (job != undefined) {
      let result_final = result["users_list"].filter(
        (user) => user["job"] === job
      );
      result_final = { users_list: result_final };
      res.send(result_final);
    } else {
      res.send(result);
    }
  } else {
    if (job != undefined) {
      let result = findUserByJob(job);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const deleteUserById = (id) => {
  let result = findUserById(id);
  if (result != undefined) {
    let index = users["users_list"].indexOf(result);
    users["users_list"].splice(index, 1);
  }
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  deleteUserById(id);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
