import fs from "fs";

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
    const data = req.query;
    var { user, pass } = data;

    if (!user || !pass) {
      res.status(400).json({});
      return;
    }
    user = user.toString();
    pass = pass.toString();

    validate(user, pass).then((result) => {});
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
