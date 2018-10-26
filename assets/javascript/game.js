var newGame = false;
var randomTarget;
var blueGemValue;
var redGemValue;
var greenGemValue;
var yellowGemValue;
var crystalsArr = ["blue", "red", "green", "yellow"];
var crystalValueArray = [0, 0, 0, 0];
var currentWinCount = 0;
var currentLossesCount = 0;
var currentUserScore = 0;
var gemImgArr = ["assets/images/blue-crystal.jpg", "assets/images/red-crystal.jpg", "assets/images/green-crystal.jpg", "assets/images/yellow-crystal.jpg"]

//define script that must be run after page is loaded
$(document).ready(function() {

    //initialize target, gem values and reset user score to 0
    function initializeRandomValues() {
        randomTarget = Math.floor((Math.random() * 120) + 19);
        currentUserScore = 0;

        for (var i = 0; i < crystalsArr.length; i++) {
            var tempRandom = Math.floor((Math.random() * 12) + 1);
            //Ensure the random numbers for the 4 gems are unique
            if (crystalValueArray.indexOf(tempRandom) == -1) {
                crystalValueArray[i] = tempRandom;
            }
            else {
                i--;
            }
        }
    }    

    //Get initial random values
    initializeRandomValues();

    //initialize Target Display
    var TargetDiv = $(".empty-div-target");
    newTargetDiv = $("<div>");
    newTargetDiv.text(randomTarget);
    TargetDiv.append(newTargetDiv);
    TargetDiv.attr("class", "target");
    
    //initialize Win-Loss Display
    var WinLossDiv = $(".empty-win-lose");
    
    //Win Display with second display to allow easier update of the number of wins
    var newWinP = $("<p>");
    var newWinCountSpan = $("<span>");
    newWinP.text("Wins: ");

    newWinCountSpan.text(currentWinCount);
    newWinP.append(newWinCountSpan);

    WinLossDiv.append(newWinP);
    WinLossDiv.attr("class", "win-lose");

    //Win Display with second display to allow easier update of the number of wins
    var newLossP = $("<p>");
    var newLossCountSpan = $("<span>");
    newLossP.text("Losses: ");

    newLossCountSpan.text(currentLossesCount);
    newLossP.append(newLossCountSpan);

    WinLossDiv.append(newLossP);
    WinLossDiv.attr("class", "win-lose");

    //initialize User Score Display
    var userScoreDiv = $(".empty-div-score");
    newScoreDiv =$("<div>");
    newScoreDiv.text(currentUserScore);
    userScoreDiv.append(newScoreDiv);
    userScoreDiv.attr("class", "score");

    //initialize gemstones display
    for (var k = 0; k < crystalsArr.length; k++) {
        var gemImage = $("<img>");
        gemImage.addClass("gemstones-img");
        gemImage.attr("gemColor", crystalsArr[k]);
        gemImage.attr("src", gemImgArr[k]);
        // console.log("gemImage.attr('gemColor') = " + gemImage.attr("gemColor"));
        $(".empty-gemstones").append(gemImage);
    }

    //initialize restart button and add it to gemstone display - then hide it
    restartBtn = $("<button>");
    restartBtn.addClass("gemstones-img");
    restartBtn.text("New Game");
    restartBtn.hide();
    $(".empty-gemstones").append(restartBtn);


    function updateDisplay() {
        //update display values
        newTargetDiv.text(randomTarget);
        newWinCountSpan.text(currentWinCount);
        newLossCountSpan.text(currentLossesCount);
        newScoreDiv.text(currentUserScore);
    }

    //Process gem selection event
    $(".gemstones-img").on("click", function() {
        //When the user wins or losses, ignore gem clicks until the new game button is selected
        if (!newGame) {
            var GemColorSelected = $(this).attr("gemColor");
        
            //add specific gem value to user score
            currentUserScore += crystalValueArray[crystalsArr.indexOf(GemColorSelected)];

            //update user score display
            newScoreDiv.text(currentUserScore);

            if (currentUserScore >= randomTarget) {
                if (currentUserScore === randomTarget) {
                    currentWinCount++;
                    alert("Congrats, You Win. \n"+
                    "Use the New Game Button to start a new game. \n\n" +
                    "The values assigned to the gems are as follows: \n"+
                    "Blue = " + crystalValueArray[0] + "\n" +
                    "Red = " + crystalValueArray[1] + "\n" +
                    "Green = " + crystalValueArray[2] + "\n" +
                    "Yellow = " + crystalValueArray[3] + "\n");
                    newGame = true;
                    //show the restart button
                    restartBtn.show();
                }
                else {
                    currentLossesCount++;
                    alert("Sorry, You lose. \n"+
                    "Use the New Game Button to start a new game. \n\n"+
                    "The values assigned to the gems are as follows: \n"+
                    "Blue = " + crystalValueArray[0] + "\n" +
                    "Red = " + crystalValueArray[1] + "\n" +
                    "Green = " + crystalValueArray[2] + "\n" +
                    "Yellow = " + crystalValueArray[3] + "\n");               
                    newGame = true;
                    //show the restart button
                    restartBtn.show();
                }
                
                updateDisplay();

            }
        }

    }) //End of Gem Click event processing

    // Process Restart Button selection
    restartBtn.on("click", function() {
        newGame = false;
        initializeRandomValues();
        updateDisplay();
        //Hide restart button
        restartBtn.hide();
        
    }) //End of restart button click event processing

}); //End of document ready section
    