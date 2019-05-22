const express = require("express");
const bodyParser = require("body-parser");

const consultorioModule = require("./modules/consultorios");
const especialidadeModule = require("./modules/especialidades");
const medicoModule = require("./modules/medicos");

const app = express();

app.use(bodyParser.json());

app.get("/health", (_, res) => res.send("ok!"));

app.use("/consultorios", consultorioModule);
app.use("/especialidades", especialidadeModule);
app.use("/medicos", medicoModule);

module.exports = app;
