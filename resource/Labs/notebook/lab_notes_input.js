//Boiler plate
var noteTitle = document.getElementById("noteTitle");
var notes = document.getElementById("notes");
var clear = document.getElementById("clearButton");

//On input, the Title and Notes are saved seperately into localstorage
notes.oninput = function(){
  setValue();
}

//When user comes back, onload it will check if there is anything in localstorage, if not then it will just be black
window.onload = function(){
  noteTitle.value = localStorage.getItem("title");
  notes.value = localStorage.getItem("notes");
}

//Whether or not it has text, button will clear the text in the boxes and since it counts as input it will be saved.
clear.onclick = function(){
  noteTitle.value = "";
  notes.value = "";
  setValue();
}

/*function setValue()
Since it is being called multiple times, why not just make it a function?*/
function setValue(){
  localStorage.setItem("title",noteTitle.value);
  localStorage.setItem("notes",notes.value);
}