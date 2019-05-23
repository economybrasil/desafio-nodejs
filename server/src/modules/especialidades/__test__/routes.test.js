const request = require("supertest");

const app = require("../../../index");

const especialidadeService = require("../especialidade.service");
jest.mock("../especialidade.service");

describe("Especialidades Routes", () => {
	beforeEach(() => {
		especialidadeService.findAll.mockClear();
		especialidadeService.find.mockClear();
	});
	test("Deve solicitar todos os especialidades na rota de GET /", done => {
		const values = [];

		especialidadeService.findAll.mockReturnValue({ result: values });

		request(app)
			.get("/especialidades")
			.expect("Content-Type", /json/)
			.expect(200, values, done);
	});

	test("Deve solicitar um especialidade pelo id na rota de GET /:id", done => {
		const value = { id: 1 };

		especialidadeService.find.mockReturnValue({ result: value });

		request(app)
			.get("/especialidades/1")
			.expect("Content-Type", /json/)
			.expect(200, value)
			.expect(function() {
				expect(especialidadeService.find).toHaveBeenCalledWith("1");
			})
			.then(() => done());
	});

	test("Deve solicitar a inserção de um especialidade pela rota de PUT /", done => {
		const value = { id: 1, nome: "foo" };

		especialidadeService.create.mockReturnValue({ result: value });

		request(app)
			.put("/especialidades")
			.send({ nome: "foo" })
			.expect("Content-Type", /json/)
			.expect(200, value)
			.expect(function() {
				expect(especialidadeService.create).toHaveBeenCalledWith({ nome: "foo" });
			})
			.then(() => done());
	});

	test("Deve solicitar a alteraçnao de um especialidade pela rota de POST /:id", done => {
		const value = { id: 1, nome: "foo" };

		especialidadeService.update.mockReturnValue({ result: value });

		request(app)
			.post("/especialidades/1")
			.send(value)
			.expect("Content-Type", /json/)
			.expect(200, value)
			.expect(function() {
				expect(especialidadeService.update).toHaveBeenCalledWith(value);
			})
			.then(() => done());
	});
});
