const express = require("express");
const session = require("express-session");
const passport = require("./app/config/passport");

const PORT = process.env.PORT || 3000;
const db = require("./app/models");
const exphbs = require("express-handlebars");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "change me later", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./app/routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
        );
    });
});
