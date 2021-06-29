const restartButton = document.querySelector("#restartButton");
const startButton = document.querySelector("#startButton");
const guessInputField = document.querySelector("#guessInputField");
const previousAttemptsList = document.querySelector("#previousAttemptsList");
const RangeInputField = document.querySelector("#RangeInputField");
const instructionsPrompt = document.querySelector("#instructionsPrompt");
const lowOrHighMsg = document.querySelector("#lowOrHighMsg");
const guessAttemptsTrackerMsg = document.querySelector("#guessAttemptsTrackerMsg");


let guessAttemptsTotalCount = 0;
let guessedIntegersList = [];

//Checks if string contains only numbers
function isNumeric(value) {
return /^-?\d+$/.test(value);
}
function hasWhiteSpace(value) {
return /\s/g.test(value);
}

//Restarts the game
restartButton.addEventListener("click",() => {
    window.location.reload();
    RangeInputField.value = "";
    guessInputField.value = "";
})

function winnerMsg(){
    instructionsPrompt.innerHTML = ` <h3> Congratulations the random number was ${targetNumber}!</h3>`;
    lowOrHighMsg.innerHTML = ` <h3>You are correct!</h3>`;
    lowOrHighMsg.style.color = "white";
    lowOrHighMsg.style.backgroundColor = "forestgreen";
};

function firstGuessMsg(){
    instructionsPrompt.innerHTML = ` <h3> Your first guess was ${guessNumber}</h3>`;
    instructionsPrompt.style.color = "white"
};

function onlyNumbersMsg(){
    instructionsPrompt.innerHTML = ` <h3> Please enter a number, letters and symbols are not acceptable!</h3>`;
}

function toLowMsg(){
    lowOrHighMsg.innerHTML = ` <h3>TO LOW PLEASE TRY AGAIN!</h3>`;
    lowOrHighMsg.style.color = "rgb(224, 159, 18)";
};

function toHighMsg(){
    lowOrHighMsg.innerHTML = ` <h3>TO HIGH PLEASE TRY AGAIN!</h3>`;
    lowOrHighMsg.style.color = "rgb(155, 23, 50)";
}

function lastGuessMsg(){
    instructionsPrompt.innerHTML = ` <h3> Your last guess was ${guessNumber}</h3>`;
};
function attemptsMsgSingular(){
    guessAttemptsTrackerMsg.innerHTML = `<h3>You have made ${guessAttemptsTotalCount} attempt so far!</h3>`;
    guessAttemptsTrackerMsg.style.color = "white";
    guessAttemptsTrackerMsg.style.backgroundColor = "#66CD00";
}
function attemptsMsgPlural(){
    guessAttemptsTrackerMsg.innerHTML = `<h3>You have made ${guessAttemptsTotalCount} attempts so far!</h3>`;
    if(guessAttemptsTotalCount >= 5){
        guessAttemptsTrackerMsg.style.color = "white";
        guessAttemptsTrackerMsg.style.backgroundColor = "rgb(224, 159, 18)";
    }if(guessAttemptsTotalCount >= 15){
        guessAttemptsTrackerMsg.style.color = "white";
        guessAttemptsTrackerMsg.style.backgroundColor = "#c60000";
    }if(guessAttemptsTotalCount >= 30){
        guessAttemptsTrackerMsg.style.color = "white";
        guessAttemptsTrackerMsg.style.backgroundColor = "darkred";
    }if(guessAttemptsTotalCount >= 50){
        guessAttemptsTrackerMsg.style.color = "white";
        guessAttemptsTrackerMsg.style.backgroundColor = "black";
    }
}


//Prompt message beggining of the game
instructionsPrompt.innerHTML = ` <h3>Welcome to the Number Finding Challenge.<br>
Please choose a number in the range field section and click start.<br> 
EG: If you choose 50 your number range will be between 1-50. </h3> `;
instructionsPrompt.style.color = "white"

startButton.addEventListener('click', () => {
        //storing the guess range number in rangeNumber variable
        rangeNumber = RangeInputField.value;

        //creates a random number and stores it in targetNumber variable
        targetNumber = Math.floor(Math.random()*rangeNumber)+1; 

        //prompting the user to guess a number
        instructionsPrompt.innerHTML = `<h3>Please submit your entry in the Guess
        Field section<br> between 1-${rangeNumber}.<br> You may press enter to submit your entry.</h3>`
        instructionsPrompt.style.color = "black"
        //checks if the range input is a valid number 
        if(isNumeric(RangeInputField.value) === false){
            onlyNumbersMsg();
              // instructionsPrompt.style.backgroundColor = "crimson";
        }else if(isNumeric(RangeInputField.value) === true){
            startButton.disabled = true;
            startButton.removeAttribute('hover')
        }
        //checks if guess number is a valid number
        guessInputField.addEventListener('keyup', function(event){
            if(event.keyCode === 13){
                if(isNumeric(guessInputField.value) === false) {
                    onlyNumbersMsg();
                    } 
                    //stores the guess number
                    guessNumber = document.getElementById("guessInputField").value;

                if(parseInt(guessNumber) === targetNumber && hasWhiteSpace(guessInputField.value) === false && guessInputField.value !== ""){
                //checking if attempts made was only one
                    if(guessAttemptsTotalCount < 2){
                        guessAttemptsTotalCount++
                        winnerMsg();
                        guessAttemptsTrackerMsg.innerHTML = `<h3>You got it on your first attempt!</h3>`;
                        instructionsPrompt.style.color = "white";
                        instructionsPrompt.style.backgroundColor = "forestgreen";
                        guessAttemptsTrackerMsg.style.color = "white";
                        guessAttemptsTrackerMsg.style.backgroundColor = "forestgreen";
                        guessInputField.disabled = true;    
                    }//checking if attempts were more than one
                    else if(guessAttemptsTotalCount >= 2){
                        guessAttemptsTotalCount++
                        winnerMsg();
                        guessAttemptsTrackerMsg.style.color = "white";
                        guessAttemptsTrackerMsg.style.backgroundColor = "rgb(224, 159, 18)";
                        guessAttemptsTrackerMsg.innerHTML = `<h3>It took you ${guessAttemptsTotalCount} attempts!</h3>`;
                        guessInputField.disabled = true;     
                        }
                } 
                //checking if attempt is less than the target number
                if(guessNumber < targetNumber && hasWhiteSpace(guessInputField.value) === false && guessInputField.value !== ""){
                    guessAttemptsTotalCount++
                    if(guessAttemptsTotalCount < 2){
                        firstGuessMsg();
                        toLowMsg();
                        attemptsMsgSingular();
                    }else if(guessAttemptsTotalCount >= 2){
                        lastGuessMsg();
                        toLowMsg();
                        attemptsMsgPlural();
                        }
                }
                //checking if the attempt was more than the target number
                if (guessNumber > targetNumber && hasWhiteSpace(guessInputField.value) === false && guessInputField.value !== ""){
                    guessAttemptsTotalCount++
                    if(guessAttemptsTotalCount < 2 ){
                        firstGuessMsg();
                        toHighMsg();
                        attemptsMsgSingular();
                    }else if(guessAttemptsTotalCount >= 2){
                        lastGuessMsg();
                        toHighMsg();
                        attemptsMsgPlural();
                    }
                }
                //displaying checked numbers
                if(isNumeric(guessInputField.value) === true){
                    guessedIntegersList.unshift(" " + guessInputField.value);
                    previousAttemptsList.innerHTML = `<h3> ${guessedIntegersList} </h3>`;
                    previousAttemptsList.style.color = "rgb(155, 23, 50)";
                    document.getElementById("previousAttemptsHeader").innerHTML = `<h3>Previously Checked Numbers</h3>`;
                }
                else if(hasWhiteSpace(guessInputField.value) === true || guessInputField.value === "") {
                    instructionsPrompt.innerHTML = `<h3> Please enter a number, you submitted a empty value.</h3>`;
                    };
                guessInputField.value="";
            }
        });
    });