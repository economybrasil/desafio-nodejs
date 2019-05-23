const mongoose = require("mongoose");
const { Schema } = mongoose;

const consultorioScheme = new Schema({
	nome: String,
	especialidades: [{ type: Schema.Types.ObjectId, ref: "Especialidade" }]
});

const Consultorio = mongoose.model("Consultorio", consultorioScheme);

module.exports = Consultorio;
