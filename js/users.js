$(document).ready(() => {

    SDK.Users.loadNav();

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