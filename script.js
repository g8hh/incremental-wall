function getGame() {
  return {
    inc: {x: 10, prePrestige: 10, total: 10, highest: 10},
    i: [{x: 0, count: 0}, {x: 0, cost: 10, count: 0, quotient: 1.11, base: 8}, {x: 1, cost: 1000, count: 0, base: 10}, {x: 1, cost: [100000, 1e12, 1e24, 1e48, 1e96, 1e192, "Max"], count: 0, costBase: [100000, 1e12, 1e24, 1e48, 1e96, 1e192, "Max"]}],
    a: [{count: 0, condition: 0}, {count: 0, condition: 0}, {count: 0, condition: 0}, {count: 0, condition: 0}],
    s: [0, {cost: [1e11, 1e17, 1e22, 1e31, "Max"], count: 0, max: 4}, {cost: [1e12, 1e18, 1e21, 1e24, 1e30, 1e33, 1e36, 1e39, "Max"], count: 0, max: 8}, 0, 0, 0, 0, {cost: [1e20, "Max"], count: 0, max: 1}, {cost: [1e30, "Max"], count: 0, max: 1}],
    pp: {x: 0, total: 0, count: 0, gain: 1},
    u: [0, {cost: 1, count: 0, max: 10}, {cost: 2, count: 0, max: 10}, {cost: 10, count: 0, max: 5}],
    c: [0, {in: 0, count: 0, goal: [1e11, 1e17, 1e18, 1e19, 1e20, 1e21, 1e22, 1e23, 1e30, 1e31]}, {in: 0, count: 0, goal: [1e9, 1e10, 1e11, 1e13, 1e14, 1e15, 1e16, 1e17, 1e18, 1e19]}],
    pi: [{x: 0}, {x: 1, cost: 20, count: 0}, {x: 1, cost: 2000, count: 0}, {x: 1, cost: 200000, count: 0}],
    inTab: 1,
    cin: 0,
    stats: {count: 0, condition: 0},
    ainterval: 41,
    refundAmount: 0,
    version: [0, 0, 7],
  }
}
var game = getGame()
const interval = (a, delay) => {
  setTimeout(() => {
    increment(a);
    if (game.a[a].condition == 1) {
      interval(a, delay);
    }
  }, delay);
};
var aenabled = ["Disabled", "Enabled"];

function unlock() {
  if (game.inc.prePrestige >= 0) {
    document.getElementById("unlockReqI").innerHTML = e(10 - game.inc.prePrestige);
    document.getElementById("unlockI").innerHTML = "Increment 2";
    document.getElementById("unlockReqA").innerHTML = e(2500 - game.inc.prePrestige);
    document.getElementById("unlockA").innerHTML = "Automate 1";
    document.getElementById("unlockReqS").innerHTML = e(1e12 - game.inc.prePrestige);
    document.getElementById("unlockS").innerHTML = "Scale 1";
    document.getElementById("unlockReqU").innerHTML = e(1 - game.pp.total);
    document.getElementById("unlockReqPI").innerHTML = e(10 - game.pp.total);
    document.getElementById("unlockReqC").innerHTML = e(20 - game.pp.total);
  }
  if (game.inc.prePrestige >= 10) {
    document.getElementById("increment1").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(1000 - game.inc.prePrestige);
    document.getElementById("unlockI").innerHTML = "Increment 2";
  }
  if (game.inc.prePrestige >= 1000) {
    document.getElementById("increment2").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(2500 - game.inc.prePrestige);
    document.getElementById("unlockI").innerHTML = "Automation";
  }
  if (game.inc.prePrestige >= 2500) {
    document.getElementById("tabAutomation").style.display = "inline";
    document.getElementById("automate0").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(100000 - game.inc.prePrestige);
    document.getElementById("unlockI").innerHTML = "Increment 3";
    document.getElementById("unlockReqA").innerHTML = e(500000 - game.inc.prePrestige);
    document.getElementById("unlockA").innerHTML = "Automate Inc 1";
  }
  if (game.inc.prePrestige >= 500000) {
    document.getElementById("automate1").style.display = "inline";
    document.getElementById("unlockReqA").innerHTML = e(1e7 - game.inc.prePrestige);
    document.getElementById("unlockA").innerHTML = "Automate Inc 2";
  }
  if (game.inc.prePrestige >= 100000) {
    document.getElementById("increment3").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(1e8 - game.inc.prePrestige);
    document.getElementById("unlockI").innerHTML = "Prestige";
  }
  if (game.inc.prePrestige >= 1e7) {
    document.getElementById("automate2").style.display = "inline";
    document.getElementById("unlockReqA").innerHTML = e(1e9 - game.inc.prePrestige);
    document.getElementById("unlockA").innerHTML = "Automate Inc 3";
  }
  if (game.inc.prePrestige >= 1e8) {
    document.getElementById("tabPrestige").style.display = "inline";
    document.getElementById("unlockReqI").innerHTML = e(1e11 - game.inc.prePrestige);
    document.getElementById("unlockI").innerHTML = "Scaling";
  }
  if (game.inc.prePrestige >= 1e9) {
    document.getElementById("automate3").style.display = "inline";
    document.getElementById("unlockReqA").innerHTML = "WIP";
    document.getElementById("unlockA").innerHTML = "WIP";
  }
  if (game.inc.prePrestige >= 1e11) {
    doc("tabScaling").style.display = "inline";
    doc("scale1").style.display = "inline";
    doc("unlockReqI").innerHTML = "WIP";
    doc("unlockI").innerHTML = "WIP";
    doc("unlockReqS").innerHTML = e(1e12 - game.inc.prePrestige);
    doc("unlockS").innerHTML = "Scale 2";
  }
  if (game.inc.prePrestige >= 1e12) {
    doc("scale2").style.display = "inline";
    doc("unlockReqS").innerHTML = e(1e20 - game.inc.prePrestige);
    doc("unlockS").innerHTML = "Scale 7";
  }
  if (game.inc.prePrestige >= 1e20) {
    doc("scale7").style.display = "inline";
    doc("unlockReqS").innerHTML = e(1e30 - game.inc.prePrestige);
    doc("unlockS").innerHTML = "Scale 8";
  }
  if (game.inc.prePrestige >= 1e30) {
    doc("scale8").style.display = "inline";
    doc("unlockReqS").innerHTML = "WIP";
    doc("unlockS").innerHTML = "WIP";
  }
  if (game.inc.highest >= 1e12) {
    doc("tabScaling").style.display = "inline";
  }
  if (game.inc.total >= 1e8) {
    document.getElementById("tabAutomation").style.display = "inline";
    document.getElementById("tabPrestige").style.display = "inline";
  }
  if (game.pp.total >= 1) {
    document.getElementById("prestigePointsTop").style.display = "inline";
    document.getElementById("upgrade1").style.display = "inline";
    document.getElementById("u1text").style.display = "inline";
    document.getElementById("unlockReqU").innerHTML = e(3 - game.pp.total);
    document.getElementById("unlockU").innerHTML = "Upgrade 2";
  }
  if (game.pp.total >= 3) {
    document.getElementById("upgrade2").style.display = "inline";
    document.getElementById("u2text").style.display = "inline";
    document.getElementById("unlockReqU").innerHTML = e(10 - game.pp.total);
    document.getElementById("unlockU").innerHTML = "Upgrade 3";
  }
  if (game.pp.total >= 10) {
    document.getElementById("upgrade3").style.display = "inline";
    document.getElementById("u3text").style.display = "inline";
    document.getElementById("unlockReqU").innerHTML = e(20 - game.pp.total);
    document.getElementById("unlockU").innerHTML = "Pincrements";
  }
  if (game.pp.total >= 20) {
    document.getElementById("subTabPincrements").style.display = "inline";
    document.getElementById("pincrement0").style.display = "inline";
    document.getElementById("pincrement1").style.display = "inline";
    document.getElementById("unlockReqU").innerHTML = e(40 - game.pp.total);
    document.getElementById("unlockU").innerHTML = "Challenges";
    document.getElementById("unlockReqPI").innerHTML = e(2000 - game.pp.total);
    document.getElementById("unlockPI").innerHTML = "Pincrement 2";
  }
  if (game.pp.total >= 40) {
    document.getElementById("subTabChallenges").style.display = "inline";
    document.getElementById("challenge1").style.display = "inline";
    document.getElementById("unlockReqU").innerHTML = "WIP";
    document.getElementById("unlockU").innerHTML = "WIP";
    document.getElementById("unlockReqC").innerHTML = e(80 - game.pp.total);
    document.getElementById("unlockC").innerHTML = "Challenge 2";
  }
  if (game.pp.total >= 80) {
    document.getElementById("challenge2").style.display = "inline";
    document.getElementById("unlockReqC").innerHTML = "WIP";
    document.getElementById("unlockC").innerHTML = "WIP";
  }
  if (game.pp.total >= 2000) {
    document.getElementById("pincrement2").style.display = "inline";
    document.getElementById("unlockReqPI").innerHTML = e(200000 - game.pp.total);
    document.getElementById("unlockPI").innerHTML = "Pincrement 3";
  }
  if (game.pp.total >= 200000) {
    document.getElementById("pincrement3").style.display = "inline";
    document.getElementById("unlockReqPI").innerHTML = "WIP";
    document.getElementById("unlockPI").innerHTML = "WIP";
  }
  for (let i = 1; i < 3; i++) {
    if (game.c[i].in == 1) {
      doc("cctext").style.display = "inline";
      doc("exit").style.display = "inline";
      doc("challengeGoal").innerHTML = e(game.c[i].goal[game.c[i].count] - game.inc.x);
      doc("ccnum").innerHTML = game.cin;
      if (game.inc.x >= game.c[i].goal[game.c[i].count]) {
        doc("ccomplete").style.display = "inline";
        doc("challengeGoal").innerHTML = 0;
      }
    }
  }
  if (game.stats.condition == 1) {
    document.getElementById("stats").style.display = "inline";
  }
}
function display() {
  game.i[0].x = (((game.i[1].count) * (game.u[1].count + 1) * (game.i[2].count + 1) * (game.u[2].count + 1)) ** ((game.i[3].count + 1) * (1 + (game.u[3].count / 10))) * (1 + Math.log10(game.pp.x + 1));
  game.i[1].x = ((((game.i[1].count + 2) * (game.u[1].count + 1) * (game.i[2].count + 1) * (game.u[2].count + 1)) ** ((game.i[3].count + 1) * (1 + (game.u[3].count / 10))) * (1 + Math.log10(game.pp.x + 1))) - ((((game.i[1].count + 1) * (game.u[1].count + 1) * (game.i[2].count + 1) * (game.u[2].count + 1)) ** ((game.i[3].count + 1) * (1 + (game.u[3].count / 10))) * (1 + Math.log10(game.pp.x + 1)));
  game.i[2].x = (game.i[2].count + 1) * (game.u[2].count + 1);
  game.i[3].x = (game.i[3].count + 1) * (1 + (game.u[3].count / 10));
  game.i[1].cost = (10 * (2 ** Math.log10(game.i[1].base ** game.i[1].count))) / (game.i[1].quotient ** game.i[1].count);
  game.i[2].cost = (1000 * (game.i[2].base ** game.i[2].count)) ** (1 + (game.u[2].count / 50));
  game.u[1].cost = game.u[1].count + 1;
  game.u[2].cost = Math.ceil(2.35 ** (game.u[2].count + 1));
  game.u[3].cost = 10 ** (game.u[3].count + 1);
  game.pp.gain = Math.floor((((game.pi[1].count + 1) * (game.pi[2].count + 1)) ** (game.pi[3].count + 1)) + Math.floor(((Math.abs(Math.log10(game.inc.prePrestige) - 7) - (7 - Math.log10(game.inc.prePrestige))) / 4) + 0.5)) - 1;
  game.pi[0].x = ((game.pi[1].count) * (game.pi[2].count + 1)) ** (game.pi[3].count + 1);
  game.pi[1].x = (((game.pi[1].count + 2) * (game.pi[2].count + 1)) ** (game.pi[3].count + 1)) - (((game.pi[1].count + 1) * (game.pi[2].count + 1)) ** (game.pi[3].count + 1));
  game.pi[2].x = game.pi[2].count + 1;
  game.pi[3].x = game.pi[3].count + 1;
  game.pi[1].cost = 20 * (2 ** (game.pi[1].count));
  game.pi[2].cost = 2000 * (10 ** (game.pi[2].count));
  game.pi[3].cost = 200000 * (1000000 ** (game.pi[3].count));
}
function refresh() {
  doc("c1count").innerHTML = game.c[1].count;
  doc("c2count").innerHTML = game.c[2].count;
  for (let i = 1; i < 4; i++) {
    doc("i" + i + "x").innerHTML = e(game.i[i].x);
    doc("i" + i + "cost").innerHTML = e(game.i[i].cost);
    doc("u" + i + "cost").innerHTML = e(game.u[i].cost);
    doc("u" + i + "count").innerHTML = game.u[i].count;
    doc("u" + i + "max").innerHTML = game.u[i].max;
    doc("pi" + i + "cost").innerHTML = game.pi[i].cost;
  }
  doc("s1cost").innerHTML = e(game.s[1].cost[game.s[1].count]);
  doc("s1count").innerHTML = game.s[1].count;
  doc("s2cost").innerHTML = e(game.s[2].cost[game.s[2].count]);
  doc("s2count").innerHTML = game.s[2].count;
  doc("s7cost").innerHTML = e(game.s[7].cost[game.s[7].count]);
  doc("s7count").innerHTML = game.s[7].count;
  doc("s8cost").innerHTML = e(game.s[8].cost[game.s[8].count]);
  doc("s8count").innerHTML = game.s[8].count;
  for (let i = 0; i < 4; i++) {
    doc("pi" + i + "x").innerHTML = game.pi[i].x;
  }
  if (game.inc.prePrestige >= 1e8) {
    doc("ppgain").innerHTML = game.pp.gain;
  }
  else {
    doc("ppgain").innerHTML = 0;
  }
  document.getElementById("i3x").innerHTML = d((game.i[3].x), 1);
  document.getElementById("i3cost").innerHTML = e(game.i[3].cost[game.i[3].count]);
  document.getElementById("s1effect").innerHTML = d(game.i[1].base, 2);
  document.getElementById("s2effect").innerHTML = game.i[2].base;
  document.getElementById("ppx").innerHTML = e(game.pp.x);
  document.getElementById("incx").innerHTML = e(game.inc.x);
  document.getElementById("i0x").innerHTML = e(game.i[0].x);
  document.getElementById("refundAmount").innerHTML = game.refundAmount;
  document.getElementById("c1reward").innerHTML = game.ainterval;
  document.getElementById("c2reward").innerHTML = game.c[2].count;
  document.getElementById("ppgain").innerHTML = game.pp.gain;
  doc("statPPGain").innerHTML = game.pp.gain;
  doc("statIncHighest").innerHTML = e(game.inc.highest);
  doc("statIncTotal").innerHTML = e(game.inc.total);
  doc("statIncPrePrestige").innerHTML = e(game.inc.prePrestige);
  doc("statInc0Count").innerHTML = game.i[0].count;
  doc("statInc1Count").innerHTML = game.i[1].count;
  doc("statInc2Count").innerHTML = game.i[2].count;
  doc("statInc3Count").innerHTML = game.i[3].count;
  doc("statIncFormula").innerHTML = "((" + game.i[1].count * (game.u[1].count + 1) + "*" + (game.i[2].count + 1) * (game.u[2].count + 1) + ")^(" + ((game.i[3].count + 1) * (1 + (game.u[3].count / 10)) + "))*" + d((1 + Math.log10(game.pp.x + 1)), 2);
  doc("statAInterval").innerHTML = game.ainterval;
  doc("statPPTotal").innerHTML = game.pp.total
  doc("statPPTotal").innerHTML = game.pp.total;
  doc("statPPBoost").innerHTML = d((1 + Math.log10(game.pp.x + 1)), 2);
  doc("statPi1Count").innerHTML = game.pi[1].count;
  doc("statPi2Count").innerHTML = game.pi[2].count;
  doc("statPi3Count").innerHTML = game.pi[3].count;
  doc("statPiFormula").innerHTML = "(" + (game.pi[1].count + 1) + "*" + (game.pi[2].count + 1) + ")^(" + (game.pi[3].count + 1) + ")";
}
function functions() {
  unlock();
  display();
  refresh();
}
function hide() {
  for (let i = 1; i < 3; i++) {
    doc("challenge" + i).style.display = "none";
  }
  for (let i = 1; i < 4; i++) {
    doc("increment" + i).style.display = "none";
    doc("upgrade" + i).style.display = "none";
    doc("u" + i + "text").style.display = "none";
  }
  for (let i = 0; i < 4; i++) {
    doc("automate" + i).style.display = "none";
    doc("pincrement" + i).style.display = "none";
  }
  doc("scale1").style.display = "none";
  doc("scale2").style.display = "none";
  doc("scale7").style.display = "none";
  doc("scale8").style.display = "none";
  doc("prestigePointsTop").style.display = "none";
  doc("tabAutomation").style.display = "none";
  doc("tabScaling").style.display = "none";
  doc("tabPrestige").style.display = "none";
  doc("subTabChallenges").style.display = "none";
  doc("subTabPincrements").style.display = "none";
  doc("cctext").style.display = "none";
  doc("ccomplete").style.display = "none";
  doc("exit").style.display = "none";
  doc("stats").style.display = "none";
}
function tab(n) {
  document.getElementById("tab1").style.display = "none";
  document.getElementById("tab2").style.display = "none";
  document.getElementById("tab4").style.display = "none";
  document.getElementById("tab5").style.display = "none";
  document.getElementById("tab6").style.display = "none";
  document.getElementById("tab7").style.display = "none";
  document.getElementById("tab8").style.display = "none";
  document.getElementById("tab9").style.display = "none";
  document.getElementById("tab" + n).style.display = "inline";
  if (n == 6) {
    document.getElementById("tab7").style.display = "inline";
  }
  if (n == 7 || n == 8 || n == 9) {
    document.getElementById("tab6").style.display = "inline";
  }
  game.inTab = n;
}
function e(num) {
  if (typeof num === "string") {
    return num;
  }
  else if (num >= 1e6) {
    return Number.parseFloat(num).toExponential(2);
  }
  else {
    return Number(num).toFixed();
  }
}
function d(num, i) {
  if (typeof num === "string") {
    return num;
  }
  else {
    return Number(num).toFixed(i);
  }
}
function doc(x) {
  return document.getElementById(x)
}

function load() {
  let data = JSON.parse(localStorage.getItem("gameFile"));
  if (data != null && typeof data != "undefined") {
    loadGame(data);
  }
}
function loadGame(data) {
  if (typeof data.version == "undefined" || (data.version[0] == 0 && data.version[1] == 0 && data.version[2] < 7)) {
    oldLoad(data);
  }
  else {
    newLoad(data);
  }
}
function oldLoad(data) {
  getGame();
  data.pptotal = data.pcount;
  if (typeof data.incrementHighest != "undefined") game.inc.highest = data.incrementHighest;
  if (typeof data.incrementTotal != "undefined") game.inc.total = data.incrementTotal;
  if (typeof data.incrementPrePrestige != "undefined") game.inc.prePrestige = data.incrementPrePrestige;
  if (typeof data.increment != "undefined") game.inc.x = data.increment;
  if (typeof data.i1 != "undefined") game.i[0].x = data.i1;
  if (typeof data.i2 != "undefined") game.i[1].x = data.i2;
  if (typeof data.i2cost != "undefined") game.i[1].cost = data.i2cost;
  if (typeof data.i2ount != "undefined") game.i[1].count = data.i2count;
  if (typeof data.i2quotient != "undefined") game.i[1].quotient = data.i2quotient;
  if (typeof data.i2base != "undefined") game.i[1].base = data.i2base;
  if (typeof data.i3 != "undefined") game.i[2].x = data.i3;
  if (typeof data.i3cost != "undefined") game.i[2].cost = data.i3cost;
  if (typeof data.i3count != "undefined") game.i[2].count = data.i3count;
  if (typeof data.i4 != "undefined") game.i[3].x = data.i4;
  if (typeof data.i4cost != "undefined") game.i[3].cost = data.i4cost;
  if (typeof data.i4count != "undefined") game.i[3].count = data.i4count;
  if (typeof data.i4costBase != "undefined") game.i[3].costBase = data.i4costBase;
  if (typeof data.s1cost != "undefined") game.s[1].cost = data.s1cost;
  if (typeof data.s1count != "undefined") game.s[1].count = data.s1count;
  if (typeof data.pptotal != "undefined") game.pp.total = data.pptotal;
  if (typeof data.pp != "undefined") game.pp.x = data.pp;
  if (typeof data.pcount != "undefined") game.pp.count = data.pcount;
  if (typeof data.refundAmount != "undefined") game.refundAmount = data.refundAmount;
  if (typeof data.u1cost != "undefined") game.u[1].cost = data.u1cost[data.u1count];
  if (typeof data.u1count != "undefined") game.u[1].count = data.u1count;
  if (typeof data.u2cost != "undefined") game.u[2].cost = data.u2cost[data.u2count];
  if (typeof data.u2count != "undefined") game.u[2].count = data.u2count;
  if (typeof data.u3cost != "undefined") game.u[3].cost = data.u3cost[data.u3count];
  if (typeof data.c1in != "undefined") game.c[1].in = data.c1in;
  if (typeof data.c1count != "undefined") game.c[1].count = data.c1count;
  if (typeof data.c1goal != "undefined") game.c[1].goal = data.c1goal;
  if (typeof data.ainterval != "undefined") game.ainterval = data.ainterval;
  if (typeof data.inTab != "undefined") game.inTab = data.inTab;
  hide();
  functions();
  tab(game.inTab);
}
function newLoad(data) {
  game = data;
  hide();
  functions();
  tab(game.inTab);
}
function loadToggle() {
  for (let i = 0; i < 4; i++) {
    if (game.a[i].condition == 1) {
      interval(i, 41);
    }
    document.getElementById("a" + i + "enabled").innerHTML = aenabled[game.a[i].condition];
  }
  if (game.stats.condition == 1) {
    document.getElementById("stats").style.display = "inline";
  }
}
setInterval(function() {
  localStorage.setItem("gameFile", JSON.stringify(game));
}, 1000);

function exportGame() {
  prompt("Copy and save this somewhere.", btoa(JSON.stringify(game)));
}
function importGame() {
  let data = JSON.parse(atob(prompt("Paste your save code here.")));
  if (data != null && typeof data != "undefined") {
    loadGame(data);
  }
}
function resetGame() {
  let confirmReset = confirm("Are you sure you want to reset?");
  if (confirmReset == true) {
    reset();
    setTimeout(function() {
      reset();
    }, 100);
  }
}
function reset() {
  localStorage.clear();
  game = getGame();
  hide();
  functions();
  tab(1);
  setTimeout(function() {
    window.location.reload(true);
  }, 1111);
}
function resetPrestige() {
  for (let i = 0; i < 4; i++) {
    game.a[i].count = 0;
    game.a[i].condition = 0;
  }
  setTimeout(function() {
    game.inc.x = 10;
    game.inc.prePrestige = 10;
    game.inc.total += 10;
    for (let i = 0; i < 4; i++) {
      game.i[i].count = 0;
    }
    functions();
  }, 100);
}
function stats() {
  game.stats.count++;
  game.stats.condition = game.stats.count % 2;
  if (game.stats.condition == 1) {
    document.getElementById("stats").style.display = "inline";
  }
  else {
    document.getElementById("stats").style.display = "none";
  }
}

function increment(i) {
  if (i == 0) {
    game.inc.x += game.i[0].x;
    game.inc.prePrestige += game.i[0].x;
    game.inc.total += game.i[0].x;
    game.i[0].count++;
    if (game.inc.x > game.inc.highest) {
      game.inc.highest = game.inc.x;
    }
  }
  for (let ii = 1; ii < 3; ii++) {
    if (i == ii && game.inc.x >= game.i[ii].cost) {
      game.inc.x -= game.i[ii].cost;
      game.i[ii].count++;
    }
  }
  if (i == 3 && game.inc.x >= game.i[3].cost[game.i[3].count]) {
    game.inc.x -= game.i[3].cost[game.i[3].count];
    game.i[3].count++;
  }
  functions();
}
function automate(a) {
  if (game.c[1].in == 0) {
    game.a[a].count++;
    game.a[a].condition = game.a[a].count % 2;
    interval(a, game.ainterval);
    document.getElementById("a" + a + "enabled").innerHTML = aenabled[game.a[a].condition];
  }
}
function scale(s) {
  if (game.inc.x >= game.s[s].cost[game.s[s].count] && game.s[s].count < game.s[s].max) {
    game.inc.x -= game.s[s].cost[game.s[s].count];
    game.s[s].count++;
    if (s == 1) {
      game.i[1].base = 8 * (0.7 ** game.s[1].count);
    }
    if (s == 2) {
      game.i[2].base--;
    }
    if (s == 7) {
      game.i[2].quotient = 1.11;
    }
    if (s == 8) {
      
    }
    functions();
  }
}

function refund() {
  let confirmRefund = confirm("Are you sure you want to refund Upgrades?");
  if (confirmRefund == true) {
    rerefund();
  }
}
function rerefund() {
  for (let i = 1; i < 4; i++) {
    if (game.u[i].count > 0) {
      game.u[i].count--;
      display();
      game.pp.x += game.u[i].cost;
      game.refundAmount -= game.u[i].cost;
    }
  }
  if (game.u[1].count > 0 || game.u[2].count > 0 || game.u[3].count > 0) {
    rerefund();
  }
  else {
    game.i[2].quotient = 1.11;
    game.i[3].cost = [100000, 1e12, 1e24, 1e48, 1e96, 1e192];
    functions();
  }
}
function prestige() {
  if (game.inc.prePrestige >= 1e8) {
    let confirmPrestige = confirm("Are you sure you want to prestige? You will lose your Increments and Automates.")
    if (confirmPrestige == true) {
      resetPrestige();
      game.pp.x += game.pp.gain;
      game.pp.total += game.pp.gain;
      game.pp.count++;
      for (let i = 0; i < 4; i++) {
        document.getElementById("a" + i + "enabled").innerHTML = "Disabled";
      }
      setTimeout(function() {
        hide();
        functions();
        tab(7)
      }, 100);
    }
  }
  else {
    let confirmPrestigeNone = confirm("You need 1e8 Increment to gain Prestige Points. Are you sure you want to prestige? You wil lose your Increments and Automates.");
    if (confirmPrestigeNone == true) {
      resetPrestige();
      document.getElementById("unlockI").innerHTML = "Increment 2";
      document.getElementById("unlockA").innerHTML = "Automate 1";
      document.getElementById("unlockS").innerHTML = "Scale 1";
      for (let i = 0; i < 4; i++) {
        document.getElementById("a" + i + "enabled").innerHTML = "Disabled";
      }
      setTimeout(function() {
        hide();
        functions();
        tab(7);
      }, 100);
    }
  }
}
function upgrade(u) {
  if (game.pp.x >= game.u[u].cost && game.u[u].count < game.u[u].max && game.inc.prePrestige == 10 && game.c[2].in == 0) {
    game.pp.x -= game.u[u].cost;
    game.refundAmount += game.u[u].cost;
    game.u[u].count++;
    if (u == 1 && game.s[7].count == 0) {
      game.i[2].quotient -= 0.01;
    }
    if (u == 3) {
     for (let i = 0; i < game.i[3].cost.length; i++) {
        game.i[3].cost[i] = game.i[3].costBase[i] * (3 ** (i + game.u[3].count));
      }
    }
  }
  functions();
}

function challenge(c) {
  let confirmChallenge = confirm("Are you sure you want to start a Challenge? You will lose your Increments and Automates.");
  if (confirmChallenge == true) {
    if (c == 1 && game.c[1].count < 10) {
      game.c[1].in = 1;
      game.cin = 1;
      for (let i = 0; i < 4; i++) {
        game.a[i].count = 0;
        game.a[i].condition = 0;
      }
      doc("a0enabled").innerHTML = "Disabled";
      doc("a1enabled").innerHTML = "Disabled";
      doc("a2enabled").innerHTML = "Disabled";
      doc("a3enabled").innerHTML = "Disabled";
    }
    if (c == 2 && game.c[2].count < 10) {
      game.c[2].in = 1;
      game.cin = 2;
      rerefund();
    }
    doc("exit").style.display = "inline";
    resetPrestige();
    setTimeout(function() {
      hide();
      functions();
      tab(8);
    }, 100);
  }
}
function ccomplete() {
  if (game.c[1].in == 1 && game.inc.x >= game.c[1].goal[game.c[1].count]) {
    game.ainterval -= 4;
  }
  if (game.c[2].in == 1 && game.inc.x >= game.c[2].goal[game.c[2].count]) {
    for (let i = 1; i < 4; i++) {
      game.u[i].max++;
    }
  }
  for (let i = 1; i < 3; i++) {
    if (game.c[i].in == 1 && game.inc.x >= game.c[i].goal[game.c[i].count]) {
      game.c[i].in = 0;
      game.c[i].count++;
    }
  }
  game.cin = 0;
  exit();
}
function exit() {
  for (let i = 1; i < 3; i++) {
    game.c[i].in = 0;
  }
  for (let i = 1; i < 4; i++) {
    document.getElementById("a" + i + "enabled").innerHTML = "Disabled"; 
  }
  game.cin = 0;
  resetPrestige();
  setTimeout(function() {
    hide();
    functions();
    tab(8);
  }, 100);
}

function pincrement(p) {
  if (game.pp.x >= game.pi[p].cost) {
    game.pp.x -= game.pi[p].cost;
    game.pi[p].count++;
    functions();
  }
}

game.version = [0, 0, 7];
hide();
load();
loadToggle();
functions();
tab(game.inTab);
