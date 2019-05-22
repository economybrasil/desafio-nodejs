const express = require("express");
const service = require("./consultorio.service");
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
	const newConsultorio = req.body;
	const { result, error } = await service.create(newConsultorio);
	res.jsonOrError(result, error);
});

router.post("/:id", async (req, res) => {
	const updatedConsultorio = req.body;
	const { result, error } = await service.update(updatedConsultorio);
	res.jsonOrError(result, error);
});
module.exports = router;
