const question = document.getElementById("question")
const choices = document.getElementsByTagName("h3")
let qNumber = 0;
let score = 0;

// let allQuestions;

// fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
//     .then(res => {
//         return res.json();
//     })

//     .then(data => {

//         allQuestions = data.results;

//         console.log(allQuestions);


//     })
//     .catch(err => {
//         console.error(err);
//     });


//     getNewQuestion = () => {

//     }

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
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


$('h3').click(function(){
    if (this.innerHTML == decodeHtml(questions[qNumber].answer)) {
        this.style.color = 'green';
        setTimeout(function(){
            qNumber++;
            getNewQuestion();
        },3000)

    }
    else{
        this.style.color = 'red';

    }
})

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


// choices.addEventListener('click'), () => {
//     if (this.innerHTML == questions[qNumber].answer){
//         this.style.color='green';
//     }
// }

// choices.forEach(choice => {
//     choice.addEventListener('click', () => {
//         if (this.innerHTML == questions[qNumber].answer) {
//             this.style.color = 'green';
//         }
//     }
//     )
// });


//   $.ajax({
//     type: 'get',
//     url: 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple',
//     data: 'json',
//     success: function (response) {
//         console.log(response.results)
//         questions = loadedQuestions.results.map( loadedQuestion => {
//             const formattedQuestion = {
//               question: loadedQuestion.question
//             }
//         };
//     },
//     error: function () {
//         console.log("error");
//     }
// });