const { Sequelize } = require("sequelize");

// CREATE DATABASE clase39_DB
const db = new Sequelize("clase39_DATA", "root", "root", {
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
});

module.exports = {
    db,
};