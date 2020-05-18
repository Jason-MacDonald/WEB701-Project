const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "event",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);
