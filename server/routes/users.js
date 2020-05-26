var express = require("express");
var router = express.Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

//process.env.ACCESS_TOKEN_SECRET = "secret";

// ##### POST USER #####
router.post("/users/register", (req, res) => {
  const userData = {
    name: "",
    email: req.body.email,
    password: req.body.password,
  };

  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        //10? generates salt for hashed password.
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + " registered" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/users/login", (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let accessToken = jwt.sign(
            user.dataValues,
            process.env.ACCESS_TOKEN_SECRET
          );
          res.send(accessToken);
        } else {
          res.status(400).json({ error: "Incorrect details." });
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

// ##### GET ALL USERS #####
router.get("/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

// ##### GET USER #####
router.get("/users/account", authenticateToken, (req, res) => {
  User.findOne({
    where: { email: req.user.email },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

// ##### UPDATE USER #####
router.put("/user/:id", (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    User.update(
      { name: req.body.name, email: req.body.email },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.send("User Updated");
      })
      .error((err) => res.send(err));
  }
});

// ##### DELETE USER #####
router.delete("/user/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send("User Deleted");
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

// ##### MIDDLEWARE #####
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
