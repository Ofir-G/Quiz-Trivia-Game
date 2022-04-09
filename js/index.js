if(localStorage.getItem("currentUser") != null){
    window.location.replace("includes/homepage.html");
}

let local = JSON.parse(localStorage.getItem("users"));
console.log(local);

$("form").submit(function (e) {

    e.preventDefault();

    let userFlag = 0;
    let userName = document.getElementById("name").value;
    userName = userName.toLowerCase();

    if (localStorage.getItem("users") === null) {
        userFlag = 1;

        local = {
            "usersNum": 1,
            "users":
                [
                    {
                        "name": userName,
                        "highscore": 0,
                        "correctAnswers":0,
                        "gamesNum": 0
                    }
                ]
        }

        localStorage.setItem("users", JSON.stringify(local));
        localStorage.setItem("currentUser", userName);

        //delete
        console.log(local);

    }

    else {

        let local = JSON.parse(localStorage.getItem("users"));

        local.users.forEach(user => {
            if (user.name == userName) {
                localStorage.setItem("currentUser", userName);
                userFlag = 1;
            }
        });
        console.log(local);
    }

    if (userFlag == 0) {
        local.usersNum += 1;

        usersnum = local.usersNum;

        local.users[usersnum - 1] = { "name": userName, "highscore": 0, "allTimeScore": 0 }

        console.log(local);

        localStorage.setItem("users", JSON.stringify(local));
        localStorage.setItem("currentUser", userName);
    }

    window.location.href = "includes/homepage.html";
});