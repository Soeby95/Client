$(document).ready(() => {

    // Variablerne til at se events bliver her specificeret, så de passer til API'et

    SDK.Users.loadNav();

    const $getEvents = $("#getEvents");

    SDK.Events.getEvents((err, events) => {
        events.forEach((event) => {

            $getEvents.append(`
            <tr>
            <td>${event.title}</td>
            <td>${event.startDate}</td>
            <td>${event.endDate}</td>
            <td>${event.description}</td>
            </tr>
                `);
        });
    });

});