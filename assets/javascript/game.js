$(document).ready(function() {
  var wins=0;
  var losses=0;
  var winsCounter=$("#wins");
  var lossesCounter=$("#losses");
  var target=0;
  var score=0;
  var targetCounter=$("#target");
  var scoreCounter=$("#score");
  var gemValues=[0,0,0,0]
  function refreshUI(){
      winsCounter.text(wins);
      lossesCounter.text(losses);
      targetCounter.text(target);
      scoreCounter.text(score);
  }
  function restartGame(){
      //$("#gem1").score=(Math.floor(Math.random()*10))+1;
      //$("#gem2").score=(Math.floor(Math.random()*10))+1;
      //$("#gem3").score=(Math.floor(Math.random()*10))+1;
      //$("#gem4").score=(Math.floor(Math.random()*10))+1;
      for(var i=0;i<gemValues.length;i++){
          gemValues[i]=(Math.floor(Math.random()*10))+1;
      }
      score=0;
      target=Math.floor(Math.random()*30)+20;
      refreshUI();
  }
  $(".gem").click(function(){
      var crystal=gemValues[this.value];
      score=score+crystal;
      if(score==target){
          wins++;
          restartGame();
      }
      else if(score>target){
          losses++;
          restartGame();
      }
      refreshUI();
  })
  restartGame();
})