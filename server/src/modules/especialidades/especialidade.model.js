const mongoose = require("mongoose");
const { Schema } = mongoose;

const especialidadeScheme = new Schema({
	nome: String
});

const Especialidade = mongoose.model("Especialidade", especialidadeScheme);

module.exports = Especialidade;
