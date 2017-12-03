$(document).ready(() => {

    SDK.Users.loadNav();

    const $getUsers = $("#getUsers");

    SDK.Users.findAll((err, users) => {
        users.forEach((user) => {

            $getUsers.append(`

    <div class="row">
            <div class="co-lg-8">
            <div class="page-header">
            <table>
            <tr>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.major}</td>
            <td>${user.semester}</td>
            <td>${user.description}</td>
            </tr>
            </table>
            <div id="getUsers"></div>
            </div>
        
                `
            );
        });
    });

});