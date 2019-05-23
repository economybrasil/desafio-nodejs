const EspecialidadeModel = require("./especialidade.model");
const ConsultorioModel = require("../consultorios/consultorio.model");
const MedicoModel = require("../medicos/medico.model");

async function findAll() {
	try {
		const docs = await EspecialidadeModel.find({}).exec();
		console.log(docs);
		return { result: docs };
	} catch (e) {
		return { error: { exception: e } };
	}
}
async function find(id) {
	try {
		const doc = await EspecialidadeModel.findById(id).exec();

		return { result: doc };
	} catch (e) {
		return { error: { exception: e } };
	}
}

async function create(model) {
	try {
		const doc = new EspecialidadeModel(model);

		await doc.save();

		return { result: doc };
	} catch (e) {
		return { error: { exception: e } };
	}
}
async function update(id, model) {
	try {
		const doc = await EspecialidadeModel.findById(id).exec();

		doc.nome = model.nome;
		doc.especialidades = model.especialidades;

		await doc.save();

		return { result: doc };
	} catch (e) {
		return { error: { exception: e } };
	}
}

module.exports = {
	findAll,
	find,
	create,
	update
};
