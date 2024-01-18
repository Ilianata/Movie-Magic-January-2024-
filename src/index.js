const express = require("express");

const routes = require("./routes");
const configHandlebars = require("./config/configHandlebars");
const configExpres = require("./config/configExpress");

const app = express();
const port = 5000;

configHandlebars(app);
configExpres(app);

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
