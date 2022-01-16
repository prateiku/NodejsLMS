const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieparser = require('cookie-parser')
const dbConfig = require("./app/config/db.config");
//Loads the handlebars module
const exphbs = require('express-handlebars');//Sets our app to use the handlebars engine

const app = express();

app.use(cookieparser())

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, './app/views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './app/views'));

var corsOptions = {
  origin: "http://192.168.43.11:8081"
};

console.log(__dirname);
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "\\app\\static"));

const db = require("./app/models");
const cookieParser = require("cookie-parser");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connection to MongoDB established.");
    initial();
  })
  .catch(err => {
    console.error("Failed to establish connection to MongoDB", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.render("index");
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const IP = '127.0.0.1';// process.env.IP ||  //'192.168.43.11' 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`);
  console.log(`Link: https://${IP}:${PORT}/`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      /* new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      }); */

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
