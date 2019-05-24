const ConsultorioModel = require("./consultorio.model");
const MedicoModel = require("../medicos/medico.model");

async function findAll() {
	try {
		const docs = await ConsultorioModel.find().exec();

		return { result: docs };
	} catch (e) {
		return { error: { exception: e } };
	}
}

async function findAllMedicos(id) {
	try {
		const docs = await MedicoModel.find({ consultorios: id }).exec();

		return { result: docs };
	} catch (e) {
		return { error: { exception: e } };
	}
}

async function find(id) {
	try {
		const doc = await ConsultorioModel.findById(id).exec();

		return { result: doc };
	} catch (e) {
		return { error: { exception: e } };
	}
}

async function create(model) {
	try {
		if (!model.especialidades || !model.especialidades.length) {
			return { error: "Deve ser informado ao menos uma especialidade" };
		}

		const doc = new ConsultorioModel(model);

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

async function addMedico(id, medicoId) {
	try {
		const medico = await MedicoModel.findById(medicoId).exec();

		if (!medico) {
			return { error: "Médico não encontrado" };
		}

		const consultorio = await ConsultorioModel.findById(id).exec();

		if (!consultorio) {
			return { error: "Consultorio não encontrado" };
		}

		const contemEspecialidadeEmComum = consultorio.especialidades.some(especialidadeConsultorio => {
			return medico.especialidades.includes(especialidadeConsultorio);
		});

		if (!contemEspecialidadeEmComum) {
			return { error: "O médico não é compativel com especialidades do consultorio" };
		}

		const doc = await MedicoModel.updateOne({ _id: medicoId }, { $push: { consultorios: id } }).exec();

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

		const doc = await ConsultorioModel.findById(id).exec();

		doc.nome = model.nome;
		doc.especialidades = model.especialidades;

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

async function remove(id) {
	try {
		await ConsultorioModel.deleteOne({ id: id }).exec();

		return {};
	} catch (e) {
		return { error: { exception: e } };
	}
}

async function removeMedico(id, medicoId) {
	try {
		const doc = await MedicoModel.updateOne({ _id: medicoId }, { $pull: { consultorios: id } }).exec();

		return { result: doc };
	} catch (e) {
		console.log(e);
		return { error: { exception: e } };
	}
}

module.exports = {
	findAll,
	findAllMedicos,
	find,
	create,
	addMedico,
	update,
	remove,
	removeMedico
};
