const SDK = {
    serverURL: "https://localhost:8443/api",
    request: (options, cb) => {

        // Let token sørger for at man får en token key med når man logger ind som bliver gemt i local storage

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

    // User metoden i SDK håndterer alt logik der har med brugeren at gøre.
    // Metoderne der benytte i Users er POST og GET metoder, det er også i SDK filen API'ets endpoint specificeres.

    Users: {

        findAll: (cb) => {
            SDK.request(
                {
                    method: "GET",
                    url: "/users",
                },
                cb);
        },

        current: () => {
            return localStorage.getItem("user_id");
        },
        logOut: (cb) => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("user_id");
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
// Nedestående kode dekrypter en token  på den aktive bruger, således user_id kan sendes med når der laves en post

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

            }, cb)


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



    // Events metoden i SDK håndterer alt logik der har med events at gøre.
    // Metoderne der benytte i Users er POST og GET metoder, det er også i SDK filen API'ets endpoint specificeres.
    Events: {

        createEvent: (owner_id, title, startDate, endDate, description, data, cb) => {
            SDK.request({
                data: {
                    title: title,
                    owner_id: owner_id,
                    startDate: startDate,
                    endDate: endDate,
                    description: description
                },
                url: "/events",
                method: "POST",

            },
                cb);
        },

        getEvents: (cb) => {
            SDK.request(
                {
                    method: "GET",
                    url: "/events",
                },
                cb);
        }
    },

     // Post metoden i SDK håndterer alt logik der har med brugeren at gøre.
     // Metoderne der benytte i Users er POST og GET metoder, det er også i SDK filen API'ets endpoint specificeres.

    Posts: {
        createPost: (owner, content, cb) => {

            SDK.request({
                    data: {
                        owner: owner,
                        content: content
                    },
                    url: "/posts",
                    method: "POST",
                },
                cb);
        },

        getPosts: (cb) => {
            SDK.request(
                {
                url: "/posts",
                method: "GET",
            },
                cb);

        }
    },

        // Storage metoden sørger for at fjerne den gemte token key fra local storage, når brugeren logger ud
    Storage: {
        prefix: "",
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
    },

};


