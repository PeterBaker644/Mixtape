$(document).ready(() => {

    async function getUser() {
        try {
            // is there a more elegant way to do this?
            let username = window.location.pathname.split("/").slice(-1).pop();
            console.log(username);
            let userInfo = await $.get(`/api/playlists/${username}`);
            console.log(userInfo);
        } catch (err) {
            console.log(err);
        }
    }

    getUser();
});