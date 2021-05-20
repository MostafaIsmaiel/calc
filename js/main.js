// Change theme
function changeTheme() {
  if (this.checked) {
    $("body").removeAttr("class").addClass(this.value);
  }
}

// Reset calc
function resetScreen() {
  $("#result").html("");
  $("#screen").html("");
  $("#operator").html("");
  $("#prev-num").html("");
  $("#last-result").html("");
}

// Delete numbers from screen
function deleteNumbers() {
  let result = $("#result").html().split("");
  result.pop();
  $("#result").html(result);

  let screen = $("#screen").html().split("");
  screen.pop();
  $("#screen").html(screen);
}

// Add numbers
function addDigits() {
  // Clear result
  if ($("#prev-num").html().length == 0) {
    $("#result").html("");
  }

  if ($("#screen").html().length < 13) {
    let screen = $("#screen").html().split("");
    screen.push(this.value);
    if (screen[0] == "*" || screen[0] == "/" || screen[0] == "0") {
      return $("#result").html("");
    } else {
      return $("#screen").html(screen);
    }
  }
}

// Add operators
function addOperators() {
  if ($("#prev-num").html().length != 0 && $("#screen").html().length == 0) {
    $("#operator").html(this.value);
  } else if (
    $("#prev-num").html().length != 0 ||
    $("#screen").html().length != 0
  ) {
    $("#operator").html(this.value);
    $("#prev-num").html($("#screen").html());
    $("#screen").html("");
  } else if ($("#result").html().length > 0) {
    $("#operator").html(this.value);
    $("#prev-num").html($("#result").html());
    $("#result").html("");
  }
}

// Add dot
function addDot() {
  // Clear result
  if ($("#prev-num").html().length == 0) {
    $("#result").html("");
  }

  let screen = $("#screen").html().split("");
  let arrScreen = screen.filter((ele) => ele == ".");

  if (arrScreen.length == 0) {
    screen.push(this.value);
    screen = screen.join("");
    $("#screen").html(screen);
  }
}

// Histories
const localStorageHistories = JSON.parse(localStorage.getItem("histories"));

let histories =
  localStorage.getItem("histories") !== null ? localStorageHistories : [];

// Update History

// Add to local storage
function addToLocalStorage(result) {
  if (result != undefined) {
    const history = {
      id: generateID(),
      screen: $("#screen").html(),
      prevNum: $("#prev-num").html(),
      operator: $("#operator").html(),
      result: $("#result").html(),
    };

    histories.push(history);

    updateLocalStorage();

    addToHistory(history);
  }
}
// Update local storage
function updateLocalStorage() {
  localStorage.setItem("histories", JSON.stringify(histories));
}

// Add to history
function addToHistory(history) {
  const item1 = document.createElement("div");
  const item2 = document.createElement("div");

  item1.classList.add("history-screen");
  item2.classList.add("history-result");

  item1.innerHTML = `${history.screen} ${history.operator} ${history.prevNum}`;
  item2.innerHTML = `${history.result}`;

  $("#history-list").append(item1);
  $("#history-list").append(item2);
}

// Format number
function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

// Reset number format
function resetNumberFormat(number) {
  number = number.split("");
  number = number.filter((ele) => ele != ",");
  return (number = number.join(""));
}
function go() {
  let screen = $("#screen").html();
  let operator = $("#operator").html();
  let prevNum = $("#prev-num").html();

  let result = eval(resetNumberFormat(prevNum) + operator + screen);
}

// Get result
function getResult() {
  let screen = $("#screen").html();
  let operator = $("#operator").html();
  let prevNum = $("#prev-num").html();

  let result = eval(resetNumberFormat(prevNum) + operator + screen);
  result =
    result < 999999999999 ? formatNumber(result) : result.toExponential(2);

  if (result != undefined) {
    return (
      $("#last-result").html(resetNumberFormat(prevNum) + operator + screen),
      $("#history-list").append(history),
      $("#result").html(result),
      addToLocalStorage(result),
      $("#screen").html(""),
      $("#prev-num").html(""),
      $("#operator").html("")
    );
  }
}

//  Generat random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
// Aside style
function aside() {
  $("#history").toggleClass("transform");
  $("#aside-btn").toggleClass("transform2");
}

// Clear History
function clear() {
  localStorage.removeItem("histories");
  $("#history .history-result").remove();
  $("#history .history-screen").remove();
}

// init app
function inint() {
  histories.forEach(addToHistory);
}
inint();

// Add click events
$("input").on("change", changeTheme);
$("#del").on("click", deleteNumbers);
$("#reset").on("click", resetScreen);
$(".digit").on("click", addDigits);
$(".operators").on("click", addOperators);
$("#dot").on("click", addDot);
$("#equal").on("click", getResult);
$("#aside-btn").on("click", aside);
$("#clear").on("click", clear);
