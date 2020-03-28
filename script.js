var game = {
  incrementTotal: 0,
  incrementPrePrestige: 0,
  increment: 0,
  i1: 1,
  i2: 1,
  i2cost: 10,
  i2count: 0,
  i3: 1,
  i3cost: 1000,
  i3count: 0,
  i4: 1,
  i4cost: [1e6, 1e12, 1e24, 1e48, 1e96, 1e192, "Max"],
  i4count: 0,
  acount: [0, 0, 0, 0, 0, 0, 0],
  acondition: [0, 0, 0, 0, 0, 0, 0],
  pp: 0,
  pcount: 0,
  refundAmount: 0,
  u1cost: [1, 2, 4, 8, "Max"],
  u1count: 0,
  i2quotient: 1.11,
  u2cost: [2, 5, 8, "Max"],
  u2count: 0,
  u3cost: [10, 15, "Max"],
  u3count: 0,
  i4costBase: [1e6, 1e12, 1e24, 1e48, 1e96, 1e192, "Max"],
  c1in: 0,
  c1count: 0,
  ainterval: 41,
  inTab: 1,
};
const interval = (a, delay) => {
  setTimeout(() => {
    increment(a);
    if (game.acondition[a - 1] == 1) {
      interval(a, delay);
    }
  }, delay);
};
var aenabled = ["Disabled", "Enabled"];

function unlock() {
  if (game.incrementPrePrestige >= 0) {
    document.getElementById("unlockReqI").innerHTML = e(10 - game.incrementPrePrestige);
    document.getElementById("unlockI").innerHTML = "Increment";
  }
  if (game.incrementPrePrestige >= 10) {
    document.getElementById("increment2").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(1000 - game.incrementPrePrestige);
  }
  if (game.incrementPrePrestige >= 1000) {
    document.getElementById("increment3").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(100000 - game.incrementPrePrestige);
    document.getElementById("unlockI").innerHTML = "Automation";
  }
  if (game.incrementPrePrestige >= 100000) {
    document.getElementById("tabAutomation").style.display = "inline";
    document.getElementById("automate1").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(1e6 - game.incrementPrePrestige);
    document.getElementById("unlockI").innerHTML = "Increment";
  }
  if (game.incrementPrePrestige >= 1e6) {
    document.getElementById("increment4").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(1e8 - game.incrementPrePrestige);
    document.getElementById("unlockI").innerHTML = "Automate";
  }
  if (game.incrementPrePrestige >= 1e8) {
    document.getElementById("automate2").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(1e9 - game.incrementPrePrestige);
    document.getElementById("unlockI").innerHTML = "Prestige";
  }
  if (game.incrementPrePrestige >= 1e9) {
    document.getElementById("tabPrestige").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = "WIP";
    document.getElementById("unlockI").innerHTML = "WIP";
  }
  /* if (game.incrementPrePrestige >= 1e12) {
    document.getElementById("tabScaling").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = "WIP";
    document.getElementById("unlockI").innerHTML = "WIP";
  } */
  if (game.pcount >= 1) {
    document.getElementById("prestigePointsTop").style.display = "inline";
    document.getElementById("tabAutomation").style.display = "inline";
    document.getElementById("tabPrestige").style.display = "inline";
    document.getElementById("upgrade1").style.display = "inline";
    document.getElementById("textu1").style.display = "inline";
    document.getElementById("unlockReqP").innerHTML = 2 - game.pp;
  }
  if (game.pcount >= 2) {
    document.getElementById("upgrade2").style.display = "inline";
    document.getElementById("textu2").style.display = "inline";
    document.getElementById("unlockReqP").innerHTML = 5 - game.pp;
    document.getElementById("unlockP").innerHTML = "Challenges";
  }
  if (game.pcount >= 5) {
    document.getElementById("challenges").style.display = "inline";
    document.getElementById("challenge1").style.display = "inline";
    document.getElementById("unlockReqP").innerHTML = 10 - game.pp;
    document.getElementById("unlockP").innerHTML = "Upgrade";
  }
  if (game.pcount >= 10) {
    document.getElementById("upgrade3").style.display = "inline";
    document.getElementById("textu3").style.display = "inline";
    document.getElementById("unlockReqP").innerHTML = "WIP";
    document.getElementById("unlockP").innerHTML = "WIP";
  }
}
function refresh() {
  document.getElementById("prestigePoints").innerHTML = game.pp;
  document.getElementById("increment").innerHTML = e(game.increment);
  document.getElementById("i1").innerHTML = e(game.i1);
  document.getElementById("i2").innerHTML = e(game.i2);
  document.getElementById("i2cost").innerHTML = e(game.i2cost);
  document.getElementById("i3").innerHTML = game.i3;
  document.getElementById("i3cost").innerHTML = e(game.i3cost);
  document.getElementById("i4").innerHTML = game.i4;
  document.getElementById("i4cost").innerHTML = e(game.i4cost[game.i4count]);
  document.getElementById("refundAmount").innerHTML = game.refundAmount;
  document.getElementById("u1cost").innerHTML = game.u1cost[game.u1count];
  document.getElementById("u1count").innerHTML = game.u1count;
  document.getElementById("u2cost").innerHTML = game.u2cost[game.u2count];
  document.getElementById("u2count").innerHTML = game.u2count;
  document.getElementById("u3cost").innerHTML = game.u3cost[game.u3count];
  document.getElementById("u3count").innerHTML = game.u3count;
  document.getElementById("c1count").innerHTML = game.c1count;
}
function hide() {
  document.getElementById("prestigePointsTop").style.display = "none";
  document.getElementById("tabAutomation").style.display = "none";
  document.getElementById("tabPrestige").style.display = "none";
  document.getElementById("tab1").style.display = "none";
  document.getElementById("increment2").style.display = "none";
  document.getElementById("increment3").style.display = "none";
  document.getElementById("increment4").style.display = "none";
  document.getElementById("increment5").style.display = "none";
  document.getElementById("increment6").style.display = "none";
  document.getElementById("increment7").style.display = "none";
  document.getElementById("tab2").style.display = "none";
  document.getElementById("tab3").style.display = "none";
  document.getElementById("automate1").style.display = "none";
  document.getElementById("automate2").style.display = "none";
  document.getElementById("automate3").style.display = "none";
  document.getElementById("automate4").style.display = "none";
  document.getElementById("automate5").style.display = "none";
  document.getElementById("automate6").style.display = "none";
  document.getElementById("automate7").style.display = "none";
  document.getElementById("tab4").style.display = "none";
  document.getElementById("challenges").style.display = "none";
  document.getElementById("tab5").style.display = "none";
  document.getElementById("upgrade1").style.display = "none";
  document.getElementById("textu1").style.display = "none";
  document.getElementById("upgrade2").style.display = "none";
  document.getElementById("textu2").style.display = "none";
  document.getElementById("upgrade3").style.display = "none";
  document.getElementById("textu3").style.display = "none";
  document.getElementById("tab6").style.display = "none";
  document.getElementById("challenge1").style.display = "none"
  document.getElementById("challenge2").style.display = "none"
  document.getElementById("challenge3").style.display = "none"
  document.getElementById("challenge4").style.display = "none"
}
function tab(n) {
  document.getElementById("tab1").style.display = "none";
  document.getElementById("tab2").style.display = "none";
  document.getElementById("tab3").style.display = "none";
  document.getElementById("tab4").style.display = "none";
  document.getElementById("tab5").style.display = "none";
  document.getElementById("tab6").style.display = "none";
  document.getElementById("tab" + n).style.display = "inline";
  if (n == 4) {
    document.getElementById("tab5").style.display = "inline";
  }
  if (n == 5 || n == 6) {
    document.getElementById("tab4").style.display = "inline";
  }
  game.inTab = 0;
  game.inTab = n;
}
function e(num) {
  if (num >= 1e6) {
    return Number.parseFloat(num).toExponential(2);
  } else {
    return Number(num).toFixed();
  }
}

function resetGame() {
  let confirmReset = confirm("Are you sure you want to reset?");
  if (confirmReset == true) {
    reset();
  }
}
function reset() {
  localStorage.clear();
  game.incrementTotal = 0;
  game.incrementPrePrestige = 0;
  game.increment = 0;
  game.i1 = 1;
  game.i2 = 1;
  game.i2cost = 10;
  game.i2count = 0;
  game.i3 = 1;
  game.i3cost = 1000;
  game.i3count = 0;
  game.i4 = 1;
  game.i4cost = [1e6, 1e12, 1e24, 1e48, 1e96, 1e192, "Max"];
  game.i4count = 0;
  game.inTab = 1;
  game.acount = [0, 0, 0, 0, 0, 0, 0];
  game.acondition = [0, 0, 0, 0, 0, 0, 0];
  game.pp = 0;
  game.pcount = 0;
  game.refundAmount = 0;
  game.u1cost = [1, 2, 4, 8, "Max"];
  game.u1count = 0;
  game.i2quotient = 1.11;
  game.u2cost = [2, 5, 8, "Max"];
  game.u2count = 0;
  game.u3cost = [10, 15, "Max"];
  game.u3count = 0;
  game.i4costBase = [1e6, 1e12, 1e24, 1e48, 1e96, 1e192, "Max"];
  game.c1in = 0;
  game.c1count = 0;
  game.ainterval = 41;
  game.inTab = 1;
  tab(1);
  unlock();
  refresh();
  setTimeout(function() {
    window.location.reload(true);
  }, 1111);
}
function resetPrestige() {
  game.incrementPrePrestige = 0;
  game.increment = 0;
  game.i1 = 1;
  game.i2 = 1;
  game.i2cost = 10;
  game.i2count = 0;
  game.i3 = 1;
  game.i3cost = 1000;
  game.i3count = 0;
  game.i4 = 1;
  game.i4cost = [1e6, 1e12, 1e24, 1e48, 1e96, 1e192, "Max"];
  game.i4count = 0;
  game.acount = [0, 0, 0, 0, 0, 0, 0];
  game.acondition = [0, 0, 0, 0, 0, 0, 0];
  unlock();
  refresh();
}
function load() {
  let data = JSON.parse(localStorage.getItem("gameFile"));
  if (data != null) {
    loadGame(data);
  }
}
function loadGame(data) {
  if (typeof data.incrementTotal != "undefined") game.incrementTotal = data.incrementTotal;
  if (typeof data.incrementPrePrestige != "undefined") game.incrementPrePrestige = data.incrementPrePrestige;
  if (typeof data.increment != "undefined") game.increment = data.increment;
  if (typeof data.i1 != "undefined") game.i1 = data.i1;
  if (typeof data.i2 != "undefined") game.i2 = data.i2;
  if (typeof data.i2cost != "undefined") game.i2cost = data.i2cost;
  if (typeof data.i2count != "undefined") game.i2count = data.i2count;
  if (typeof data.i3 != "undefined") game.i3 = data.i3;
  if (typeof data.i3cost != "undefined") game.i3cost = data.i3cost;
  if (typeof data.i3count != "undefined") game.i3count = data.i3count;
  if (typeof data.i4 != "undefined") game.i4 = data.i4;
  if (typeof data.i4cost != "undefined") game.i4cost = data.i4cost;
  if (typeof data.i4count != " undefined") game.i4count = data.i4count;
  if (typeof data.acount != "undefined") game.acount = data.acount;
  if (typeof data.acondition != "undefined") game.acondition = data.acondition;
  if (typeof data.inTab != "undefined") game.inTab = data.inTab;
  if (typeof data.pp != "undefined") game.pp = data.pp;
  if (typeof data.pcount != "undefined") game.pcount = data.pcount;
  if (typeof data.refundAmount != "undefined") game.refundAmount = data.refundAmount;
  if (typeof data.u1cost != "undefined") game.u1cost = data.u1cost;
  if (typeof data.u1count != "undefined") game.u1count = data.u1count;
  if (typeof data.i2quotient != "undefined") game.i2quotient = data.i2quotient;
  if (typeof data.u2cost != "undefined") game.u2cost = data.u2cost;
  if (typeof data.u2count != "undefined") game.u2count = data.u2count;
  if (typeof data.u3cost != "undefined") game.u3cost = data.u3cost;
  if (typeof data.u3count != "undefined") game.u3count = data.u3count;
  if (typeof data.i4costBase != "undefined") game.i4costBase = data.i4costBase;
  if (typeof data.c1in != "undefined") game.c1in = data.c1in;
  if (typeof data.c1count != "undefined") game.c1count = data.c1count;
  if (typeof data.ainterval != "undefined") game.ainterval = data.ainterval;
  tab(game.inTab);
  unlock();
  refresh();
}
function loadAutomation() {
  if (game.acondition[0] == 1) {
    interval(1, 40);
    document.getElementById("a1enabled").innerHTML = aenabled[game.acondition[0]];
  }
  if (game.acondition[1] == 1) {
    interval(2, 40);
    document.getElementById("a2enabled").innerHTML = aenabled[game.acondition[1]];
  }
  if (game.acondition[2] == 1) {
    interval(3, 40);
    document.getElementById("a3enabled").innerHTML = aenabled[game.acondition[2]];
  }
  if (game.acondition[3] == 1) {
    interval(4, 40);
    document.getElementById("a4enabled").innerHTML = aenabled[game.acondition[3]];
  }
  if (game.acondition[4] == 1) {
    interval(5, 40);
    document.getElementById("a5enabled").innerHTML = aenabled[game.acondition[4]];
  }
  if (game.acondition[5] == 1) {
    interval(6, 40);
    document.getElementById("a6enabled").innerHTML = aenabled[game.acondition[5]];
  }
  if (game.acondition[6] == 1) {
    interval(7, 40);
    document.getElementById("a7enabled").innerHTML = aenabled[game.acondition[6]];
  }
}
setInterval(function() {
  localStorage.setItem("gameFile", JSON.stringify(game));
}, 1000);
function exportGame() {
  prompt("Copy and save this file.", btoa(JSON.stringify(game)));
}
function importGame() {
  let iGame = "";
  iGame = JSON.parse(atob(prompt("Paste your save file here.")));
  if (iGame != "") {
    loadGame(iGame);
  }
}
setInterval(function() {
  if (game.increment > game.incrementPrePrestige || game.pp > game.pcount) {
    reset();
  }
}, 1000);
function display() {
  game.i3cost = (1000 * 10 ** game.i3count) ** (1 + game.u2count / 20);
  game.i2cost = 10 * (2 ** Math.log10(8 ** game.i2count) / game.i2quotient ** game.i2count);
  game.i4 = game.i4count + 1 + game.u3count / 10;
  game.i3 = (game.i3count + 1) * (game.u2count + 1);
  game.i2 = (((game.i3count + 1) * (game.u2count + 1) * (game.i2count + 2) * (game.u1count + 1)) ** game.i4) - (((game.i3count + 1) * (game.u2count + 1) * (game.i2count + 1) * (game.u1count + 1)) ** game.i4);
  game.i1 = ((game.i3count + 1) * (game.u2count + 1) * (game.i2count + 1) * (game.u1count + 1)) ** game.i4;
}

function increment(i) {
  if (i == 1) {
    game.increment += game.i1;
    game.incrementTotal += game.i1;
    game.incrementPrePrestige += game.i1;
    unlock();
    refresh();
  }
  if (i == 2 && game.increment >= game.i2cost) {
    game.increment -= game.i2cost;
    game.i2count++;
    display();
    refresh();
  }
  if (i == 3 && game.increment >= game.i3cost) {
    game.increment -= game.i3cost;
    game.i3count++;
    display();
    refresh();
  }
  if (i == 4 && game.increment >= game.i4cost[game.i4count]) {
    game.increment -= game.i4cost[game.i4count];
    game.i4count++;
    display();
    refresh();
  }
}
function automate(a) {
  if (game.c1in == 0) {
    game.acount[a - 1]++;
    game.acondition[a - 1] = game.acount[a - 1] % 2;
    interval(a, game.ainterval);
    document.getElementById("a" + a + "enabled").innerHTML = aenabled[game.acondition[a - 1]];
  }
}
function upgrade(u) {
  if (u == 1 && game.pp >= game.u1cost[game.u1count] && game.u1count < 5 && game.incrementPrePrestige == 0) {
    game.pp -= game.u1cost[game.u1count];
    game.refundAmount += game.u1cost[game.u1count];
    game.u1count++;
    game.i2quotient -= 0.01;
    display();
  }
  if (u == 2 && game.pp >= game.u2cost[game.u2count] && game.u2count < 5 && game.incrementPrePrestige == 0) {
    game.pp -= game.u2cost[game.u2count];
    game.refundAmount += game.u2cost[game.u2count];
    game.u2count++;
    display();
  }
  if (u == 3 && game.pp >= game.u3cost[game.u3count] && game.u3count < 5 && game.incrementPrePrestige == 0) {
    game.pp -= game.u3cost[game.u3count];
    game.refundAmount += game.u3cost[game.u3count];
    game.u3count++;
    display();
    for (let i = 0; i < game.i4cost.length; i++) {
      game.i4cost[i] = game.i4costBase[i] * (3 ** (i + game.u3count));
    }
  }
  refresh();
}
function challenge(c) {
  if (c == 1 && game.c1in == 0) {
    game.c1in = 1;
    resetPrestige();
    hide();
    unlock();
    refresh();
    tab(6);
    display();
    document.getElementById("c1in").innerHTML = "Running";
  }
}

function refund() {
  if (game.u1count > 0) {
    game.u1count--;
    game.pp += game.u1cost[game.u1count];
    game.refundAmount -= game.u1cost[game.u1count];
  }
  if (game.u2count > 0) {
    game.u2count--;
    game.pp += game.u2cost[game.u2count];
    game.refundAmount -= game.u2cost[game.u2count];
  }
  if (game.u3count > 0) {
    game.u3count--;
    game.pp += game.u3cost[game.u3count];
    game.refundAmount -= game.u3cost[game.u3count];
  }
  if (game.u1count > 0 || game.u2count > 0 || game.u3count > 0) {
    refund();
  }
  game.i2quotient = 1.11;
  game.i4cost = game.i4costBase;
  resetPrestige();
  hide();
  tab(4);
  display();
  unlock();
  refresh();
}
function prestige() {
  if (game.increment >= 1e9) {
    resetPrestige();
    game.pp++;
    game.pcount++;
    document.getElementById("prestigePointsTop").style.display = "inline";
    document.getElementById("prestigePoints").innerHTML = game.pp;
    document.getElementById("unlockI").innerHTML = "Increment";
    hide();
    tab(4);
    if (game.c1in == 1) {
      game.c1in = 0;
      game.ainterval -= 4;
      game.c1count++;
    }
    unlock();
    refresh();
  }
}
function exit() {
  game.c1in = 0;
  resetPrestige();
  tab(6);
  hide();
  unlock();
  refresh();
  document.getElementById("c1in").innerHTML = "Start";
}

hide();
tab(1);
load();
unlock();
refresh();
loadAutomation();
