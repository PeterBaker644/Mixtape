const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./app/config/passport");

const PORT = process.env.PORT || 3000;
const db = require("./app/models");
const exphbs = require("express-handlebars");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// revisit the passport and sessions to make sure we know what is going on. Consider putting the secret in an environment variable just for giggles.
app.use(session({ secret: "change me later", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
// https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// honestly I have absolutely no idea how this syntax works
// some hard to understand explanations here: https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
require("./app/routes/html-routes.js")(app);
require("./app/routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
        );
    });
});
