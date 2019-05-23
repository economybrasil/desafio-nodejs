const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const consultorioModule = require("./modules/consultorios");
const especialidadeModule = require("./modules/especialidades");
const medicoModule = require("./modules/medicos");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.jsonOrError = function(result, error) {
		if (error) {
			res.status(400);
			res.json(error);
			return;
		}
		res.json(result);
	};
	next();
});

app.get("/health", (_, res) => res.send("ok!"));
app.use(express.static("public"));

app.use("/consultorios", consultorioModule);
app.use("/especialidades", especialidadeModule);
app.use("/medicos", medicoModule);

module.exports = app;
