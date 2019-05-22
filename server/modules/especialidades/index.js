const express = require("express");
const service = require("./especialidade.service");
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
	const newEspecialidade = req.body;
	const { result, error } = await service.create(newEspecialidade);
	res.jsonOrError(result, error);
});

router.post("/:id", async (req, res) => {
	const updatedEspecialidade = req.body;
	const { result, error } = await service.update(updatedEspecialidade);
	res.jsonOrError(result, error);
});
module.exports = router;
