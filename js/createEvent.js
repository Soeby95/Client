$(document).ready(() => {

    SDK.Users.loadNav();

    // Variablerne til at oprette et event bliver her specificeret, så de passer til API'ets endpoint

    $("#createEvent-button").click(() => {



        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputDescription").val();
        const owner_id = SDK.Users.current();

        SDK.Events.createEvent(owner_id, title, startDate, endDate, description, (err, data) => {

            console.log(err,data);


            window.location.href = "events.html";

        });

    });

});