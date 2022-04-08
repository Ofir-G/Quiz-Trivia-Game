$(".choice").click(function () {
    if (this.name == "play") {
        window.location.href = "../includes/triviawelcome.html"
    }
    if (this.name == "highscores") {
        window.location.href = "../includes/highscores.html";
    }
    if (this.name == "profile") {
        console.log("yet");
    }
});