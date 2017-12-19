$(document).ready(() => {

    // Variablerne til at logge ind bliver her specificeret, så de passer til API'et

    $("#login-button").click(() => {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        SDK.Users.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Fejl")
            } else {
                window.location.href = "home-page.html";
            }
        });

    });

});

