const express = require("express");
const service = require("./consultorio.service");
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
	const newConsultorio = req.body;
	const model = await service.create(newConsultorio);
	res.json(model);
});

router.post("/:id", async (req, res) => {
	const updatedConsultorio = req.body;
	const model = await service.update(updatedConsultorio);
	res.json(model);
});
module.exports = router;
