let name = localStorage.getItem("name");
document.getElementById("name").innerHTML = name;

$(".categories").find("button").click(function(){
    chosenCategory = this.name;
    console.log(chosenCategory);
    localStorage.setItem("category",chosenCategory)
});

$(".difficulty").find("button").click(function(){
    chosenDifficulty = this.name;
    console.log(chosenDifficulty);
    localStorage.setItem("difficulty",chosenDifficulty)
});

$(".amount").find("button").click(function(){
    amount = this.name;
    console.log(amount);
    localStorage.setItem("amount",amount)
});

// $(".type").find("button").click(function(){
//     chosenType = this.name;
//     console.log(chosenType);
//     localStorage.setItem("type",chosenType)
// });

$(".btn-quiz").click(function(){
    window.location.href = "../includes/trivia.html";
});