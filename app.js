require("dotenv").config();
require("./db");
const express = require("express");
const hbs = require("hbs");

const app = express();

require("./config")(app);
require("./config/session.config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "hELLO wORLD";
app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const userRouter = require("./routes/user.routes");
app.use("/", userRouter);

require("./error-handling")(app);

module.exports = app;
