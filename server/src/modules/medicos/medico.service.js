const MedicoModel = require("./medico.model");
const ConsultorioModel = require("../consultorios/consultorio.model");

async function findAll() {
	try {
		const docs = await MedicoModel.find().exec();

		return { result: docs };
	} catch (e) {
		return { error: { exception: e } };
	}
}
async function find(id) {
	try {
		const doc = await MedicoModel.findById(id).exec();

		return { result: doc };
	} catch (e) {
		return { error: { exception: e } };
	}
}

async function findAllConsultorios(id) {
	try {
		const doc = await MedicoModel.findById(id)
			.populate("consultorios")
			.exec();

		if (!doc) {
			return { result: [] };
		}
		return { result: doc.consultorios };
	} catch (e) {
		return { error: { exception: e } };
	}
}

async function create(model) {
	try {
		if (!model.especialidades || !model.especialidades.length) {
			return { error: "Deve ser informado ao menos uma especialidade" };
		}

		const doc = new MedicoModel(model);

		await doc.save();

		return { result: doc };
	} catch (e) {
		if (e.errors && e.name === "ValidationError" && "especialidades" in e.errors) {
			// trata pra erro de referencia em especialidade
			if (e.errors.especialidades.reason.kind === "ObjectId") {
				return { error: "A especialidade selecionada não existe." };
			}
		}

		return { error: { exception: e } };
	}
}

async function addConsultorio(id, consultorioId) {
	try {
		const medico = await MedicoModel.findById(id).exec();

		if (!medico) {
			return { error: "Médico não encontrado" };
		}

		const consultorio = await ConsultorioModel.findById(consultorioId).exec();

		if (!consultorio) {
			return { error: "Consultorio não encontrado" };
		}

		const contemEspecialidadeEmComum = consultorio.especialidades.some(especialidadeConsultorio => {
			return medico.especialidades.includes(especialidadeConsultorio);
		});

		if (!contemEspecialidadeEmComum) {
			return { error: "O consultorio não é compativel com suas especialidades" };
		}

		const doc = await MedicoModel.updateOne({ _id: id }, { $push: { consultorios: consultorioId } }).exec();

		return { result: doc };
	} catch (e) {
		console.log(e);
		return { error: { exception: e } };
	}
}

async function update(id, model) {
	try {
		if (!model.especialidades || !model.especialidades.length) {
			return { error: "Deve ser informado ao menos uma especialidade" };
		}

		const doc = await MedicoModel.findById(id).exec();

		doc.nome = model.nome;
		doc.crm = model.crm;
		doc.especialidades = model.especialidades;

		await doc.save();

		return { result: doc };
	} catch (e) {
		console.log(e);
		if (e.errors && e.name === "ValidationError" && "especialidades" in e.errors) {
			// trata pra erro de referencia em especialidade
			if (e.errors.especialidades.reason.kind === "ObjectId") {
				return { error: "A especialidade selecionada não existe." };
			}
		}

		return { error: { exception: e } };
	}
}

async function remove(id) {
	try {
		await MedicoModel.deleteOne({ _id: id }).exec();

		return {};
	} catch (e) {
		return { error: { exception: e } };
	}
}

async function removeConsultorio(id, consultorioId) {
	try {
		const doc = await MedicoModel.updateOne({ _id: id }, { $pull: { consultorios: consultorioId } }).exec();

		return { result: doc };
	} catch (e) {
		console.log(e);
		return { error: { exception: e } };
	}
}

module.exports = {
	findAll,
	findAllConsultorios,
	find,
	addConsultorio,
	create,
	update,
	remove,
	removeConsultorio
};
