$(document).ready(() => {

    SDK.Users.loadNav();

    $("#createEvent-button").click(() => {

        const owner_id = $("#inputOwner_id").val();
        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputDescription").val();

        SDK.Events.createEvent(owner_id, title, startDate, endDate, description, (err, data) => {
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