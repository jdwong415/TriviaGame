$(document).ready(function() {

  var questions = ["Who was the first Giant to get elected into the Hall of Fame?",
    "Who was the first Giant to win an MVP award in the 21st century?",
    "In what year did the Giants play the A's in the World Series?",
    "In what year did the Giants win their first championship in San Francisco?",
    "Who won the 2014 World Series MVP award?",
    "Which Giants pitcher won back to back Cy Young awards?",
    "Who was the most recent Giants player to win the regular season MVP award?",
    "Who pitched the first perfect game in Giants' franchise history?"];

  // matthewson, bonds, 1989, 2010, bumgarner, lincecum, posey, cain
  var multipleAnswers = [["Willie Mays", "Christy Matthewson", "Willie McCovey", "Barry Bonds"],
    ["Barry Bonds", "Buster Posey", "Jeff Kent", "Madison Bumgarner"],
    ["2010", "1989", "1954", "2002"],
    ["2010", "1989", "1954", "2002"],
    ["Hunter Pence", "Buster Posey", "Madison Bumgarner", "Tim Lincecum"],
    ["Buster Posey", "Tim Lincecum", "Matt Cain", "Madison Bumgarner"],
    ["Tim Lincecum", "Buster Posey", "Madison Bumgarner", "Barry Bonds"],
    ["Tim Lincecum", "Matt Cain", "Madison Bumgarner", "Buster Posey"]];
  
  var answers = ["Christy Matthewson", "Barry Bonds", "1989", "2010", "Madison Bumgarner", "Tim Lincecum", "Buster Posey", "Matt Cain"];

  var intervalID;
  var time = 5;
  var questionCount = 0;
  var correct = 0;
  var incorrect = 0;
  var unanswered = 0;
  var resUnanswered = false;
  var resCorrect = false;
  var resIncorrect = false;

  function startTimer() {
    intervalID = setInterval(decrement, 1000);
  }

  function decrement() {
    if (time > 0) {
      time--;
    }

    if (time === 0) {
      clearInterval(intervalID);
      unanswered++;
      resUnanswered = true;
      getResult();
    }
    $("#time").html("<p>Time Remaining: " + time + " Seconds</p>");
  }

  function getResult() {
    clearInterval(intervalID);
    $("#answers").css("display", "none");
    if (resCorrect) {
      $("#question").html("<p>Correct!</p");
    }
    else {
      if (resUnanswered) {
        $("#question").html("<p>Out of Time!</p");
      }
      else if (resIncorrect) {
        $("#question").html("<p>Incorrect!</p");
      }
      var str = "The Correct Answer was: " + answers[questionCount];
      $("#question").append("<p>" + str + "</p>");
    }

    if (questionCount === 7) {
      endGame();
    }
    else {
      questionCount++;
      setTimeout(getQuestion, 3000);
    }
  }

  function getQuestion() {
    startTimer();
    resUnanswered = false;
    resCorrect = false;
    resIncorrect = false;
    time = 5;
    $("#time").html("<p>Time Remaining: " + time + " Seconds</p>");

    $("#question").html("<p>" + questions[questionCount] + "</p>");

    getAnswers();
  }

  function getAnswers() {
    $("#answers").css("display", "block")
    $("#a1").text(multipleAnswers[questionCount][0]);
    $("#a2").text(multipleAnswers[questionCount][1]);
    $("#a3").text(multipleAnswers[questionCount][2]);
    $("#a4").text(multipleAnswers[questionCount][3]);

  }

  function startGame() {
    $("#time").html("<p>Time Remaining: " + time + " Seconds</p>");
    getQuestion();
  }

  function endGame() {
    $("#reset").css("display", "block");
    $("#question").html("Here are your final results:");
    $("#question").append("<p>Correct Answers: " + correct + "<p>");
    $("#question").append("<p>Incorrect Answers: " + incorrect + "<p>");
    $("#question").append("<p>Unanswered: " + unanswered + "<p>");
  }

  $("#start").on("click", function() {
    $("#intro").css("display", "none");
    startGame();
  });

  $(".answer").on("click", function() {
    if ($(this).text() === answers[questionCount]) {
      correct++;
      resCorrect = true;
      getResult();
    }
    else {
      incorrect++;
      resIncorrect = true;
      getResult();
    }
  });

  $("#startOver").on("click", function() {
    questionCount = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    $("#reset").css("display", "none");
    startGame();
  });

});