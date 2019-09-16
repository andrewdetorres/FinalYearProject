const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//Bring in the routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

//Initialise app
const app = express();

//Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database config
const database = require("./config/keys").mongoURI;

//connect to mondoDB through mongoose
mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(`error = ${error}`));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
