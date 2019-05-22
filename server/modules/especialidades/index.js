const express = require("express");
const service = require("./especialidade.service");
const router = express.Router();

router.get("/", async (req, res) => {
	const models = await service.findAll();
	res.json(models);
});

router.get("/:id", async (req, res) => {
	const model = await service.find(req.params.id);
	res.json(model);
});

router.put("/", async (req, res) => {
	const newEspecialidade = req.body;
	const model = await service.create(newEspecialidade);
	res.json(model);
});

router.post("/:id", async (req, res) => {
	const updatedEspecialidade = req.body;
	const model = await service.update(updatedEspecialidade);
	res.json(model);
});
module.exports = router;
