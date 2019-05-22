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

router.put("/", async (req, res) => {
	const newMedico = req.body;
	const { result, error } = await service.create(newMedico);
	res.jsonOrError(result, error);
});

router.post("/:id", async (req, res) => {
	const updatedMedico = req.body;
	const { result, error } = await service.update(updatedMedico);
	res.jsonOrError(result, error);
});
module.exports = router;
