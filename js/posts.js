$(document).ready(() => {

    SDK.Users.loadNav();

    // Variablerne til at oprette et event bliver her lavet, så de passer til API'ets endpoint

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