$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const firstName = $("input#first-name-input");
    const lastName = $("input#last-name-input");
    const emailInput = $("input#email-input");
    const username = $("input#user-name-input");
    const passwordInput = $("input#password-input");

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser({firstName, lastName, email, username, password}) {
        $.post("/api/signup", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        })
            .then(() => {
                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            email: emailInput.val().trim(),
            username: username.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData);
        emailInput.val("");
        passwordInput.val("");
    });

});
