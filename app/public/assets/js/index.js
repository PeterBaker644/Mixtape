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

    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on("show.bs.collapse", function () {
        console.log("collapse hide");
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    }).on("hide.bs.collapse", function () {
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });

    // getPlaylists();
});