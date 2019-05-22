const request = require("supertest");

const app = require("../../../index");

const medicoService = require("../medico.service");
jest.mock("../medico.service");

describe("Medicos Routes", () => {
	beforeEach(() => {
		medicoService.findAll.mockClear();
		medicoService.find.mockClear();
	});
	test("Deve solicitar todos os medicos na rota de GET /", done => {
		const values = [];

		medicoService.findAll.mockReturnValue({ result: values });

		request(app)
			.get("/medicos")
			.expect("Content-Type", /json/)
			.expect(200, values, done);
	});

	test("Deve solicitar um medico pelo id na rota de GET /:id", done => {
		const value = { id: 1 };

		medicoService.find.mockReturnValue({ result: value });

		request(app)
			.get("/medicos/1")
			.expect("Content-Type", /json/)
			.expect(200, value)
			.expect(function() {
				expect(medicoService.find).toHaveBeenCalledWith("1");
			})
			.then(() => done());
	});

	test("Deve solicitar a inserção de um consultório pela rota de PUT /", done => {
		const value = { id: 1, nome: "foo" };

		medicoService.create.mockReturnValue({ result: value });

		request(app)
			.put("/medicos")
			.send({ nome: "foo" })
			.expect("Content-Type", /json/)
			.expect(200, value)
			.expect(function() {
				expect(medicoService.create).toHaveBeenCalledWith({ nome: "foo" });
			})
			.then(() => done());
	});

	test("Deve solicitar a alteraçnao de um consultório pela rota de POST /:id", done => {
		const value = { id: 1, nome: "foo" };

		medicoService.update.mockReturnValue({ result: value });

		request(app)
			.post("/medicos/1")
			.send(value)
			.expect("Content-Type", /json/)
			.expect(200, value)
			.expect(function() {
				expect(medicoService.update).toHaveBeenCalledWith(value);
			})
			.then(() => done());
	});
});
