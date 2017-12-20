$(document).ready(() => {

    SDK.Users.loadNav();

    // Variablerne til at hente alle bruger bliver her specificeret, så de passer til API'ets endpoint

    const $getUsers = $("#getUsers");

    SDK.Users.findAll((err, users) => {
        users.forEach((user) => {

            $getUsers.append(`
            <tr>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.description}</td>
            <td>${user.major}</td>
            <td>${user.semester}</td>
            </tr>
                `
            );
        });
    });

});