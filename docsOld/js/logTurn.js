document.getElementById("turn-logger").addEventListener("click", logAction);
document.getElementById("new-turn").addEventListener("click", startTurn);
document.getElementById("reset-turn").addEventListener("click", reset);
document.getElementById("remove-last").addEventListener("click", deleteLast);
document.getElementById("show-logger").addEventListener("click", showLogger);

let turnCount = 0;
let fieldShown = true;

function showLogger() {
  fieldShown = !fieldShown;
  document.getElementById("loggerField").hidden = fieldShown;

  return fieldShown;
}

function startTurn() {
  turnCount++;
  const div = document.createElement("div");

  div.classList.add("fieldLoggerContainer");

  if (turnCount > 1) {
    const border = document.createElement("div");
    const hr = document.createElement("hr");
    border.appendChild(hr);
    document.getElementById("loggerField").appendChild(border);
  }

  div.innerHTML = `<p>Turn ${turnCount}</p>`;

  const innerDiv = document.createElement("div");
  innerDiv.classList.add("innerLogger");
  innerDiv.align = "center";
  innerDiv.id = `turn-${turnCount}`;

  div.appendChild(innerDiv);

  document.getElementById("loggerField").appendChild(div);
  return turnCount;
}

function logAction() {
  const moveSpan = document.createElement("span");

  let playerMon = document.querySelectorAll(".select2-chosen")[0];
  playerMon = playerMon.innerText.split("(")[0];

  const playerMove = document.querySelector("#playerMoves").value;

  let oppMon = document.querySelectorAll(".select2-chosen")[5];
  oppMon = oppMon.innerText.split("(")[0];

  const oppMove = document.querySelector("#oppMoves").value;

  moveSpan.innerHTML = `${playerMon} used ${playerMove} | ${oppMon} used ${oppMove} <br>`;

  document.getElementById(`turn-${turnCount}`).appendChild(moveSpan);

  const hpSpan = document.createElement("span");

  let playerHP =
    (document.getElementById("currentHpL1").value /
      document.querySelectorAll(".max-hp")[0].innerHTML) *
    100;
  playerHP = Math.round(playerHP) + "%";
  let oppHP =
    (document.getElementById("currentHpR1").value /
      document.querySelectorAll(".max-hp")[1].innerHTML) *
    100;
  oppHP = Math.round(oppHP) + "%";

  hpSpan.innerHTML = `${playerMon} HP: ${playerHP} | ${oppMon} HP: ${oppHP} <br>`;

  document.getElementById(`turn-${turnCount}`).appendChild(hpSpan);
}

function getMoves() {
  document.getElementById("playerMove1").innerHTML =
    document.querySelectorAll(".select2-chosen")[1].innerText;
  document.getElementById("playerMove2").innerHTML =
    document.querySelectorAll(".select2-chosen")[2].innerText;
  document.getElementById("playerMove3").innerHTML =
    document.querySelectorAll(".select2-chosen")[3].innerText;
  document.getElementById("playerMove4").innerHTML =
    document.querySelectorAll(".select2-chosen")[4].innerText;

  document.getElementById("oppMove1").innerHTML =
    document.querySelectorAll(".select2-chosen")[6].innerText;
  document.getElementById("oppMove2").innerHTML =
    document.querySelectorAll(".select2-chosen")[7].innerText;
  document.getElementById("oppMove3").innerHTML =
    document.querySelectorAll(".select2-chosen")[8].innerText;
  document.getElementById("oppMove4").innerHTML =
    document.querySelectorAll(".select2-chosen")[9].innerText;
}

function deleteLast() {
  const lastLog = document.getElementById(`turn-${turnCount}`);

  if (turnCount === 0) {
    return;
  }

  if (lastLog.childElementCount === 0) {
    turnCount--;
    lastLog.parentElement.remove();
    if (turnCount >= 1) {
      document.getElementById("loggerField").lastChild.remove();
    }
    return;
  } else if (turnCount != 0) {
    lastLog.removeChild(lastLog.lastChild);
    lastLog.removeChild(lastLog.lastChild);
  }
}

function reset() {
  document.getElementById("loggerField").innerHTML = "";
  const legend = document.createElement("legend");
  legend.innerHTML = "BATTLE LOGGER";
  document.getElementById("loggerField").appendChild(legend);
  turnCount = 0;
}
