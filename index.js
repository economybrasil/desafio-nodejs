const db = require("./server/db");
const app = require("./server");

async function start() {
	await db;

	app.listen(4000, () => console.log("Api on http://localhost:4000"));
}

start();
