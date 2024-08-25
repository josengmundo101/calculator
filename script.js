const display = document.getElementById('display');

function appendToDisplay(input) {
    display.value += input; 
}

function clearDisplay () {
    display.value = "";
}

// function deleteDisplay () {
//     display.value.toString().slice(0, -1);
// }

function calculate () {
    display.value = eval(display.value);
}

