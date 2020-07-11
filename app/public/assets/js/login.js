$(document).ready(() => {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    const usernameInput = $("input#username-input");
    const passwordInput = $("input#password-input");

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(username, password) {
        console.log(username, password);
        $.post("/api/login", {
            username: username,
            password: password
        })
            .then(() => {
                window.location.replace("/playlists");
                // If there's an error, log the error
            })
            .catch(err => {
                console.log("=============front-end failure===============")
                console.log(err);
            });
    }

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", event => {
        event.preventDefault();
        console.log("You clicked the button good job.");
        const userData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.username, userData.password);
        usernameInput.val("");
        passwordInput.val("");
    });
});
