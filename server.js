const express = require("express");
const session = require("express-session");
var flash = require("connect-flash");
var path = require("path");

const app = express();

// access to the mysql database
const db = null;

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

require("./routes/sessionHandler")(app);
require("./routes/HTML")(app, path);

// setting up the port the server will be in
let PORT = process.env.PORT || 3000;

// listener to trigger server
app.listen(PORT, () => {
    console.log('Listening...')
})