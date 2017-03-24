const express = require("express");
const path = require("path");
const bodyParser  = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

//connect to db
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () =>{
  console.log('connected to db' + config.database);
});

//on error
mongoose.connection.on('error', (err) =>{
  console.log('DB error' + err);
});

const app = express();

const users = require('./routes/users');

const port = 4040;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser middleware
app.use(bodyParser.json());

// passport middleweare
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//index route
app.get('/', (req, res) =>{
  res.send('invalid endpoint');
});

app.listen(port, () => {
  console.log("server running on port" + port);
});
