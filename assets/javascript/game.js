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

$(document).ready(function() {

    function initializeRandomValues() {
        randomTarget = Math.floor((Math.random() * 120) + 19);
        currentUserScore = 0;

        for (var i = 0; i < crystalsArr.length; i++) {
            var tempRandom = Math.floor((Math.random() * 12) + 1);
            if (crystalValueArray.indexOf(tempRandom) == -1) {
                crystalValueArray[i] = tempRandom;
            }
            else {
                i--;
            }
        }
    }    
    initializeRandomValues();
    var TargetDiv = $(".empty-div-target");
    newTargetDiv = $("<div>");
    newTargetDiv.text(randomTarget);
    TargetDiv.append(newTargetDiv);
    TargetDiv.attr("class", "target");
    
    //Win-Loss Display
    var WinLossDiv = $(".empty-win-lose");
    var newWinP = $("<p>");
    var newWinCountSpan = $("<span>");
    newWinP.text("Wins: ");

    newWinCountSpan.text(currentWinCount);
    newWinP.append(newWinCountSpan);

    WinLossDiv.append(newWinP);
    WinLossDiv.attr("class", "win-lose");

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

    for (var k = 0; k < crystalsArr.length; k++) {
        var gemImage = $("<img>");
        gemImage.addClass("gemstones-img");
        gemImage.attr("gemColor", crystalsArr[k]);
        gemImage.attr("src", gemImgArr[k]);
        $(".empty-gemstones").append(gemImage);
    }
    restartBtn = $("<button>");
    restartBtn.addClass("gemstones-img");
    restartBtn.text("New Game");
    restartBtn.hide();
    $(".empty-gemstones").append(restartBtn);


    function updateDisplay() {
        newTargetDiv.text(randomTarget);
        newWinCountSpan.text(currentWinCount);
        newLossCountSpan.text(currentLossesCount);
        newScoreDiv.text(currentUserScore);
    }

    //Process gem selection event
    $(".gemstones-img").on("click", function() {
        if (!newGame) {
            var GemColorSelected = $(this).attr("gemColor");
        
            currentUserScore += crystalValueArray[crystalsArr.indexOf(GemColorSelected)];

            //update user score 
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
                    restartBtn.show();
                }
                updateDisplay();
            }
        }
    })
    restartBtn.on("click", function() {
        newGame = false;
        initializeRandomValues();
        updateDisplay();
        restartBtn.hide();
    }) 
}); 
    