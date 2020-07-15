$(document).ready(() => {

    function deletePlaylist(playlistId) {
        console.log("Destroying Playlist");
        $.post("/api/playlists_destroy", {
            playlistId: playlistId,
        }).then(() => {
            window.location.replace("/profile/settings");
        }).catch(err => {
            console.log(err);
        });
    }

    $("#edit, #submit, #cancel").on("click", function (event) {
        console.log("you pressed the button");
        event.preventDefault();
        $(".toggle").slideToggle();
        $(".toggle-fade").fadeToggle();
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        let username = $("#username").val();
        let email = $("#email").val();
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        $.post("/api/user", {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName
        }).then(() => {
            // trigger the modal here to warn the user or to confrim they have changed succesfully.
            window.location.replace("/profile/settings");
            // If there's an error, handle it by DOING NOTHING
        }).catch(err => {
            console.log(err);
        });
    });

    $(".playlist-container").append("<button class='font-comment d-flex delete-playlist' data-toggle='modal' data-target='#deleteWarning'><span class='d-none d-lg-block'>Delete Playlist </span><i class='fa fa-times m-3 m-lg-1'></i></button>");

    $(".delete-playlist").on("click", function (event) {
        event.preventDefault();
        let playlistId = $(this).parent().data("playlist");
        $("#deleteWarning").data("playlist", playlistId);
    });

    $(".modal").on("click", "#confirm-delete", function (event) {
        event.preventDefault();
        let playlistId = $(".modal").data("playlist");
        deletePlaylist(playlistId);
    });
});