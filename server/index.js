const db = require("./src/db");
const app = require("./src");

async function start() {
	await db;

	app.listen(4000, () => console.log("Api on http://localhost:4000"));
}

start();
