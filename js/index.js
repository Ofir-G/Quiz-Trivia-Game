//delete
// localStorage.clear();
const items = { ...localStorage };
console.log(items);

$("form").submit(function (e) {

    e.preventDefault();

    let userName = document.getElementById("name").value;
    userName = userName.toLowerCase();

    if (localStorage.getItem("users") === null) {
        local = {
            "usersNum": 1,
            "users":
                [
                    {
                        "name": userName,
                        "highscore": 0,
                        "allTimeScore": 0
                    }
                ]
        }

        console.log(local);
        console.log(local.users[0].name);

        localStorage.setItem("users", JSON.stringify(local));
        localStorage.setItem("currentUser", userName);

        //delete
        const items = { ...localStorage };
        console.log(items);
    }

    else {

        let local = JSON.parse(localStorage.getItem("users"));

        local.users.forEach(user => {
            if (user.name == userName) {
                localStorage.setItem("currentUser", userName);
            }
            else {
                local.usersNum += 1;

                usersnum = local.usersNum;

                console.log(usersnum);

                local.users[usersnum - 1] = { "name": userName, "highScore": 0 }

                console.log(local);

                localStorage.setItem("users", JSON.stringify(local));
                localStorage.setItem("currentUser", userName);
            }
        });

    }
    window.location.href = "includes/triviawelcome.html";
});