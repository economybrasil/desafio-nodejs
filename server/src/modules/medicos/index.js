const express = require("express");
const service = require("./medico.service");
const router = express.Router();

router.get("/", async (req, res) => {
	const { result, error } = await service.findAll();
	res.jsonOrError(result, error);
});

router.get("/:id", async (req, res) => {
	const { result, error } = await service.find(req.params.id);
	res.jsonOrError(result, error);
});

router.get("/:id/consultorios", async (req, res) => {
	const { result, error } = await service.findAllConsultorios(req.params.id);
	res.jsonOrError(result, error);
});

router.put("/", async (req, res) => {
	const newMedico = req.body;
	const { result, error } = await service.create(newMedico);
	res.jsonOrError(result, error);
});

router.put("/:id/consultorios", async (req, res) => {
	const consultorioId = req.body.id;
	const { result, error } = await service.addConsultorio(req.params.id, consultorioId);
	res.jsonOrError(result, error);
});

router.post("/:id", async (req, res) => {
	const updatedMedico = req.body;
	const { result, error } = await service.update(req.params.id, updatedMedico);
	res.jsonOrError(result, error);
});

router.delete("/:id", async (req, res) => {
	const { result, error } = await service.remove(req.params.id);
	res.jsonOrError(result, error);
});

router.delete("/:id/consultorios/:consultorioId", async (req, res) => {
	const { result, error } = await service.removeConsultorio(req.params.id, req.params.consultorioId);
	res.jsonOrError(result, error);
});

module.exports = router;
