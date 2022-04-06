const question = document.getElementById("question")
const choices = $(".choice");
const MAXquestions = localStorage.getItem("amount");
let qNumber = 0;
let score = 0;
let answerChoiceIndex;
let name = localStorage.getItem("name");
let seconds = 30;
let width = 100

// START
// $(".player").html(name);

let questions = [];
// console.log(localStorage.getItem('name'));

// $('p').html(localStorage.getItem('name'));

let category = localStorage.getItem("category");
let difficulty = localStorage.getItem("difficulty");
// let type = localStorage.getItem("type");
let amount = localStorage.getItem("amount");
// console.log(amount);
// // console.log(type);
// console.log(difficulty);
// console.log(category);

console.log(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`)

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


    $(".gameQ").removeClass("animate__bounceOutLeft");
    $(".gameQ").addClass("animate__bounceInRight");
    timeReset();
};


$('.choice').click(function () {
    stopTimer();
    if (this.innerHTML == decodeHtml(questions[qNumber].answer)) {
        this.classList.add("correct");

        setTimeout(function () {

            $(".gameQ").addClass("animate__bounceOutLeft");
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

    else {
        this.classList.add("incorrect");
        this.classList.add("animate__headShake");
        stopTimer();

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
})

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

startGame = () => {
    $(".score").html(score);
}

function timerFunc() {
    width -= 3.33;
    seconds -= 1;
    $(".progress-bar").css("width", width + "%");
    $(".progress-bar").html('<i style="margin-right: 5px;" class="fa-regular fa-clock"></i>' + seconds);

    if (seconds <= 20) {
        $(".progress-bar").removeClass("bg-success").addClass("bg-warning");
    }
    if (seconds <= 10) {
        $(".progress-bar").removeClass("bg-warning").addClass("bg-danger");
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
    $(".progress-bar").removeClass("bg-danger").removeClass("bg-warning").addClass("bg-success");
    $(".progress-bar").css("width", width + "%");
    $(".progress-bar").html('<i style="margin-right: 5px;" class="fa-regular fa-clock"></i>' + seconds);
    timer = setInterval(timerFunc, 1000);

}