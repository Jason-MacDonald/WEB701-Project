var express = require("express");
var router = express.Router();
const Member = require("../models/member");

// ##### POST MEMBER #####
router.post("/member", (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    Member.create(req.body)
      .then(() => {
        res.send("Member Added");
      })
      .catch((err) => {
        res.send("Error: " + err);
      });
  }
});

// ##### GET ALL MEMBERS #####
router.get("/members", (req, res) => {
  Member.findAll()
    .then((members) => {
      res.json(members);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

// ##### UPDATE MEMBER #####
router.put("/member/:id", (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    Member.update(
      { name: req.body.name, description: req.body.description },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.send("Member Updated");
      })
      .error((err) => res.send(err));
  }
});

// ##### DELETE MEMBER #####
router.delete("/member/:id", (req, res) => {
  Member.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send("Member Deleted");
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

module.exports = router;
