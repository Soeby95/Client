$(document).ready(() => {

    SDK.Users.loadNav();

    $("#createUser-button").click(() => {

        const password = $("#inputPassword").val();
        const name = $("#inputName").val();
        const lastname = $("#inputLastName").val();
        const email = $("#inputEmail").val();
        const description = $("#inputDescription").val();
        const gender = $("#inputGender").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();

        SDK.createUser(password,name,lastname,email,description,gender,major,semester (err, data); => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Fejl")
            } else {
                window.location.href = "login.html";
            }
        });

    });

});

