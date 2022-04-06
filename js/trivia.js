const question = document.getElementById("question")
const choices = $(".choice");
let qNumber = 0;
let score = 0;
let answerChoiceIndex;

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

};


$('.choice').click(function () {
    if (this.innerHTML == decodeHtml(questions[qNumber].answer)) {
        this.classList.add("correct");
        scoreUpdate();
        
        setTimeout(function () {
            qNumber++;
            getNewQuestion();
        }, 2000)

    }
    
    else {
        this.classList.add("incorrect");
        this.classList.add("animate__headShake");
        findAnswer();

        setTimeout(function () {
            qNumber++;
            getNewQuestion();
        }, 1000)

    }
})

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

findAnswer = () =>{

    $.each(choices, function(index, choice) {
        console.log(choice)
        console.log(choice.innerHTML)
        console.log(questions[qNumber].answer)

        if (choice.innerHTML == decodeHtml(questions[qNumber].answer)){
            choice.classList.add("correct");
        } 
    });
}


scoreUpdate = () => {
    score +=10;

}