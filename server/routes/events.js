var express = require("express");
var router = express.Router();
const Event = require("../models/event");

// ##### POST EVENT #####
router.post("/event", (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    Event.create(req.body)
      .then(() => {
        res.send("Event Added");
      })
      .catch((err) => {
        res.send("Error: " + err);
      });
  }
});

// ##### GET ALL EVENTS. #####
router.get("/events", (req, res) => {
  Event.findAll()
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// ##### UPDATE EVENT #####
router.put("/event/:id", (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    Event.update(
      { name: req.body.name, description: req.body.description },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.send("Event Updated");
      })
      .error((err) => res.send(err));
  }
});

// ##### DELETE EVENT #####
router.delete("/event/:id", (req, res) => {
  Event.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send("Event Deleted");
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

module.exports = router;
