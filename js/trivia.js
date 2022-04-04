const question = document.getElementById("question")
const choices = $(".choice");
let qNumber = 0;
let score = 0;

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

fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`)
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
        getNewQuestion();
    })

    .catch(err => {
        console.error(err);
    });

getNewQuestion = () => {

    console.log(questions);

    question.innerHTML = questions[qNumber].question;

    questions[qNumber].choices.forEach((choice, index) => {
        choices[index].innerHTML = choice;

    });

};

$('h3').click(function () {
    if (this.innerHTML == decodeHtml(questions[qNumber].answer)) {
        this.style.color = 'green';
        score += 10;

        setTimeout(function () {
            qNumber++;
            getNewQuestion();
        }, 2000)

    }
    else {
        this.style.color = 'red';

    }
})

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}