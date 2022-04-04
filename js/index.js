$("form").submit(function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value;

    localStorage.setItem("name", name);

    window.location.href = "../includes/triviawelcome.html";


});

