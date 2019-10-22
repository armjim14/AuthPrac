const express = require("express");
const session = require("express-session");
var flash = require("connect-flash");
var path = require("path");

const app = express();

// access to the mysql database
const db = require("./models");

// parsing url response
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// for express to use session
app.use(
    session({
        name: "sessionName",
        secret: "thisMightHaveToBeInTheDotenvPlace",
        resave: false,
        saveUninitialized: false
    })
);
  
// for flashing messages
app.use(flash());

require("./routes/sessionHandler")(app, db);
require("./routes/HTML")(app, path);

// setting up the port the server will be in
let PORT = process.env.PORT || 3000;

// listener to trigger server
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log("Listening...");
  });
});