import fs from "fs";

async function create(user, pass) {
  var myObject = fs.readFileSync("data/password.json");
  myObject = JSON.parse(myObject);

  if (myObject[user]) {
    myObject[user]["MASTER_PASSWORD"] = pass;
  } else {
    const toPush = {};
    toPush.MASTER_PASSWORD = pass;
    myObject[user] = toPush;
  }

  fs.writeFileSync("data/password.json", JSON.stringify(myObject, null, 4));
  return true;
}

async function checkPresent(user, pass) {
  var myObject = fs.readFileSync("data/password.json");
  myObject = JSON.parse(myObject);

  if (myObject[user]) {
    if (myObject[user]["MASTER_PASSWORD"] == pass) return myObject[user];
    else return false;
  } else return false;
}

export default function (req, res) {
  if (req.method == "POST") {
    const data = req.body;
    const { user, pass } = data;

    create(user, pass)
      .then(() => {
        res.status(201).json({ status: "created" });
      })
      .catch((err) => {
        res.status(200).json({ status: err });
      });
  }

  if (req.method == "GET") {
    const data = req.query;
    const { user, password } = data;

    checkPresent(user, password).then((result) => {
      if (result) res.status(200).json({ status: result });
      else res.status(200).json({ status: "invalid" });
    });
  }
}
