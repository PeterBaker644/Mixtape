$(document).ready(() => {

    async function getPlaylists () {
        let playlists = await $.get("/api/playlists");
        console.log(playlists);
    }

    getPlaylists;
});