const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function round() {
  $(".target").text("");
  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(".target").text(hits + 1);

  if (hits == 0) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").addClass("d-none");
  $("#start-game").addClass("d-none");
  $("#button-reload").removeClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#miss-counter").text(miss);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {

  if ($(event.target).hasClass("target")) {
    hits++;
    round();
  } else {
    miss++;
    $(event.target).addClass("miss");
  }
}

function init() {
  $("#start-game").click(round);

  $(".game-field").click(handleClick);
  $("#button-reload").click(function () {
    location.reload();
  });
}

$(document).ready(init);