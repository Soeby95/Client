$(document).ready(() => {

    SDK.Users.loadNav();

    const $getPosts = $("#getPosts");

    SDK.Posts.getPosts((err, posts) => {

        if(err) console.log(err);

        console.log((posts));
        posts.forEach((post) => {

            $getPosts.append(`
             <tr>
            <td>${post.owner.id}</td>
            <td>${post.content}</td>
            </tr>
                `
            );
        });
    });

});