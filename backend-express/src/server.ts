const app = require("./app.js");

const port = process.env.APIPORT || 3000;

app.listen(port, () => {
	console.log("started");
});
