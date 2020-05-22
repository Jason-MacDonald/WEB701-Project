var express = require("express");
var router = express.Router();
const Item = require("../models/item");

// ##### POST ITEM #####
router.post("/item", (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    Item.create(req.body)
      .then(() => {
        res.send("Item Added");
      })
      .catch((err) => {
        res.send("Error: " + err);
      });
  }
});

// ##### GET ALL ITEMS #####
router.get("/items", (req, res) => {
  Item.findAll({ order: [["id", "DESC"]] })
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// ##### UPDATE ITEM #####
router.put("/item/:id", (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    Item.update(
      { name: req.body.name, description: req.body.description },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.send("Item Updated");
      })
      .error((err) => res.send(err));
  }
});

// ##### DELETE ITEM #####
router.delete("/item/:id", (req, res) => {
  Item.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send("Item Deleted");
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

module.exports = router;
