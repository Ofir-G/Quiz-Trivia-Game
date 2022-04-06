// localStorage.clear();
const items = { ...localStorage };
console.log(items);

$("form").submit(function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value;

    if (localStorage.getItem("users") === null) {
        local = {
            "usersNum": 1,
            "users":
                [
                    {
                        "name": name.toLowerCase(),
                        "highScore": 0
                    }
                ]
        }

        console.log(local);
        console.log(local.users[0].name);

        localStorage.setItem("users", JSON.stringify(local));
        localStorage.setItem("currentUser", name.toLowerCase);

        const items = { ...localStorage };
        console.log(items);
    }

    else {

        let local = JSON.parse(localStorage.getItem("users"));

        local.users.forEach(user => {
            if (user.name == name.toLowerCase()) {
                localStorage.setItem("currentUser", name.toLowerCase());

            }
            else {
                local.usersNum += 1;

                usersnum = local.usersNum;

                console.log(usersnum);

                local.users[usersnum - 1] = { "name": name.toLowerCase(), "highScore": 0 }

                console.log(local);

                localStorage.setItem("users", JSON.stringify(local));

                localStorage.setItem("currentUser", name.toLowerCase());
            }
        });

    }

    window.location.href = "../includes/triviawelcome.html";

});