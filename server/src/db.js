const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://localhost:32768/economybrasil", { useNewUrlParser: true });

module.exports = connection;
