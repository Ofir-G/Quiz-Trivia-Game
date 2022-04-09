local = JSON.parse(localStorage.getItem("users"));
console.log(local);

users = [...local.users];

highscoresOrdered = users.sort(function (a, b) {
    return b.highscore - a.highscore;
});

console.log(highscoresOrdered);

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

var json = '{"3":"Apple", "2":"Banana", "1":"Orange"}';
