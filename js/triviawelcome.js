let name = localStorage.getItem("name");
document.getElementById("name").innerHTML = name;

$(".categories").find("button").click(function () {

    $(".categories").find("button").not(this).addClass("animate__animated").addClass("animate__bounceOutLeft");
    btn_this = this;
    
    setTimeout(function () { 
        $(".categories").find("button").not(btn_this).addClass("hide"); 
    }, 1000)

    chosenCategory = this.name;
    console.log(chosenCategory);
    localStorage.setItem("category", chosenCategory)
});

$(".difficulty").find("button").click(function () {
    chosenDifficulty = this.name;
    console.log(chosenDifficulty);
    localStorage.setItem("difficulty", chosenDifficulty)
});

$(".amount").find("button").click(function () {
    amount = this.name;
    console.log(amount);
    localStorage.setItem("amount", amount)
});


$(".amount").addClass("animate__bounceInRight");
$(".difficulty").addClass("animate__bounceInRight");

// $(".type").find("button").click(function(){
//     chosenType = this.name;
//     console.log(chosenType);
//     localStorage.setItem("type",chosenType)
// });

$(".btn-quiz").click(function () {
    window.location.href = "../includes/trivia.html";
});