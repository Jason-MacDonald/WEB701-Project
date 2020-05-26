var express = require("express");
var router = express.Router();
const Bid = require("../models/bid");

// ##### POST BID #####
router.post("/bids", (req, res) => {
  console.log(req.body);
  if (!req.body.itemID) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    console.log(req.body);
    Bid.create(req.body)
      .then(() => {
        res.send("Bid Added");
      })
      .catch((err) => {
        res.send("Error: " + err);
      });
  }
});

// ##### GET ALL BIDS. #####
router.get("/bids/:id", (req, res) => {
  console.log(req.params.id);
  Bid.findAll({ where: { itemID: req.params.id }, order: [["bid", "DESC"]] })
    .then((bids) => {
      res.json(bids);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// // ##### UPDATE EVENT #####
// router.put("/event/:id", (req, res) => {
//   if (!req.body.name) {
//     res.status(400);
//     res.json({
//       error: "Bad Data",
//     });
//   } else {
//     Event.update(
//       { name: req.body.name, description: req.body.description },
//       { where: { id: req.params.id } }
//     )
//       .then(() => {
//         res.send("Event Updated");
//       })
//       .error((err) => res.send(err));
//   }
// });

// // ##### DELETE EVENT #####
// router.delete("/event/:id", (req, res) => {
//   Event.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then(() => {
//       res.send("Event Deleted");
//     })
//     .catch((err) => {
//       res.send("Error: " + err);
//     });
// });

module.exports = router;
