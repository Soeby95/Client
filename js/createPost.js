$(document).ready(() => {

    SDK.Users.loadNav();

    // Variablerne til at oprette en post bliver her specificeret, så de passer til API'ets endpoint

    $("#createPost-button").click((e) => {

        const owner = SDK.Users.current();
        const content = $("#inputContent").val();

        console.log(owner);
        console.log(content);


        SDK.Posts.createPost(owner,content, (err, data) => {

            console.log(err,data);

               window.location.href = "posts.html";

        });

    });

});