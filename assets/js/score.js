bodyEl= document.querySelector(".container");
startButtonEl = document.getElementById ("start-btn");
viewButtonEl = document.getElementById("view-btn");
saveButtonEl= document.getElementById("save-btn")
formEl = document.querySelector(".form-input")


function save() {
    var newData = document.getElementById("name").value; 

    if (localStorage.getItem("users") == null ) {
        localStorage.setItem("users", "[]");
    }

    var oldData = JSON.parse(localStorage.getItem("users"));
    oldData.push(newData);

    
    localStorage.setItem("users",JSON.stringify(oldData));
}

viewButtonEl.addEventListener("click", function () {
    bodyEl.classList.add("content")
})

