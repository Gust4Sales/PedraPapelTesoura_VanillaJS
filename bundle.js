"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var box_div = document.getElementById("box");
var btnHighscore = document.querySelector("#highscore");
var result_div = document.getElementById("result");
var result_h1 = document.getElementsByTagName("h1")[1];
var winCounter_span = document.querySelector("span");
var highscoreText_h4 = document.getElementById("highscoreText"); //////////////////////////////////////////////////////////////////////////////////

var Game =
/*#__PURE__*/
function () {
  function Game() {
    var _this = this;

    _classCallCheck(this, Game);

    this.wins = 0;
    this.highscore = 0;
    winCounter_span.innerHTML = this.wins;

    btnHighscore.onclick = function () {
      if (_this.highscore > 0) {
        btnHighscore.style.pointerEvents = "none";
        highscoreText_h4.style.animation = "showHighscore 4s ease-out";
        setTimeout(function () {
          highscoreText_h4.style.animation = null;
          btnHighscore.style.pointerEvents = "all";
        }, 4000);
      }
    };
  }

  _createClass(Game, [{
    key: "getRandomChoice",
    value: function getRandomChoice() {
      var randomNum = Math.floor(Math.random() * 3);

      if (randomNum === 0) {
        return "pedra";
      } else if (randomNum === 1) {
        return "papel";
      }

      return "tesoura";
    }
  }, {
    key: "setWinScreen",
    value: function setWinScreen(choice_a, computerChoice) {
      var pcChoice = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
      var userChoice = choice_a.getAttribute("id").charAt(0).toUpperCase() + choice_a.getAttribute("id").slice(1);
      this.wins++;
      winCounter_span.innerHTML = this.wins;
      choice_a.style.animation = "winBoxEffect .3s ease-out infinite";
      box_div.style.animation = "winBoxEffect .3s ease-out infinite";
      result_h1.innerText = "Computador jogou ".concat(computerChoice.toUpperCase(), ". ").concat(userChoice, " vence ").concat(pcChoice, ". Voc\xEA ganhou!");
      result_div.setAttribute("class", "result");
      result_div.style.background = "linear-gradient(#18705d, #33d9b2)";
      setTimeout(function () {
        result_div.removeAttribute("class");
        result_div.style.background = null;
        result_h1.innerText = "";
        box_div.style.pointerEvents = "all";
      }, 4000);
    }
  }, {
    key: "setLoseScreen",
    value: function setLoseScreen(choice_a, computerChoice) {
      var pcChoice = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
      var userChoice = choice_a.getAttribute("id").charAt(0).toUpperCase() + choice_a.getAttribute("id").slice(1);
      this.wins = 0;
      winCounter_span.innerHTML = this.wins;
      box_div.style.animation = "loseBoxEffect 0.3s ease-out infinite";
      choice_a.style.animation = "loseBoxEffect 0.3s ease-out infinite";
      result_h1.innerText = "Computador jogou ".concat(computerChoice.toUpperCase(), ". ").concat(pcChoice, " vence ").concat(userChoice, ". Voc\xEA perdeu!");
      result_div.setAttribute("class", "result");
      result_div.style.background = "linear-gradient(#a13131, #fc5656)";
      setTimeout(function () {
        result_div.removeAttribute("class");
        result_div.style.background = null;
        result_h1.innerText = "";
        box_div.style.pointerEvents = "all";
      }, 4000);
    }
  }, {
    key: "setTieScreen",
    value: function setTieScreen(choice_a, computerChoice) {
      box_div.style.animation = "tieBoxEffect 0.3s ease-out infinite";
      choice_a.style.animation = "tieBoxEffect 0.3s ease-out infinite";
      result_h1.innerText = "Computador jogou ".concat(computerChoice.toUpperCase(), ". Deu empate!");
      result_div.setAttribute("class", "result");
      result_div.style.background = "linear-gradient(#74716c, #f7f1e3)";
      setTimeout(function () {
        result_div.removeAttribute("class");
        result_div.style.background = null;
        result_h1.innerText = "";
        box_div.style.pointerEvents = "all";
      }, 3000);
    }
  }, {
    key: "setHighscore",
    value: function setHighscore() {
      if (this.highscore === 0) {
        this.highscore = 1;
        highscoreText_h4.innerText = this.highscore + " point";
      } else {
        if (parseInt(winCounter_span.innerText) > this.highscore) {
          this.highscore = parseInt(winCounter_span.innerText);
          highscoreText_h4.innerText = this.highscore + " points";
        }
      }

      console.log(highscoreText_h4);
    }
  }, {
    key: "renderResult",
    value: function renderResult(choice, pcChoice, result) {
      console.log("User: " + choice + ". PC: " + pcChoice + ". Resultado: " + result);
      var choice_a;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var option = _step.value;

          if (option.getAttribute("id") === choice) {
            choice_a = option;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      box_div.style.pointerEvents = "none";
      Game.clearAnimations(choice_a);

      if (result === "win") {
        this.setWinScreen(choice_a, pcChoice);
        this.setHighscore();
      } else if (result === "lose") {
        this.setLoseScreen(choice_a, pcChoice);
      } else {
        this.setTieScreen(choice_a, pcChoice);
      }
    }
  }, {
    key: "runTurn",
    value: function runTurn(choice) {
      var pcChoice = this.getRandomChoice();

      if (choice === "pedra" && pcChoice === "tesoura") {
        this.renderResult(choice, pcChoice, "win");
      } else if (choice === "pedra" && pcChoice === "papel") {
        this.renderResult(choice, pcChoice, "lose");
      } else if (choice === "papel" && pcChoice === "pedra") {
        this.renderResult(choice, pcChoice, "win");
      } else if (choice === "papel" && pcChoice === "tesoura") {
        this.renderResult(choice, pcChoice, "lose");
      } else if (choice === "tesoura" && pcChoice === "pedra") {
        this.renderResult(choice, pcChoice, "lose");
      } else if (choice === "tesoura" && pcChoice === "papel") {
        this.renderResult(choice, pcChoice, "win");
      } else {
        this.renderResult(choice, pcChoice, "tie");
      }
    }
  }], [{
    key: "clearAnimations",
    value: function clearAnimations(choice_a) {
      box_div.style.animation = null;
      choice_a.style.animation = null;
      setTimeout(function () {
        box_div.style.animation = null;
        choice_a.style.animation = null;
      }, 1500);
    }
  }]);

  return Game;
}(); //////////////////////RUN/////////////////////////


var game = new Game();
var choices = document.querySelector(".choices").children;
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  var _loop = function _loop() {
    var choice = _step2.value;
    choice.addEventListener("click", function () {
      game.runTurn(choice.getAttribute("id"));
    });
  };

  for (var _iterator2 = choices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    _loop();
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
      _iterator2["return"]();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}
