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
    else return {};
  } else return {};
}

async function addDomain(user, domain, password) {
  var myObject = fs.readFileSync("data/password.json");
  myObject = JSON.parse(myObject);

  var toUpdate = myObject[user];
  toUpdate[domain] = password;
  myObject[user] = toUpdate;

  fs.writeFileSync("data/password.json", JSON.stringify(myObject, null, 4));
  return true;
}

async function delDomain(user, domain) {
  var myObject = fs.readFileSync("data/password.json");
  myObject = JSON.parse(myObject);

  var updated = myObject[user];
  delete updated[domain];
  myObject[user] = updated;

  fs.writeFileSync("data/password.json", JSON.stringify(myObject, null, 4));
  return true;
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
    const { user, pass } = data;

    checkPresent(user, pass).then((result) => {
      res.status(200).json({ status: result });
    });
  }

  if (req.method == "PUT") {
    const data = req.body;
    const { user, vPass, domain, dPass } = data;

    checkPresent(user, vPass).then((result) => {
      if (result != {}) {
        addDomain(user, domain, dPass)
          .then(() => {
            res.status(201).json({ status: "created" });
          })
          .catch((err) => {
            res.status(400).json({ status: err });
          });
      } else {
        res.status(401).json({ status: "invalid credentials" });
      }
    });
  }

  if (req.method == "DELETE") {
    const data = req.body;
    const { user, vPass, dId } = data;

    checkPresent(user, vPass).then((result) => {
      if (result != {}) {
        const Keys = Object.keys(result);
        const toDel = Keys[dId];
        delDomain(user, toDel)
          .then(() => {
            res.status(200).json({ status: "deleted" });
          })
          .catch((err) => {
            res.status(400).json({ status: err });
          });
      } else {
        res.status(401).json({ status: "invalid domain" });
      }
    });
  }
}
