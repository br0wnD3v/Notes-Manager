import fs from "fs";
const filePath = "data/credentials.json";

async function create(user, pass) {
  const login = fs.readFileSync(filePath);
  const myObject = JSON.parse(login);
  myObject[user] = pass;
  fs.writeFileSync("data/credentials.json", JSON.stringify(myObject, null, 4));
}

async function validate(user, pass) {
  const claims = fs.readFileSync(filePath);
  const myObject = JSON.parse(claims);
  if (myObject[user]) {
    if (myObject[user].toString() == pass) return true;
    else return false;
  } else return false;
}

export default function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    var { user, pass } = data;

    if (!user || !pass) {
      res.status(400).json({});
    }
    user = user.toString();
    pass = pass.toString();

    create(user, pass)
      .then(() => {
        res.status(201).json({ status: "created" });
        return;
      })
      .catch((err) => {
        res.status(500).json({ status: err });
        return;
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
      if (result == true) res.status(200).json({ state: "valid" });
      else res.status(200).json({ state: "invalid" });
    });
  }
}
