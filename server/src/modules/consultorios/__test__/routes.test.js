const request = require("supertest");

const app = require("../../../index");

const consultorioService = require("../consultorio.service");
jest.mock("../consultorio.service");

describe("Consultorios Routes", () => {
	beforeEach(() => {
		consultorioService.findAll.mockClear();
		consultorioService.findAllMedicos.mockClear();
		consultorioService.find.mockClear();
		consultorioService.create.mockClear();
		consultorioService.update.mockClear();
		consultorioService.remove.mockClear();
	});

	test("Deve solicitar todos os consultorios na rota de GET /", done => {
		const values = [];

		consultorioService.findAll.mockReturnValue({ result: values });

		request(app)
			.get("/consultorios")
			.expect("Content-Type", /json/)
			.expect(200, values, done);
	});

	test("Deve solicitar todos os medicos do consultorios na rota de GET /:id/medicos", done => {
		const values = [];

		consultorioService.findAllMedicos.mockReturnValue({ result: values });

		request(app)
			.get("/consultorios/1/medicos")
			.expect("Content-Type", /json/)
			.expect(200, values)
			.expect(function() {
				expect(consultorioService.findAllMedicos).toHaveBeenCalledWith("1");
			})
			.then(() => done());
	});

	test("Deve solicitar um consultorio pelo id na rota de GET /:id", done => {
		const value = { id: 1 };

		consultorioService.find.mockReturnValue({ result: value });

		request(app)
			.get("/consultorios/1")
			.expect("Content-Type", /json/)
			.expect(200, value)
			.expect(function() {
				expect(consultorioService.find).toHaveBeenCalledWith("1");
			})
			.then(() => done());
	});

	test("Deve solicitar a inserção de um consultório pela rota de PUT /", done => {
		const value = { id: 1, nome: "foo" };

		consultorioService.create.mockReturnValue({ result: value });

		request(app)
			.put("/consultorios")
			.send({ nome: "foo" })
			.expect("Content-Type", /json/)
			.expect(200, value)
			.expect(function() {
				expect(consultorioService.create).toHaveBeenCalledWith({ nome: "foo" });
			})
			.then(() => done());
	});

	test("Deve solicitar a alteraçnao de um consultório pela rota de POST /:id", done => {
		const value = { id: 1, nome: "foo" };

		consultorioService.update.mockReturnValue({ result: value });

		request(app)
			.post("/consultorios/1")
			.send(value)
			.expect("Content-Type", /json/)
			.expect(200, value)
			.expect(function() {
				expect(consultorioService.update).toHaveBeenCalledWith("1", value);
			})
			.then(() => done());
	});

	test("Deve solicitar a remoção de um consultório pela rota de DELETE /:id", done => {
		const value = { id: 1, nome: "foo" };

		consultorioService.remove.mockReturnValue({ result: value });

		request(app)
			.delete("/consultorios/1")
			.send(value)
			.expect("Content-Type", /json/)
			.expect(200)
			.expect(function() {
				expect(consultorioService.remove).toHaveBeenCalledWith("1");
			})
			.then(() => done());
	});
});
