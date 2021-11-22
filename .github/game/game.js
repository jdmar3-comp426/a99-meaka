
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

let red_color = getRandomIntInclusive(0, 255); //color values to guess, color should be displayed on screen
let green_color = getRandomIntInclusive(0, 255);
let blue_color = getRandomIntInclusive(0, 255);

let red_guess = 0;  //variables to hold user's guesses
let green_guess = 0;    //need to make this something the user inputs
let blue_guess = 0;

let red_correct = false;    //keeps track of if the guesses are correct
let green_correct = false;
let blue_correct = false;

let guess_counter = 1;  //counter of how many tries to guess the color correctlt

while (!red_correct & !green_correct & !blue_correct) { //I think it would be better if the
                                                //guesses all submitted at once with like a check button
                                                //instead of one at a time
    print("Input red guess (0-255):"); //Guess the red color
    if (red_guess > 255 || red_guess < 0) {
        print("Guess out of range please input a number between 0 and 255.");
    } else if (red_guess == red_color) {
        print ("You guessed red correctly!");
        red_correct = true;
    } else if (red_guess > red_color) {
        print("Too high, the red value is lower than your guess."); 
    } else {
        print("Too low, the red value is higher than your guess.")
    }

    print("Input green guess (0-255):"); //Guess the green color
    if (green_guess > 255 || green_guess < 0) {
        print("Guess out of range please input a number between 0 and 255.");
    } else if (green_guess == green_color) {
        print ("You guessed green correctly!");
        green_correct = true;
    } else if (green_guess > green_color) {
        print("Too high, the green value is lower than your guess."); 
    } else {
        print("Too low, the green value is higher than your guess.")
    }

    print("Input blue guess (0-255):"); //Guess the blue color
    if (blue_guess > 255 || blue_guess < 0) {
        print("Guess out of range please input a number between 0 and 255.");
    } else if (blue_guess == blue_color) {
        print ("You guessed blue correctly!");
        blue_correct = true;
    } else if (blue_guess > blue_color) {
        print("Too high, the blue value is lower than your guess."); 
    } else {
        print("Too low, the blue value is higher than your guess.")
    }

    guess_counter++;
}

if (guess_counter == 1) {
    print("Congradulations! You guessed the color correctly in " + guess_counter + "guess!");
} else {
    print("Congradulations! You guessed the color correctly in " + guess_counter + "guesses!");
}