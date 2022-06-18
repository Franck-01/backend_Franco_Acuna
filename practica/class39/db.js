const { Sequelize } = require("sequelize");

// CREATE DATABASE clase39_DB
const db = new Sequelize("clase39_DATAB", "root", "root", {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
});

module.exports = {
    db,
};