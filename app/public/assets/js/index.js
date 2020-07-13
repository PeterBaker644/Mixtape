$(document).ready(() => {

    // async function getPlaylists() {
    //     try {
    //         let playlists = await $.get("/api/playlists");
    //         console.log(playlists);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // Add minus icon for collapse element which is open by default
    // $(".collapse.show").each(function () {
    //     console.log("collapse show");
    //     $(this).prev(".card-header").find(".fa").addClass("fa-minus-circle").removeClass("fa-plus-circle");
    // });

    $(".author-link").on("click", function(event){
        console.log("you clicked the author");
        event.stopPropagation();
        author = $(this).text();
        window.location.replace("/user/" + author);

    });

    $("#add-song").on("click", function(event){
        // Figure out a solution for this id thing
        // Save all to local storage?
        let idNumber = 1;
        console.log("add song to playlist");
        event.preventDefault();
        event.stopPropagation();
        let songName = $("#song-name").val();
        let songArtist = $("#song-artist").val();
        console.log(songName);
        console.log(songArtist);
        let idCell = $("<td>").addClass("no-border");
        let nameCell = $("<td>").addClass("no-border");
        let artistCell = $("<td>").addClass("no-border");
        let buttonCell = $("<td>").addClass("no-border");
        let icon = $("<i>").addClass("fas").addClass("fa-times");
        idCell.text(idNumber).attr("scope", "row");
        idNumber ++;
        nameCell.text(songName);
        artistCell.text(songArtist);
        buttonCell.append(icon);
        let row = $("<tr>").append(idCell, nameCell,artistCell, buttonCell);
        $(".song-table").append(row);
        // Clear local storage when you hit submit?
        $("#song-name").val("");
        $("#song-artist").val("");
    });

    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on("show.bs.collapse", function () {
        console.log("collapse hide");
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    }).on("hide.bs.collapse", function () {
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });

    // getPlaylists();
});