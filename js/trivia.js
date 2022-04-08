const question = document.getElementById("question")
const choices = $(".choice");
const MAXquestions = localStorage.getItem("amount");
let qNumber = 0;
let score = 0;
let answerChoiceIndex;
let name = capitalizeFirstLetter(localStorage.getItem("currentUser"));
let seconds = 30;
let width = 100
let correctCounter = 0;

startGame();

function startGame() {
    $(".score").html(score);
    $(".player").html(name);
}

let questions = [];

let category = localStorage.getItem("category");
let amount = localStorage.getItem("amount");

console.log(`https://opentdb.com/api.php?amount=${amount}&category=${category}`)

fetch(`https://opentdb.com/api.php?amount=10`)
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

    $(".currentQ").html(qNumber + 1);
    $(".maxQ").html(MAXquestions);
    
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

    $(".choice").attr("disabled", false);
    $('.choice').addClass("button-28-hover");
    $(".gameQ").removeClass("animate__bounceOutLeft");
    $(".gameQ").addClass("animate__bounceInRight");
    timeReset();
};


$('.choice').click(function () {

    $(".choice").attr("disabled", true);

    stopTimer();
    if (this.innerHTML == decodeHtml(questions[qNumber].answer)) {

        correctAnswer(this);
    }

    else {
        incorrectAnswer(this);

    }
})


function correctAnswer(btn) {

    correctCounter++;
    btn.classList.remove("button-28-hover");
    btn.classList.add("correct");

    $(".yes").removeClass("hide");

    setTimeout(function () {

        $(".gameQ").addClass("animate__bounceOutLeft");
        $(".yes").addClass("hide");

    }, 500)

    setTimeout(function () {
        scoreUpdate();

        if (qNumber == MAXquestions) {
            endgame()
        }
        else {
            qNumber++;
            getNewQuestion();
        }

    }, 1000)

}

function incorrectAnswer(btn) {

    btn.classList.remove("button-28-hover");
    btn.classList.add("incorrect");
    btn.classList.add("animate__headShake");

    setTimeout(function () {
        findAnswer()
    }, 1000)

    setTimeout(function () {
        $(".gameQ").addClass("animate__bounceOutLeft");
    }, 2000)

    setTimeout(function () {
        if (qNumber == MAXquestions) {
            endgame()
        }
        else {
            qNumber++;
            getNewQuestion();
        }
    }, 2500)

}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

findAnswer = () => {

    $.each(choices, function (index, choice) {

        if (choice.innerHTML == decodeHtml(questions[qNumber].answer)) {
            choice.classList.add("correct");
        }
    });
}


scoreUpdate = () => {
    score += 10;
    $(".score").html(score);

}

function timerFunc() {
    width -= 3.33;
    seconds -= 1;
    $(".progress-bar").css("width", width + "%");
    $(".progress-bar").html('<i style="margin-right: 5px;" class="fa-regular fa-clock"></i>' + seconds);

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

function timeReset() {
    seconds = 30;
    width = 100;
    $(".progress-bar").removeClass("timer-danger").removeClass("timer-warning").addClass("bg-success");
    $(".progress-bar").css("width", width + "%");
    $(".progress-bar").html('<i style="margin-right: 5px;" class="fa-regular fa-clock"></i>' + seconds);
    timer = setInterval(timerFunc, 1000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// $('.correctNum').html(correctCounter);
// var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))

// myModal.show();