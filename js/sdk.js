const SDK = {
    serverURL: "https://localhost:8443/api",
    request: (options, cb) => {

        let token = {"AUTHORIZATION": localStorage.getItem("token")}

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },

    Users: {

        findAll: (cb) => {
            SDK.request(
                {method: "GET", url: "/users"});
        },
        current: () => {
            return localStorage.getItem("user_id");
        },
        logOut: () => {
            SDK.localStorage.remove("token");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("user");
            window.location.href = "login.html";
        },
        login: (email, password, cb) => {
            SDK.request({
                data: {
                    email: email,
                    password: password
                },
                url: "/auth",
                method: "POST"



            }, (err, data) => {

                //On login-error
                if (err) return cb(err);

// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
                let token = data;

                var base64Url = token.split('.')[0];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                console.log(JSON.parse(window.atob(base64)));

                localStorage.setItem("user_id", JSON.parse(window.atob(base64)).kid);
                localStorage.setItem("token", data);

                cb(null, data);



            });
        },
        createUser: (password, firstname, lastname, email, description, gender, major, semester, cb) => {
            SDK.request({
                data: {
                    password: password,
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    description: description,
                    gender: gender,
                    major: major,
                    semester: semester


                },
                url: "/users",
                method: "POST"

            }, (err, data) => {

                // createUser-error
                if (err) return cb(err);


                cb(null, data);
            });
        },
        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentUser = SDK.Users.current();
                if (currentUser) {
                    $(".navbar-right").html(`
            <li><a href="home-page.html">Startside</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
          `);
                }
                $("#logout-link").click(() => SDK.Users.logOut());
                cb && cb();
            });
        }
    },

    Events: {

        createEvent: (owner_id, title, startDate, endDate, description, data, cb,) => {
            SDK.request({
                data: {
                    owner_id: owner_id,
                    title: title,
                    startDate: startDate,
                    endDate: endDate,
                    description: description
                },
                url: "/events",
                method: "POST",
                headers: {
                    Authorization: "Bearer" + SDK.Storage.load("token")
                }
            }, cb)
        }
    },


    Storage: {
        prefix: "CafeNexusSDK",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    }

};


