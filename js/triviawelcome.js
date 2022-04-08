let userName = capitalizeFirstLetter(localStorage.getItem("currentUser"));

document.getElementById("name").innerHTML = userName;

$(".categories").find("button").click(function () {

    this.classList.add("btn-choice-after");

    $(".categories").find("button").not(this).addClass("animate__animated").addClass("animate__bounceOutLeft");

    btn_this = this;

    setTimeout(function () {
        btn_this.classList.add("animate__animated");
        btn_this.classList.add("animate__faster");
        btn_this.classList.add("animate__fadeOutUp");
    }, 1000)

    setTimeout(function () {
        btn_this.classList.remove("animate__fadeOutUp");
        $(".categories").find("button").not(btn_this).addClass("hide");
        btn_this.classList.add("hide");
    }, 1200)

    setTimeout(function () {
        btn_this.classList.add("animate__fadeInDown");
        btn_this.classList.remove("hide");
    }, 1300)

    setTimeout(function () {
        $(".categories").find("button").not(btn_this).addClass("hide");
        $(".amount").removeClass("hide").addClass("animate__bounceInRight");
    }, 1400)

    chosenCategory = this.name;
    console.log(chosenCategory);
    localStorage.setItem("category", chosenCategory)


});

$(".amount").find("button").click(function () {

    this.classList.add("btn-choice-after");

    $(".amount").find("button").not(this).addClass("animate__animated").addClass("animate__bounceOutLeft");
    btn_this = this;

    setTimeout(function () {
    }, 1000)

    setTimeout(function () {
        btn_this.classList.add("animate__animated");
        btn_this.classList.add("animate__faster");
        btn_this.classList.add("animate__fadeOutUp");
    }, 1000)

    setTimeout(function () {
        btn_this.classList.remove("animate__fadeOutUp");
        $(".amount").find("button").not(btn_this).addClass("hide");
        btn_this.classList.add("hide");
    }, 1200)

    setTimeout(function () {
        btn_this.classList.add("animate__fadeInDown");
        btn_this.classList.remove("hide");
    }, 1300)

    setTimeout(function () {

        $(".btn-quiz").removeClass("hide").addClass("animate__animated").addClass("animate__bounceIn");
    }, 1400)

    chosenAmount = this.name;
    console.log(chosenAmount);
    localStorage.setItem("amount", chosenAmount)

});


$(".change-user").click(function () {
    localStorage.removeItem("currentUser");
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




// $(".difficulty").addClass("animate__bounceInRight");

// $(".type").find("button").click(function(){
//     chosenType = this.name;
//     console.log(chosenType);
//     localStorage.setItem("type",chosenType)
// });

$(".btn-quiz").click(function () {
    window.location.href = "trivia.html";
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
