local = JSON.parse(localStorage.getItem("users"));

users = [...local.users];

highscoresOrdered = users.sort(function (a, b) {
    return b.highscore - a.highscore;
});

let highscoresHTML = $(".highscore");

highscoresHTML.each((index, div) => {

    if (local.users[index] != null) {

        div.querySelector(".name").innerHTML = capitalizeFirstLetter(highscoresOrdered[index].name);
        div.querySelector(".score").innerHTML = highscoresOrdered[index].highscore;
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(".btn-menu").click(function(){
    window.location.href = "homepage.html";
});