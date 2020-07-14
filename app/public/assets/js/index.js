$(document).ready(() => {
    let songArray = [];

    function populateTable() {
        $(".song-table").empty();
        for ([i, song] of songArray.entries()) {
            let idCell = $("<td>").addClass("no-border");
            let nameCell = $("<td>").addClass("no-border");
            let artistCell = $("<td>").addClass("no-border");
            let buttonCell = $("<td class='no-border text-center pt-3 song-button text-random delete'><i class='fa fa-times'></i></td>");
            idCell.text(i + 1).attr("scope", "row");
            nameCell.text(song.songName);
            artistCell.text(song.songArtist);
            let row = $("<tr>").append(idCell, nameCell, artistCell, buttonCell).attr("id", (i));
            $(".song-table").append(row);
        }
        $("#table-songs").tableDnDUpdate();
        // console.log("=========Repopulated=========");
        // console.log(songArray);
    }

    function refreshIndex() {
        for (let i = 0; i < songArray.length; i++) {
            songArray[i].songPosition = i;
        }
        // console.log("=========Refreshed=========");
        // console.log(songArray);
    }

    function parseDates() {
        let lastLogin = $("#last-login").attr("data-date");
        let dateCreated = $("#date-created").attr("data-date");
        $("#last-login").text(moment(lastLogin).format("MMMM Do"));
        $("#date-created").text(moment(dateCreated).format("MMMM Do"));
    }

    //=================COLOR=STUFF==================
    $(".random-color").each(function () {
        $(this).css("color", randomColor({
            luminosity: "bright",
        }));
    });
    $(".random-light").each(function () {
        $(this).css("color", randomColor({
            luminosity: "light",
        }));
    });
    $(".text-random").mouseleave(() => {
        $("*").css("--random-color", randomColor());
    });

    parseDates();

    $("#table-songs").tableDnD({
        onDrop: (table) => {
            let rows = table.tBodies[0].rows;
            let sortingArray = [];
            for (let i = 0; i < rows.length; i++) {
                sortingArray.push(Number(rows[i].id));
            }
            // console.log("=========Sort-By=========");
            // console.log(sortingArray);
            // console.log("=========To-be-sorted=========");
            // console.log(songArray);
            songArray.sort(function (a, b) {
                return sortingArray.indexOf(a.songPosition) - sortingArray.indexOf(b.songPosition);
            });
            for (let i = 0; i < songArray.length; i++) {
                songArray[i].songPosition = i;
            }
            // console.log("=========Sorted=========");
            // console.log(songArray);
            // console.log("=========Post-Sorting-Array=========");
            // console.log(sortingArray);
            populateTable();
        }
    });

    $(".author-link").on("click", function (event) {
        console.log("you clicked the author");
        event.stopPropagation();
        author = $(this).text();
        window.location.replace("/user/" + author);

    });

    $("#add-song").on("click", function (event) {
        console.log(songArray);
        event.preventDefault();
        event.stopPropagation();
        let songName = $("#song-name").val().trim();
        let songArtist = $("#song-artist").val().trim();
        songArray.push({ "songName": songName, "songArtist": songArtist, "songPosition": songArray.length });
        populateTable();
        console.log(songArray);
        $("#song-name").val("");
        $("#song-artist").val("");
    });

    $(".song-table").on("click", ".delete", function (event) {
        event.preventDefault();
        songArray.splice($(this).parent().attr("id"), 1);
        $(this).parent().remove();
        refreshIndex();
        populateTable();
    });

    $("#submit-playlist").on("click", function (event) {
        event.preventDefault();
        // console.log("submit playlist!");
        // console.log(playlistTitle);
        // console.log(playlistDescription);
        // console.log(playlistContents);
        $.post("/api/playlists", {
            playlistTitle: $("#playlist-title").val().trim(),
            playlistDescription: $("#playlist-description").val().trim(),
            playlistContents: songArray
            // eslint-disable-next-line no-unused-vars
        }).then((res) => {
            window.location.replace("/playlists");
            // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(err => {
            console.log(err);
        });
    });

    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on("show.bs.collapse", function () {
        console.log("collapse hide");
        $(this).prev(".card-header").find(".fa-plus-circle").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    }).on("hide.bs.collapse", function () {
        $(this).prev(".card-header").find(".fa-minus-circle").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });
});