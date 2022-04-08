local = JSON.parse(localStorage.getItem("users"));

highscores = local.users.map(user => {
    return user.highScore;

});

highscores = highscores.sort(function (a, b) { return a - b; });
highscores = highscores.slice(Math.max(highscores.length - 5, 0))

let highscoresHTML = $(".highscore");

local.users.forEach(user => {

    if (user.highScore <= highscores[highscores.length - 1]) {

    }

});

highscoresHTML.each((index, div) => {

    if (local.users[index] != null) {

        if (local.users[index].highScore <= highscores[highscores.length - 1]) {

            div.querySelector(".name").innerHTML = local.users[index].name;
            div.querySelector(".score").innerHTML = local.users[index].highScore;
        }
    }

});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
