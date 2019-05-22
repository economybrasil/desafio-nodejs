const request = require("supertest");

const app = require("../index");

describe("Server App", () => {
	test("Deve ser possivel acessar o servidor", done => {
		request(app)
			.get("/health")
			.expect(200, done);
	});
});
