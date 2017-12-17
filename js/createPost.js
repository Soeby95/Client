$(document).ready(() => {

    SDK.Users.loadNav();

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