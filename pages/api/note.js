import fs from "fs";

async function addTask(user, task) {
  var myObject = fs.readFileSync("data/notes.json");
  myObject = JSON.parse(myObject);

  var toUpdate = myObject[user];
  toUpdate["0"].push(task);
  myObject[user] = toUpdate;

  fs.writeFileSync("data/notes.json", JSON.stringify(myObject, null, 4));
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
    task = task.toString();

    validate(user, pass)
      .then((result) => {
        if (typeof result == "object") {
          addTask(user, task).then(() => {
            res.status(200).json({ status: "added" });
          });
        } else res.state(500).json({ status: "failed" });
      })
      .catch(() => {
        res.state(500).json({ status: "failed" });
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
      else res.status(200).json({ state: "invalid" });
    });
  }
}
