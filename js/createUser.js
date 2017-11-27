$(document).ready(() => {

    SDK.Users.loadNav();

    $("#createUser-button").click(() => {

        const password = $("#inputPassword").val();
        const firstname = $("#inputFirstName").val();
        const lastname = $("#inputLastName").val();
        const email = $("#inputEmail").val();
        const description = $("#inputDescription").val();
        const gender = $("#inputGender").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();

        SDK.Users.createUser(password,firstname,lastname,email,description,gender,major,semester, (err, data) => {

                console.log(err,data);

                window.location.href = "login.html";

        });

    });

});

