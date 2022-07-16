const app = require("./app");

const port = process.env.APIPORT || 8080;

app.listen(port, () => {
	console.log("started");
});
