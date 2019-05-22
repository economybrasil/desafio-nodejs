const express = require("express");
const service = require("./medico.service");
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
	const newMedico = req.body;
	const model = await service.create(newMedico);
	res.json(model);
});

router.post("/:id", async (req, res) => {
	const updatedMedico = req.body;
	const model = await service.update(updatedMedico);
	res.json(model);
});
module.exports = router;
