$(document).ready(() => {

    async function getPlaylists() {
        try {
            let playlists = await $.get("/api/playlists");
            console.log(playlists);
        } catch (err) {
            console.log(err);
        }
    }

    getPlaylists();
});