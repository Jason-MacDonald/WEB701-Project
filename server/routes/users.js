var express = require("express");
var router = express.Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

process.env.SECRET_KEY = "secret";

// ##### POST USER #####
router.post("/users/register", (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
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
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
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

module.exports = router;
