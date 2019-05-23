const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicoScheme = new Schema({
	crm: String,
	nome: String,
	especialidades: [{ type: Schema.Types.ObjectId, ref: "Especialidade" }],
	consultorios: [{ type: Schema.Types.ObjectId, ref: "Consultorio" }]
});

const Medico = mongoose.model("Medico", medicoScheme);

module.exports = Medico;
