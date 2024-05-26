import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };



  const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const findUserByName = (name, job) => {
  if (job != undefined) {
      return users["users_list"].filter(
        (user) => ((user["name"] === name) && (user["job"] === job))
      );
    } else {
      return users["users_list"].filter(
        (user) => user["name"] === name
      );
    }
};

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined) {
      let result = findUserByName(name, job);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = {id: Math.floor(Math.random()*1000).toString(), ...req.body};

    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const index = users["users_list"].findIndex(
      (user) => user.id === id
    );
    if (index > -1) {
      users["users_list"].splice(index, 1);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});