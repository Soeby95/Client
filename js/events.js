$(document).ready(() => {

    SDK.Users.loadNav();

    const $getEvents = $("#getEvents");

    SDK.Events.getEvents((err, events) => {
        events.forEach((event) => {

            $getEvents.append(`

    <div class="row">
            <div class="co-lg-8">
            <div class="page-header">
            <table>
            <tr>
            <td>${event.owner_id}</td>
            <td>${event.title}</td>
            <td>${event.startDate}</td>
            <td>${event.endDate}</td>
            <td>${event.description}</td>
         
            </tr>
            </table>
            <div id="getUsers"></div>
            </div>
        
                `
            );
        });
    });

});