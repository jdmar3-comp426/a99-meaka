function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

var red_color = getRandomIntInclusive(0, 255); //color values to guess, color should be displayed on screen
var green_color = getRandomIntInclusive(0, 255);
var blue_color = getRandomIntInclusive(0, 255);

var back_color = 'rgb(' + red_color + ',' + green_color + ',' + blue_color + ')';
document.body.style.backgroundColor = back_color;
document.getElementById('fortesting').innerHTML = back_color;

var red;
var green;
var blue;

function myColour() {

    // Get the value of red color
    red = document.getElementById('red').value;

    // Get the value of green color
    green = document.getElementById('green').value;

    // Get the value of blue color
    blue = document.getElementById('blue').value;

    // rgb() function is used to create the color
    // from red, green and blue values
    var colour = 'rgb(' + red + ',' + green + ',' + blue + ')';

    // Change background colour with the 
    // color obtained by rgb function
    //document.body.style.guess.backgroundColor = colour;
    document.getElementById('guess').style.backgroundColor = colour;

    // Set the obtained rgb() colour code in the
    // input text field having id=box  
    document.getElementById('box').value = colour;

}

let guess_counter = 0;  //counter of how many tries to guess the color correctlt

function _game() {
    let red_guess = red;  //variables to hold user's guesses
    let green_guess = green;    //need to make this something the user inputs
    let blue_guess = blue;

    let red_correct = false;    //keeps track of if the guesses are correct
    let green_correct = false;
    let blue_correct = false;

    var red_message = "";
    var green_message = "";
    var blue_message = "";

    //Guess the red color
    if (red_guess > 255 || red_guess < 0) {
        red_message = "Red guess is out of range please input a number between 0 and 255.";
    } else if (red_guess == red_color) {
        red_message = "You guessed red correctly!";
        red_correct = true;
    } else if (red_guess > red_color) {
        red_message = "Too high, the red value is lower than your guess.";
    } else {
        red_message = "Too low, the red value is higher than your guess.";
    }

    //print("Input green guess (0-255):"); //Guess the green color
    if (green_guess > 255 || green_guess < 0) {
        green_message = "Green guess is out of range please input a number between 0 and 255.";
    } else if (green_guess == green_color) {
        green_message = "You guessed green correctly!";
        green_correct = true;
    } else if (green_guess > green_color) {
        green_message = "Too high, the green value is lower than your guess.";
    } else {
        green_message = "Too low, the green value is higher than your guess.";
    }

    //print("Input blue guess (0-255):"); //Guess the blue color
    if (blue_guess > 255 || blue_guess < 0) {
        blue_message = "Blue guess is out of range please input a number between 0 and 255.";
    } else if (blue_guess == blue_color) {
        blue_message = "You guessed blue correctly!";
        blue_correct = true;
    } else if (blue_guess > blue_color) {
        blue_message = "Too high, the blue value is lower than your guess.";
    } else {
        blue_message = "Too low, the blue value is higher than your guess.";
    }

    document.getElementById('red_mess').innerHTML = red_message;
    document.getElementById('green_mess').innerHTML = green_message;
    document.getElementById('blue_mess').innerHTML = blue_message;

    var winner = "Keep Guessing!";
    if (red_correct & green_correct & blue_correct) {
        if (guess_counter == 1) {
            winner = "Congratulations! You guessed the color correctly in " + guess_counter + " guess!";
        } else {
            winner = "Congratulations! You guessed the color correctly in " + guess_counter + " guesses!";
        }
    }

    document.getElementById('winner').innerHTML = winner;

    if (!red_correct || !green_correct || !blue_correct) {
        guess_counter++;
    }
    document.getElementById('counter').innerHTML = "Guesses: " + guess_counter;
    
}

// On changing red range slider myColour()
// function is called  
document.getElementById('red')
    .addEventListener('input', myColour);

// On changing green range slider myColour()
// function is called
document.getElementById('green')
    .addEventListener('input', myColour);

// On changing blue range slider myColour()
// function is called
document.getElementById('blue')
    .addEventListener('input', myColour);