let local = JSON.parse(localStorage.getItem("users"));
let users = local.users;
let currentUser = localStorage.getItem("currentUser");
let userIndex;

users.forEach(function (user, index) {
    if (user.name == currentUser) {
        userIndex = index;
    }
});

console.log(users);

$(".highest").html(users[userIndex].highscore);
$(".games").html(users[userIndex].gamesNum);
$(".correct").html(users[userIndex].correctAnswers);

$(".trivia").click(function(){
    window.location.href = "triviawelcome.html";
});

$(".highscores").click(function(){
    window.location.href = "leaderboard.html";
});

$(".logoff-btn").click(function(){
    localStorage.removeItem("currentUser");
    window.location.href="../index.html";
});