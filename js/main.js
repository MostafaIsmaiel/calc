// Change theme
function changeTheme() {
  if (this.checked) {
    $('link[rel="stylesheet"]').attr({
      href: `css/dist/style${$(this).val()}.css`,
      rel: "stylesheet",
    });
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

// Format number
function formatMoney(number) {
  return new Intl.NumberFormat().format(number);
}

// Get result
function getResult() {
  let screen = $("#screen").html();
  let operator = $("#operator").html();

  // Reset number format
  let prevNum = $("#prev-num").html();
  prevNum = prevNum.split("");
  prevNum = prevNum.filter((ele) => ele != ",");
  prevNum = prevNum.join("");

  let result = eval(prevNum + operator + screen);

  // Add to history
  let history = `<div class="history-screen">${prevNum} ${operator}  ${screen}
  </div>
  <div class="history-result">${formatMoney(result)}</div>`;

  if (result != undefined) {
    return (
      $("#last-result").html(prevNum + operator + screen),
      $("#history").append(history),
      $("#result").html(formatMoney(result)),
      $("#screen").html(""),
      $("#prev-num").html(""),
      $("#operator").html("")
    );
  }
}

// Aside style
function aside() {
  $("#history").toggleClass("transform");
  $("#aside-btn").toggleClass("transform2");
}

// Clear History
function clear() {
  $("#history .history-result").remove();
  $("#history .history-screen").remove();
}

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
