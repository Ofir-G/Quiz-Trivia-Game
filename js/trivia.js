let question = document.getElementById("question")
let choices = $(".choice");
let amount = localStorage.getItem("amount");
let category = localStorage.getItem("category");
let qNumber = 0;
let score = 0;
let userName = capitalizeFirstLetter(localStorage.getItem("currentUser"));
let seconds = 30;
let width = 100
let correctCounter = 0;
let questions = [];
let url = "https://opentdb.com/api.php?";

// Tooltip activate
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// modals
let endModal = new bootstrap.Modal(document.getElementById('end-menu'));
let sureModal = new bootstrap.Modal(document.getElementById('sure-modal'));

startGame();

function startGame() {

    if (amount == "random") {
        amount = Math.floor(Math.random() * 50) + 1;
    }

    url += `amount=${amount}`;

    if (category != "all") {
        url += `&category=${category}`;
    }

    $(".maxQ").html(amount);
    $(".score").html(score);
    $(".player").html(userName);
}

function endGame() {
    stopTimer();
    updateUserInfo();
    modal();
}

console.log(url)

fetch(url)
    .then(res => {
        return res.json();
    })

    .then(loadedQuestions => {
        console.log(loadedQuestions.results);

        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                //just questions
                question: loadedQuestion.question
            };

            //just incorrect answers
            const answerChoices = [...loadedQuestion.incorrect_answers];

            //random number from 1 to 3
            random = Math.floor(Math.random() * 3) + 1;

            formattedQuestion.answer = loadedQuestion.correct_answer;

            //add to answers the correct answer at random index
            answerChoices.splice(random - 1, 0, loadedQuestion.correct_answer);

            formattedQuestion["choices"] = answerChoices;
            return formattedQuestion;
        });

        console.log(questions);
        $(".loadin").addClass("hide");
        $(".game").removeClass("hide");
        getNewQuestion();
    })

    .catch(err => {
        console.error(err);
    });

getNewQuestion = () => {

    if (qNumber == amount) {
        endGame();
    }
    else {
        $(".currentQ").html(qNumber + 1);

        console.log(questions);

        $(".choice").removeClass("correct").removeClass("incorrect").removeClass("animate__headShake");

        question.innerHTML = questions[qNumber].question;

        if (questions[qNumber].choices.length == 4) {
            $(".btn-last-2").find("button").removeClass("hide");
        }
        else {
            $(".btn-last-2").find("button").addClass("hide");
        }

        questions[qNumber].choices.forEach((choice, index) => {
            choices[index].innerHTML = choice;

        });

        $(".choice").removeClass("disabled");
        $(".choice").attr("disabled", false);
        $('.choice').addClass("choice-hover");
        $(".gameQ").removeClass("animate__bounceOutLeft");
        $(".gameQ").addClass("animate__bounceInRight");
        timeReset();
    }
};


$('.choice').click(function () {

    $(".choice").attr("disabled", true);

    stopTimer();
    if (this.innerHTML == questions[qNumber].answer) {

        correctAnswer(this);
    }

    else {
        incorrectAnswer(this);

    }
})


function correctAnswer(btn) {

    correctCounter++;
    console.log(btn);
    btn.classList.remove("choice-hover");
    btn.classList.add("correct");
    correctPlay();

    $(".yes").removeClass("hide");

    setTimeout(function () {

        $(".gameQ").addClass("animate__bounceOutLeft");
        $(".yes").addClass("hide");

    }, 500)

    setTimeout(function () {
        scoreUpdate();
        qNumber++;
        getNewQuestion();
    }, 1000)

}

function incorrectAnswer(btn) {

    btn.classList.remove("choice-hover");
    btn.classList.add("incorrect");
    btn.classList.add("animate__headShake");
    incorrectPlay();


    setTimeout(function () {
        findAnswer()
    }, 1000)

    setTimeout(function () {
        $(".gameQ").addClass("animate__bounceOutLeft");
    }, 2000)

    setTimeout(function () {
        qNumber++;
        getNewQuestion();
    }, 2500)

}

function findAnswer() {
    let answerChoice;
    choice = $.each(choices, function (index, choice) {

        if (choice.innerHTML == questions[qNumber].answer) {

            choice.classList.add("correct");
            answerChoice = choice;
        }
    });

    return answerChoice;
}


scoreUpdate = () => {
    score += 10;
    $(".score").html(score);

}

function timerFunc() {
    width -= 3.33;
    seconds -= 1;
    $(".progress-bar").css("width", width + "%");
    $(".seconds").html(seconds);

    if (seconds <= 20) {
        $(".progress-bar").removeClass("bg-success").addClass("timer-warning");
    }
    if (seconds <= 10) {
        $(".progress-bar").removeClass("timer-warning").addClass("timer-danger");
    }
    if (seconds == 0) {
        console.log("STOP");
        stopTimer();
        console.log(qNumber);
        qNumber++;
        console.log(qNumber);
        $(".gameQ").addClass("animate__bounceOutLeft");
        setTimeout(function () {
            getNewQuestion();
        }, 500)
    }
}

function stopTimer() {
    clearInterval(timer);
}

function timeReset(secondsremain) {
    seconds = 30;
    width = 100;
    if (secondsremain) {
        seconds = secondsremain;
        width = 3.33 * seconds;
    }
    $(".progress-bar").removeClass("timer-danger").removeClass("timer-warning").addClass("bg-success");
    $(".progress-bar").css("width", width + "%");
    $(".seconds").html(seconds);
    timer = setInterval(timerFunc, 1000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(".menu").click(function () {
    window.location.href = "homepage.html";
});

$(".play-again").click(function () {
    window.location.reload();
});

$(".fifty").click(function () {
    let num = 0;
    $(".choice").each(function (index, choice) {

        if ((choice.innerHTML != questions[qNumber].answer) && num <= 1) {

            num++;
            choice.classList.add("disabled");
            choice.disabled = true;
        }
    });

    $(".fifty").addClass("animate__tada").addClass("disable-event");

    setTimeout(() => {

        $(".fifty").find(".icon-back").addClass("disabled-icon").removeClass("icon-back");
        $(".fifty").find(".icon-color").removeClass("icon-color").addClass("disabled-icon-inside");
    }, 800);
});

$(".show-answer").click(function () {
    stopTimer();
    correctAnswer(findAnswer());
    $(".show-answer").addClass("animate__tada").addClass("disable-event");

    setTimeout(() => {

        $(".show-answer").find(".icon-back").addClass("disabled-icon").removeClass("icon-back");
        $(".show-answer").find(".icon-color").removeClass("icon-color").addClass("disabled-icon-inside");
    }, 800);

});

$(".extra-time").click(function () {
    stopTimer();
    seconds += 10;
    if (seconds > 30) {
        seconds = 30;
    }

    timeReset(seconds);

    $(".extra-time").addClass("animate__tada").addClass("disable-event");

    setTimeout(() => {
        $(".extra-time").find(".icon-back").addClass("disabled-icon").removeClass("icon-back");
        $(".extra-time").find(".icon-color").removeClass("icon-color").addClass("disabled-icon-inside");
    }, 800);

});

function updateUserInfo() {
    let local = JSON.parse(localStorage.getItem("users"));

    local.users.forEach(user => {
        if (user.name == userName.toLowerCase()) {
            if (score > user.highscore) {
                user.highscore = score;
            }
            user.allTimeScore += score;
            user.correctAnswers += correctCounter;
            user.gamesNum += 1;
        }
    });

    localStorage.setItem("users", JSON.stringify(local));
}

function updateCorrectAnswers() {

    let local = JSON.parse(localStorage.getItem("users"));

    local.users.forEach(user => {
        if (user.name == userName.toLowerCase()) {
            if (score > user.highscore) {
                user.highscore = score;
                user.allTimeScore = score;
            }
        }
    });

    localStorage.setItem("users", JSON.stringify(local));
}

function modal() {

    percentage = (correctCounter / amount) * 100;

    console.log(percentage);

    if (percentage < 50) {
        $(".congratz").html("You'll do better next time &#128526;");
    }
    if (percentage >= 50 && percentage < 80) {
        $(".congratz").html("Nice Job! &#128512;");
    }

    if (percentage > 80) {
        $(".congratz").html("Amazing Job! &#128525;");
    }

    $(".score").html(score);
    $('.correctNum').html(correctCounter);
    endModal.show();
}


function correctPlay() {
    correctAudio = document.getElementById("correct-audio");
    correctAudio.play();
}

function incorrectPlay() {
    incorrectAudio = document.getElementById("incorrect-audio");
    incorrectAudio.play();
}

$(".turnoff").click(function () {
    console.log("in turnoff");
    sureModal.show();
});

$(".sure-yes").click(function () {
    console.log("in yes");
    endGame();
});
