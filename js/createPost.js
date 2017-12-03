$(document).ready(() => {

    SDK.Users.loadNav();

    $("#createPost-button").click(() => {

        const owner = SDK.Users.current();
        const content = $("#inputContent").val();


        SDK.Posts.createPost(owner,content, (err, data) => {

            console.log(err,data);

                window.location.href = "home-page.html";

        });

    });

});