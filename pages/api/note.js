import fs from "fs";
import moment from "moment";

async function addUser(user) {
  var myObject = fs.readFileSync("data/notes.json");
  myObject = JSON.parse(myObject);

  const toAdd = { 0: {}, 1: {} };
  myObject[user] = toAdd;

  fs.writeFileSync("data/notes.json", JSON.stringify(myObject, null, 4));
}

async function addTask(user, task) {
  var myObject = fs.readFileSync("data/notes.json");
  myObject = JSON.parse(myObject);

  var toUpdate = myObject[user]["0"];
  var currEpoch = moment().unix();
  toUpdate[currEpoch] = task;
  myObject[user]["0"] = toUpdate;

  fs.writeFileSync("data/notes.json", JSON.stringify(myObject, null, 4));
}

async function delTask(user, epoch) {
  var myObject = fs.readFileSync("data/notes.json");
  myObject = JSON.parse(myObject);

  var pending = myObject[user]["0"];
  var completed = myObject[user]["1"];

  if (pending[epoch] != undefined) delete pending[epoch];
  if (completed[epoch] != undefined) delete completed[epoch];

  myObject[user]["0"] = pending;
  myObject[user]["1"] = completed;

  fs.writeFileSync("data/notes.json", JSON.stringify(myObject, null, 4));
  return true;
}

async function validate(user, pass) {
  const login = fs.readFileSync("data/credentials.json");
  const myObject = JSON.parse(login);
  if (myObject[user]) {
    if (myObject[user].toString() == pass) {
      var myObject2 = fs.readFileSync("data/notes.json");
      myObject2 = JSON.parse(myObject2);
      if (myObject2[user]) return myObject2[user];
      else return false;
    } else return false;
  } else return false;
}

export default function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    var { user, pass, task } = data;

    user = user.toString();
    pass = pass.toString();

    if (!task) {
      addUser(user);
      res.status(201).json({ status: "created user" });
      return;
    }

    validate(user, pass).then((result) => {
      if (typeof result == "object") {
        addTask(user, task).then(() => {
          res.status(200).json({ status: "added" });
        });
      } else res.status(500).json({ status: "failed" });
    });
  }
  if (req.method == "GET") {
    const data = req.query;
    var { user, pass } = data;

    if (!user || !pass) {
      res.status(400).json({});
      return;
    }
    user = user.toString();
    pass = pass.toString();

    validate(user, pass).then((result) => {
      if (typeof result == "object")
        res
          .status(200)
          .json({ completed: result["1"], incomplete: result["0"] });
      else res.status(200).json({ status: "invalid" });
    });
  }
  if (req.method == "DELETE") {
    const data = req.body;
    var { user, pass, taskEpoch } = data;

    user = user.toString();
    pass = pass.toString();

    validate(user, pass).then((result) => {
      if (typeof result == "object") {
        delTask(user, taskEpoch).then((result) => {
          if (result == true) res.status(200).json({ status: "deleted" });
          else res.status(200).json({ status: "invalid" });
        });
      } else res.status(200).json({ status: "invalid" });
    });
  }
}
