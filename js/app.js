console.log("js added !");
showNotes();
// when user add note updating the local sorage
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");

    if (addTxt.value.length == 0) {
        alert("enter somting");
    }
    else {

        // getting any exisiting notes stored in local sorage
        let notes = localStorage.getItem("notes");

        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: addTitle.value,
            txt: addTxt.value,
        }

        // updating localStorage 
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = ""; //clearing the text area after updation 
        addTitle.value = ""; //clearing the title area after updation 
        console.log(notesObj)
        showNotes();
    }
})

// this function will show any notes that are exesting in local sorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-3 mx-3 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title" id="${index}">  ${element.title}</h5>
                    <p class="card-text">${element.txt}</p>
                    <button class="btn btn-primary" onclick="deleteNote(this.id)" id="${index}">Delete</a>
               
                 </div>
            </div>`;
    });

    let noteEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteEle.innerHTML = html;
    }
    else {
        noteEle.innerHTML = `nothing to show ..Add some Notes `;
    }
}

// function to delet notes
function deleteNote(index) {
    console.log("deleting ", index);
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1); //removing note rom the obj
    localStorage.setItem("notes", JSON.stringify(notesObj)); // updating local sorage
    showNotes();//updating window to remove deleted notes
}

// implementing Search function 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    console.log("searching ");

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }


    })
})