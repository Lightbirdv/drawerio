const app = require("./app.js");

const port = process.env.APIPORT || 5000;

app.listen(port, () => {
	console.log("started");
});
