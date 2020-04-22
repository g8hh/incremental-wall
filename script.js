//Declare vars, game state is initialized in `game` using `setGame()`
function setGame() {
  return {
    inc: {x: 10, prestige: 10, total: 10},
    i: [{x: 0}, {x: 1, count: 0, cost: 10}, {x: 1, count: 0, cost: 1000}, {x: 1, count: 0, cost: 100000}],
    a: {count: [0, 0, 0, 0], rate: 25, prestige: {count: 0, at: null}},
    aa: [0, 0, 0, 0],
    s: [null, {count: 0, cost: [1e20, 1e21, 1e23, "Max", "Max", "Max"]}, {count: 0, cost: [1e22, "Max", "Max", "Max", "Max", "Max"]}, {count: 0, cost: [1e24, "Max", "Max", "Max", "Max", "Max"]}],
    pp: {x: 0, total: 0, gain: 1, req: 1e9, refund: 0, start: 0, end: 0, time: Infinity, best: Infinity},
    u: [null, {count: 0, max: 5, cost: 1}, {count: 0, max: 5, cost: 2}, {count: 0, max: 5, cost: 10}],
    pi: [null, {x: 0, count: 0, cost: 10}, {x: 0, count: 0, cost: 1000}, {x: 0, count: 0, cost: 1e6}],
    c: [null, {in: false, count: 0, goal: [1e12, 1e17, 1e19, 4.92e20, "Completed", "Completed"]}, {in: false, count: 0, goal: [5.12e9, 2.5e10, "Completed", "Completed", "Completed", "Completed", "Completed", "Completed", "Completed", "Completed", "Completed"]}, {in: false, count: 0, goal: [1e8, "Completed", "Completed", "Completed", "Completed", "Completed"]}, {in: false, count: 0, goal: [2.43e19, "Completed", "Completed", "Completed", "Completed", "Completed"]}],
    unlocked: {scaling: false},
    confirm: {reset: 1, prestige: 1, challenge: 1, WIP: 1},
    stats: 0,
    inTab: 1,
    inSubTab: 1,
    version: [0, 0, 9],
  }
}
var game = setGame();
var canComChall = false;
var c4effect = 1;
var ppgainLastPrestige = 0;
var ppLastTen = [];
var ppAverage = 0;
var pressed = {a: false, p: false, r: false, one: false, two: false, shift: false}
var cmax = [null, 4, 2, 1, 1];
const trued = [false, true];
const enabled = ["Disabled", "Enabled"];

//Automation loops
const interval = (a, rate) => {
  setTimeout(() => {
    if (((game.a.count[0] % 2) == 1 || (game.a.count[2] % 2) == 1 || (game.a.count[3] % 2) == 1) && a != 1) {increment(a)}
    if ((game.a.count[0] % 2) == 1) {doc("incxTopSec").innerHTML = e(game.i[0].x * game.a.rate, 2)}
    else {doc("incxTopSec").innerHTML = 0}
    if ((game.a.count[1] % 2) == 1 && (game.inc.x >= (game.i[1].cost * 10) || game.inc.x == game.i[1].cost)) {increment(a)}
    if ((game.a.count[a] % 2) == 1) {interval(a, rate)}
  }, (1000 / rate));
}
const alayer = (a, rate) => {
  setTimeout(() => {
    if (a == 'prestige' && game.inc.prestige >= game.pp.req && game.a.prestige.at != null && game.pp.gain >= game.a.prestige.at) {
      prestige();
    }
    if (a == 'prestige' && (game.a.prestige.count % 2) == 1) {
      alayer(a, rate);
      doc("ppxTopSec").innerHTML = e(ppAverage, 2, 0);
    }
    else {doc("ppxTopSec").innerHTML = 0}
  }, (1000 / rate));
}

//Functions relating to changes to the save data
function save() {localStorage.setItem("game", JSON.stringify(game))}
function confirmReset() {
  if ((game.confirm.reset % 2) == 1) {
    let confirmed = confirm("Are you sure you want to reset? You will lose all of your progress!");
    if (confirmed) {reset()}
  }
  else {reset()}
}
function reset() {
  game = setGame();
  canComChall = false;
  c4effect = 1;
  ppgainLastPrestige = 0;
  ppLastTen = [];
  ppAverage = 0;
  for (let i = 1; i < 4; i++) {game.i[i].count = 0}
  values();
  game.inc.x = game.i[1].cost;
  game.inc.prestige = game.i[1].cost;
  for (let i = 0; i < 4; i++) {
    doc("a" + i + "enabled").innerHTML = enabled[game.a.count[i] % 2];
    doc("aa" + i + "enabled").innerHTML = enabled[game.aa[i] % 2]
  }
  hide();
  functions();
  loadToggle();
  tab(1);
}
function resetPrestige() {
  for (let i = 0; i < 4; i++) {
    if ((game.a.count[i] % 2) == 1 && ((game.aa[i] % 2) == 0) || game.c[1].in == true) {game.a.count[i] = 0}
    if ((game.a.count[i] % 2) == 0 && (game.aa[i] % 2) == 1 && game.c[1].in == false) {automate(i)}
    if ((game.aa[i] % 2) == 1 && game.c[1].in == true) {game.aa[i] = 0}
    doc("a" + i + "enabled").innerHTML = enabled[game.a.count[i] % 2];
    doc("aa" + i + "enabled").innerHTML = enabled[game.aa[i] % 2];
  }
  game.i[1].count = 0;
  game.i[2].count = 0;
  game.i[3].count = 0;
  values();
  game.inc.x = game.i[1].cost;
  game.inc.prestige = game.i[1].cost;
  functions();
}
function load() {
  let data = JSON.parse(localStorage.getItem("game"));
  if (localStorage.getItem("gameFile") != null) {data = localStorage.getItem("gameFile"); localStorage.removeItem("gameFile")}
  if (data != null) {loadGame(data)}
}
function loadGame(data) {
  console.log("Loaded Game")
  game = setGame();
  if (typeof data.version == "undefined") {
    game.inc.x = data.increment;
    game.inc.prestige = data.incrementPrePrestige;
    game.inc.total = data.incrementTotal;
    game.pp.x = data.pp;
    game.pp.total = data.pp;
    for (let i = 0; i < data.u1count; i++) {game.pp.x += data.u1cost[i]; game.pp.total += data.u1cost[i]}
    for (let i = 0; i < data.u2count; i++) {game.pp.x += data.u2cost[i]; game.pp.total += data.u2cost[i]}
    for (let i = 0; i < data.u3count; i++) {game.pp.x += data.u3cost[i]; game.pp.total += data.u3cost[i]}
    if (data.c1count == 2) {game.c[1].count = 1}
    game.a.rate = 25 + (15 * game.c[1].count);
    console.log("Loaded version 0.0.0 - 0.0.6");
  }
  else if (data.version[0] == 0 && data.version[1] == 0 && data.version[2] == 7) {
    game.inc.total = data.inc.total;
    game.pp.x = data.pp.total;
    game.pp.total = data.pp.total;
    if (data.c[1].count >= 2) {game.c[1].count = 2}
    if (data.c[1].count >= 4) {game.c[1].count = 3}
    if (data.c[1].count >= 6) {game.c[1].count = 4}
    if (data.c[2].count >= 2) {game.c[2].count = 1}
    if (data.c[2].count >= 3) {game.c[2].count = 2}
    game.a.rate = 25 + (15 * game.c[1].count);
    for (let i = 1; i <= game.c[2].count; i++) {for (let j = 1; j < 4; j++) {game.u[j].max++}}
    console.log("Loaded version 0.0.7");
  }
  else {
    if (typeof data.inc.x != "undefined") game.inc.x = data.inc.x;
    if (typeof data.inc.prestige != "undefined") game.inc.prestige = data.inc.prestige;
    if (typeof data.inc.total != "undefined") game.inc.total = data.inc.total;
    if (typeof data.i[0].x != "undefined") game.i[0].x = data.i[0].x;
    if (typeof data.i[1].x != "undefined") game.i[1].x = data.i[1].x;
    if (typeof data.i[1].count != "undefined") game.i[1].count = data.i[1].count;
    if (typeof data.i[1].cost != "undefined") game.i[1].cost = data.i[1].cost;
    if (typeof data.i[2].x != "undefined") game.i[2].x = data.i[2].x;
    if (typeof data.i[2].count != "undefined") game.i[2].count = data.i[2].count;
    if (typeof data.i[2].cost != "undefined") game.i[2].cost = data.i[2].cost;
    if (typeof data.i[3].x != "undefined") game.i[3].x = data.i[3].x;
    if (typeof data.i[3].count != "undefined") game.i[3].count = data.i[3].count;
    if (typeof data.i[3].cost != "undefined") game.i[3].cost = data.i[3].cost;
    if (typeof data.a.count != "undefined") game.a.count = data.a.count;
    if (typeof data.a.rate != "undefined") game.a.rate = data.a.rate;
    if (typeof data.a.prestige.count != "undefined") game.a.prestige.count = data.a.prestige.count;
    if (typeof data.a.prestige.at != "undefined") game.a.prestige.at = data.a.prestige.at;
    if (typeof data.aa != "undefined") game.aa = data.aa;
    if (typeof data.s[1].count != "undefined") game.s[1].count = data.s[1].count;
    if (typeof data.s[1].cost != "undefined") game.s[1].cost = data.s[1].cost;
    if (typeof data.s[2].count != "undefined") game.s[2].count = data.s[2].count;
    if (typeof data.s[2].cost != "undefined") game.s[2].cost = data.s[2].cost;
    if (typeof data.s[3].count != "undefined") game.s[3].count = data.s[3].count;
    if (typeof data.s[3].cost != "undefined") game.s[3].cost = data.s[3].cost;
    if (typeof data.pp.x != "undefined") game.pp.x = data.pp.x;
    if (typeof data.pp.total != "undefined") game.pp.total = data.pp.total;
    if (typeof data.pp.gain != "undefined") game.pp.gain = data.pp.gain;
    if (typeof data.pp.req != "undefined") game.pp.req = data.pp.req;
    if (typeof data.pp.refund != "undefined") game.pp.refund = data.pp.refund
    if (typeof data.pp.start != "undefined") game.pp.start = data.pp.start;
    if (typeof data.pp.end != "undefined") game.pp.end = data.pp.end;
    if (typeof data.pp.time != "undefined") game.pp.time = data.pp.time;
    if (typeof data.pp.best != "undefined") game.pp.best = data.pp.best;
    if (typeof data.u[1].cost != "undefined") game.u[1].cost = data.u[1].cost;
    if (typeof data.u[1].max != "undefined") game.u[1].max = data.u[1].max;
    if (typeof data.u[1].count != "undefined") game.u[1].count = data.u[1].count;
    if (typeof data.u[2].cost != "undefined") game.u[2].cost = data.u[2].cost;
    if (typeof data.u[2].max != "undefined") game.u[2].max = data.u[2].max;
    if (typeof data.u[2].count != "undefined") game.u[2].count = data.u[2].count;
    if (typeof data.u[3].cost != "undefined") game.u[3].cost = data.u[3].cost;
    if (typeof data.u[3].max != "undefined") game.u[3].max = data.u[3].max;
    if (typeof data.u[3].count != "undefined") game.u[3].count = data.u[3].count;
    if (typeof data.pi[1].x != "undefined") game.pi[1].x = data.pi[1].x;
    if (typeof data.pi[1].count != "undefined") game.pi[1].count = data.pi[1].count;
    if (typeof data.pi[1].cost != "undefined") game.pi[1].cost = data.pi[1].cost;
    if (typeof data.pi[2].x != "undefined") game.pi[2].x = data.pi[2].x;
    if (typeof data.pi[2].count != "undefined") game.pi[2].count = data.pi[2].count;
    if (typeof data.pi[2].cost != "undefined") game.pi[2].cost = data.pi[2].cost;
    if (typeof data.pi[3].x != "undefined") game.pi[3].x = data.pi[3].x;
    if (typeof data.pi[3].count != "undefined") game.pi[3].count = data.pi[3].count;
    if (typeof data.pi[3].cost != "undefined") game.pi[3].cost = data.pi[3].cost;
    if (typeof data.c[1].in != "undefined") game.c[1].in = data.c[1].in;
    if (typeof data.c[1].count != "undefined") game.c[1].count = data.c[1].count;
    if (typeof data.c[1].cost != "undefined") game.c[1].cost = data.c[1].cost;
    if (typeof data.c[2].in != "undefined") game.c[2].in = data.c[2].in;
    if (typeof data.c[2].count != "undefined") game.c[2].count = data.c[2].count;
    if (typeof data.c[2].cost != "undefined") game.c[2].cost = data.c[2].cost;
    if (typeof data.c[3].in != "undefined") game.c[3].in = data.c[3].in;
    if (typeof data.c[3].count != "undefined") game.c[3].count = data.c[3].count;
    if (typeof data.c[3].cost != "undefined") game.c[3].cost = data.c[3].cost;
    if (typeof data.c[4].in != "undefined") game.c[4].in = data.c[4].in;
    if (typeof data.c[4].count != "undefined") game.c[4].count = data.c[4].count;
    if (typeof data.c[4].cost != "undefined") game.c[4].cost = data.c[4].cost;
    if (typeof data.unlocked != "undefined") game.unlocked = data.unlocked;
    if (typeof data.confirm.reset != "undefined") game.confirm.reset = data.confirm.reset;
    if (typeof data.confirm.prestige != "undefined") game.confirm.prestige = data.confirm.prestige;
    if (typeof data.confirm.challenge != "undefined") game.confirm.challenge = data.confirm.challenge;
    if (typeof data.confirm.WIP != "undefined") game.confirm.WIP = data.confirm.WIP;
    if (typeof data.stats != "undefined") game.stats = data.stats;
    if (typeof data.inTab != "undefined") game.inTab = data.inTab;
    if (typeof data.inSubTab != "undefined") game.inSubTab = data.inSubTab;
    console.log("Loaded version " + game.version[0] + "." + game.version[1] + "." + game.version[2])
  }
  hide();
  functions();
  render();
  tab(game.inTab);
  if (game.inTab == 6) {subTab(game.inSubTab)}
}
function loadToggle() {
  for (let i = 0; i < 4; i++) {
    if ((game.a.count[i] % 2) == 1 && (game.aa[i] % 2) == 0 && game.c[1].in == false) {interval(i, game.a.rate)}
    if ((game.a.count[i] % 2) == 1 && (game.aa[i] % 2) == 1 && game.c[1].in == false) {interval(i, game.a.rate)}
    if ((game.a.prestige.count % 2) == 1) {alayer('prestige', game.a.rate)}
    doc("a" + i + "enabled").innerHTML = enabled[game.a.count[i] % 2];
    doc("aa" + i + "enabled").innerHTML = enabled[game.aa[i] % 2];
    doc("aprestigeenabled").innerHTML = enabled[game.a.prestige.count % 2]
    doc("apenabledInput").checked = trued[game.a.prestige.count % 2];
    doc("aprestigeat").value = game.a.prestige.at;
    if ((game.confirm.reset % 2) == 1) {doc("ocReset").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.reset % 2) == 0) {doc("ocReset").style.backgroundColor = "rgb(225, 0, 0)"}
    if ((game.confirm.prestige % 2) == 1) {doc("ocPrestige").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.prestige % 2) == 0) {doc("ocPrestige").style.backgroundColor = "rgb(225, 0, 0)"}
    if ((game.confirm.challenge % 2) == 1) {doc("ocChallenge").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.challenge % 2) == 0) {doc("ocChallenge").style.backgroundColor = "rgb(225, 0, 0)"}
    if ((game.confirm.WIP % 2) == 1) {doc("ocWIP").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.WIP % 2) == 0) {doc("ocWIP").style.backgroundColor = "rgb(225, 0, 0)"}
    if ((game.stats % 2) == 1) {
      doc("stats").style.display = "inline";
      doc("ocStats").style.backgroundColor = "rgb(34, 139, 34)";
    }
    if ((game.stats % 2) == 0) {
      doc("stats").style.display = "none";
      doc("ocStats").style.backgroundColor = "rgb(255, 0, 0)";
    }
  }
}
function exporty() {copyStringToClipboard(btoa(JSON.stringify(game)))}
function importy() {let data = JSON.parse(atob(prompt("Paste your save code here."))); if (data !== "") {loadGame(data)}}
load();
setInterval (function () {localStorage.setItem("game", JSON.stringify(game))}, 1000);

//Useful/convenient functions
function doc(x) {return document.getElementById(x)}
function tab(t) {
  doc("tab1").style.display = "none";
  doc("tab2").style.display = "none";
  doc("tab4").style.display = "none";
  doc("tab5").style.display = "none";
  doc("tab6").style.display = "none";
  doc("subTab1").style.display = "none";
  doc("subTab2").style.display = "none";
  doc("subTab3").style.display = "none";
  doc("tab" + t).style.display = "inline";
  game.inTab = t;
  if (t == 6) {subTab(game.inSubTab)}
}
function subTab(s) {
  doc("subTab1").style.display = "none";
  doc("subTab2").style.display = "none";
  doc("subTab3").style.display = "none";
  doc("subTab" + s).style.display = "inline";
  game.inSubTab = s;
}
function e(num, exp, dec) {
  if (typeof num == "string") {return num} else if (num >= 1e6) {return Number(num).toExponential(exp)} else {return num.toFixed(dec)}
}
/*function time2(time){ // works now
  if (typeof x == "NaN") {return "Infinity Years"}
  let x = Math.round(time / 1000);
  let temp = 0;
  let name = "";
  let first = true;
  if (x > 3.1536e6){temp = Math.floor(x/3.1536e6);x -= temp*3.1536e6;name += temp + " Years, ";if (first){first = false}else{return name.slice(0,-2)}}
  if (x > 86400){temp = Math.floor(x/86400);x -= temp*86400;name += temp + " Days, ";if (first){first = false}else{return name.slice(0,-2)}}
  if (x > 3600){temp = Math.floor(x/3600);x -= temp*3600;name += temp + " Hours, ";if (first){first = false}else{return name.slice(0,-2)}}
  if (x > 60){temp = Math.floor(x/60);x -= temp*60;name += temp + " Minutes, ";if (first){first = false}else{return name.slice(0,-2)}}
  name += x + " Seconds"
  return name
}*/
function time(time) {
  let x = Math.round(time / 1000);
  if (x == Infinity) {return "Infinity Years"}
  if (x >= 3.1536e6) {return Math.floor(x / 3.1536e6) + " Years, " + Math.floor((x % 3.1536e6) / 86400) + " Days"}
  if (x >= 86400) {return Math.floor(x / 86400) + " Days, " + Math.floor((x % 86400) / 3600) + " Hours"}
  if (x >= 3600) {return Math.floor(x / 3600) + " Hours, " + Math.floor((x % 3600) / 60) + " Minutes"}
  if (x >= 60) {return Math.floor(x / 60) + " Minutes, " + Math.floor(x % 60) + " Seconds"}
  if (x >= 0) {return Math.floor(x) + " Seconds"}
}
function timeJoke(time){//lol
  time /= 1000
  if (typeof x == "NaN") {return "Infinity Wars"}
  if (time > 3.1536e6){return "Go finish AD while you wait"}
  if (time > 86400){return "Prepare to wait, this is gonna take some days"}
  if (time > 3600){return "Hey with some patience you might see it finish"}
  if (time > 60){return "Oh timers dropping, too bad you can't see it"}
  return "Think you should give up..."
}
//Display related functions
function functions() {unlock(); values(); display()}
function unlock() {
  if (game.pp.total == 0) {doc("unlockIncType").innerHTML = "Automation"}
  if (game.pp.total == 0) {doc("unlockIncReq").innerHTML = 2500 - game.inc.prestige}
  doc("unlockPincReq").innerHTML = 1 - game.pp.total;
  if ((game.a.prestige.count % 2) == 0) {doc("unlockI").style.display = "inline"}
  doc("unlockIReq").innerHTML = 1000 - game.inc.prestige;
  doc("unlockAReq").style.color = "#9600d2"
  doc("unlockAReq").innerHTML = 2500 - game.inc.prestige;
  doc("unlockACurrency").innerHTML = "Increment";
  doc("unlockPiReq").innerHTML = 10 - game.pp.total;
  if (game.inc.prestige >= 1000) {doc("unlockIReq").innerHTML = e(100000 - game.inc.prestige, 2); doc("i2").style.display = "inline"}
  if (game.inc.prestige >= 2500) {
    if (game.pp.total == 0) {doc("unlockIncType").innerHTML = "Prestige"}
    if (game.pp.total == 0) {doc("unlockIncReq").innerHTML = e(1e9 - game.inc.prestige, 2)}
    doc("incTopSec").style.display = "inline";
    doc("unlockAReq").innerHTML = 250000 - game.inc.prestige;
    doc("unlockA").style.display = "inline";
    doc("tabAutomation").style.display = "inline";
    doc("ai0").style.display = "inline";
  }
  if (game.inc.prestige >= 250000) {doc("unlockAReq").innerHTML = e(2.5e7 - game.inc.prestige, 2); doc("ai1").style.display = "inline"}
  if (game.inc.prestige >= 100000) {doc("unlockI").style.display = "none"; doc("i3").style.display = "inline"}
  if (game.inc.prestige >= 2.5e7) {doc("unlockAReq").innerHTML = e(2.5e9 - game.inc.prestige, 2); doc("ai2").style.display = "inline"}
  if (game.inc.prestige >= 1e9) {
    doc("unlockIncType").innerHTML = "Increment Scaling";
    doc("unlockIncReq").innerHTML = e(1e22 - game.inc.prestige, 2);
    doc("unlockPinc").style.display = "inline";
    doc("tabPrestige").style.display = "inline";
  }
  if (game.inc.prestige >= 2.5e9) {
    doc("unlockAReq").style.color = "#0000c8";
    doc("unlockAReq").innerHTML = 5 - game.pp.total;
    doc("unlockACurrency").innerHTML = "Prestige Points";
    doc("ai3").style.display = "inline";
  }
  if (game.inc.prestige >= 1e22) {game.unlocked.scaling = true}
  if (game.unlocked.scaling == true) {doc("unlockInc").style.display = "none"; doc("tabScaling").style.display = "inline"}
  if (game.pp.total >= 1) {
    doc("unlockPinc").style.display = "inline";
    doc("unlockPincType").innerHTML = "Pincrements";
    doc("unlockPincReq").innerHTML = 10 - game.pp.total;
    doc("unlockA").style.display = "inline";
    doc("ppTop").style.display = "inline";
    doc("tabAutomation").style.display = "inline";
    doc("tabPrestige").style.display = "inline";
    doc("subTabUpgrades").style.display = "inline";
    doc("refund").style.display = "inline";
    doc("u1").style.display = "inline";
    doc("u2").style.display = "inline";
    doc("u3").style.display = "inline";
  }
  if (game.pp.total >= 5) {
    doc("incTopSec").style.display = "inline";
    doc("unlockAReq").innerHTML = 250000 - game.inc.prestige;
    if (game.inc.prestige >= 250000) {doc("unlockAReq").innerHTML = e(2.5e7 - game.inc.prestige, 2)}
    if (game.inc.prestige >= 2.5e7) {doc("unlockAReq").innerHTML = e(2.5e9 - game.inc.prestige, 2)}
    if (game.inc.prestige >= 2.5e9) {doc("unlockAReq").innerHTML = 31 - game.pp.total}
    doc("ai0").style.display = "inline";
    doc("aa0").style.display = "inline";
  }
  if (game.pp.total >= 10) {
    doc("unlockPincType").innerHTML = "Challenges";
    doc("unlockPincReq").innerHTML = 25 - game.pp.total;
    doc("unlockPi").style.display = "inline";
    doc("unlockPiReq").innerHTML = 1000 - game.pp.total;
    doc("subTabPincrements").style.display = "inline";
    doc("pi1").style.display = "inline";
  }
  if (game.pp.total >= 25) {doc("unlockPinc").style.display = "none"; doc("subTabChallenges").style.display = "inline"}
  if (game.pp.total >= 31) {
    doc("unlockAReq").innerHTML = 2.5e7 - game.inc.prestige;
    if (game.inc.prestige >= 2.5e7) {doc("unlockAReq").innerHTML = e(2.5e9 - game.inc.prestige, 2)}
    if (game.inc.prestige >= 2.5e9) {doc("unlockAReq").innerHTML = 177 - game.pp.total}
    doc("ai1").style.display = "inline";
    doc("aa1").style.display = "inline";
  }
  if (game.pp.total >= 177) {
    doc("unlockAReq").innerHTML = e(2.5e9 - game.inc.prestige, 2);
    if (game.inc.prestige >= 2.5e9) {doc("unlockAReq").innerHTML = e(1000 - game.pp.total, 2)}
    doc("ai2").style.display = "inline";
    doc("aa2").style.display = "inline";
  }
  if (game.pp.total >= 1000) {
    doc("unlockAReq").style.color = "#0000c8";
    doc("unlockAReq").innerHTML = 10000 - game.pp.total;
    doc("unlockACurrency").innerHTML = "Prestige Points";
    doc("ai3").style.display = "inline";
    doc("aa3").style.display = "inline";
    doc("unlockPiReq").innerHTML = 1e6 - game.pp.total;
    doc("pi2").style.display = "inline";
  }
  if (game.pp.total >= 10000) {
    doc("ppTopSec").style.display = "inline";
    doc("unlockA").style.display = "none";
    doc("aprestige").style.display = "inline";
  }
  if (game.pp.total >= 1e6) {doc("unlockPi").style.display = "none"; doc("pi3").style.display = "inline"}
  for (let i = 1; i < 5; i++) {
    if (game.c[i].in == true) {
      doc("cprogress").style.display = "inline";
      doc("cprogressTime").style.display = "inline";
      doc("cnum").innerHTML = i;
      doc("cnumTime").innerHTML = i;
      doc("cgoal").innerHTML = e(game.c[i].goal[game.c[i].count] - game.inc.prestige, 2);
      if ((game.a.count[0] % 2) == 1) {doc("ctime").innerHTML = time((game.c[i].goal[game.c[i].count] - game.inc.prestige) / (game.i[0].x * (1 / game.a.rate)))}
      else {doc("ctime").innerHTML = "Infinity Years"}
      if (game.inc.prestige >= game.c[i].goal[game.c[i].count]) {
        doc("cprogress").style.display = "none";
        doc("cprogressTime").style.display = "none";
        doc("ccomplete").style.display = "inline";
      }
    }
  }
  if ((game.stats % 2) == 1) {doc("stats").style.display = "inline"}
  if ((game.stats % 2) == 0) {doc("stats").style.display = "none"}
}
function values() {
  game.i[0].x = Math.floor((((game.i[1].count * (game.u[1].count + 1)) * ((game.i[2].count + 1) * (game.u[2].count + 1))) ** ((game.i[3].count + 1) * (1 + (game.u[3].count / 30)))) * ((1 + Math.log10(game.pp.x + 1)) ** 1.20484));
  game.i[1].x = (Math.floor((((game.i[1].count + 1) * (game.u[1].count + 1)) * ((game.i[2].count + 1) * (game.u[2].count + 1))) ** ((game.i[3].count + 1) * (1 + (game.u[3].count / 30)))) * ((1 + Math.log10(game.pp.x + 1)) ** 1.20484)) - Math.floor((((game.i[1].count * (game.u[1].count + 1)) * ((game.i[2].count + 1) * (game.u[2].count + 1))) ** ((game.i[3].count + 1) * (1 + (game.u[3].count / 30)))) * ((1 + Math.log10(game.pp.x + 1)) ** 1.20484));
  game.i[2].x = (game.i[2].count + 1) * (game.u[2].count + 1);
  game.i[3].x = (game.i[3].count + 1) * (1 + (game.u[3].count / 30));
  game.i[1].cost = Math.floor((10 * (2 ** ((game.i[1].count / (1.14 ** (game.c[3].count + 1))) * Math.log10(8 - game.s[1].count))) / ((1.16 - (0.16 * (0 ** game.i[1].count))) - (game.u[1].count / 100))) * (c4effect ** (game.i[1].count + game.i[2].count + game.i[3].count)));
  game.i[2].cost = Math.floor(((1000 * ((10 - game.s[2].count) ** (game.i[2].count / (1.25 ** game.c[3].count)))) ** (1.02 ** game.u[2].count)) * (c4effect ** (game.i[1].count + game.i[2].count + game.i[3].count)));
  game.i[3].cost = Math.floor((((10 - (0.2 * game.c[3].count)) ** ((6 - (game.s[3].count / 10)) * (2 ** game.i[3].count))) * (3 ** game.u[3].count)) * (c4effect ** (game.i[1].count + game.i[2].count + game.i[3].count)));
  if (game.i[3].count == 0) {game.i[3].cost = Math.floor((((10 - (0.2 * game.c[3].count)) ** 5) * (3 ** game.u[3].count)) * (c4effect ** (game.i[1].count + game.i[2].count + game.i[3].count)))}
  if (game.c[3].in == true) {
  game.i[1].cost = Math.floor(100000 * (2 ** ((game.i[1].count / 1.14) * Math.log10(8 - game.s[1].count))) / ((1.16 - (0.16 * (0 ** game.i[1].count))) - (game.u[1].count / 100)));
  game.i[2].cost = Math.floor((1e6 * ((10 - game.s[2].count) ** game.i[2].count)) ** (1.02 ** game.u[2].count));
  game.i[3].cost = Math.floor(((10 - (0.2 * game.c[3].count)) ** ((10 - (game.s[3].count / 10)) * (2 ** game.i[3].count)) * (3 ** game.u[3].count)));
    if (game.i[3].count == 0) {game.i[3].cost = 1e9 * (3 ** game.u[3].count)}
  }
  if (game.inc.prestige >= game.pp.req) {
    game.pp.gain = ((game.pi[1].count * (game.pi[2].count + 1)) ** (game.pi[3].count + 1)) + Math.floor(((Math.abs(Math.log10(game.inc.prestige) - (Math.log10(game.pp.req) - 1)) - ((Math.log10(game.pp.req) - 1) - Math.log10(game.inc.prestige))) / 4) + 0.5);
  }
  else {game.pp.gain = 0}
  if (game.pp.time < game.pp.best && game.pp.gain != 0) {game.pp.best = game.pp.time}
  game.u[1].cost = Math.floor((game.u[1].count + 1) ** 1.25);
  game.u[2].cost = Math.ceil(1 + (1.99 ** (game.u[2].count * 1.2)));
  game.u[3].cost = Math.floor(10 ** ((game.u[3].count + 1) * 1.05));
  game.pi[1].x = (((game.pi[1].count + 1) * (game.pi[2].count + 1)) ** (game.pi[3].count + 1)) - ((game.pi[1].count * (game.pi[2].count + 1)) ** (game.pi[3].count + 1));
  game.pi[2].x = game.pi[2].count + 1;
  game.pi[3].x = game.pi[3].count + 1;
  game.pi[1].cost = Math.ceil(10 * (1.25 ** (game.pi[1].count * 1.1)));
  game.pi[2].cost = Math.floor(1000 * (7.5 ** game.pi[2].count));
  game.pi[3].cost = 10 ** (6 * (2 ** game.pi[3].count));
}
function display() {
  let ppReqNext = game.pp.req * (100 ** Math.floor(((Math.abs(Math.log10(game.inc.prestige) - (Math.log10(game.pp.req) - 1)) - ((Math.log10(game.pp.req) - 1) - Math.log10(game.inc.prestige))) / 4) + 0.5));
  doc("ppxTop").innerHTML = e(game.pp.x, 2); 
  doc("incxTop").innerHTML = e(game.inc.x, 2);
  doc("ppxTab").innerHTML = e(game.pp.x, 2);
  doc("ppboostTab").innerHTML = e((1 + Math.log10(game.pp.x + 1)) ** 1.20483, 2, 2);
  doc("refundx").innerHTML = e(game.pp.refund, 2);
  doc("ppReq").innerHTML = e(ppReqNext - game.inc.prestige, 2);
  if (game.inc.prestige >= game.pp.req) {doc("ppgain").innerHTML = e(game.pp.gain, 2)} else {doc("ppgain").innerHTML = 0}
  doc("ppgain").innerHTML = e(game.pp.gain, 2);
  doc("pigain").innerHTML = e((game.pi[1].count * (game.pi[2].count + 1)) ** (game.pi[3].count + 1), 2);
  for (let i = 0; i < 4; i++) {doc("i" + i + "x").innerHTML = e(game.i[i].x, 2); doc("ai" + i + "rate").innerHTML = game.a.rate}
  for (let i = 1; i < 4; i++) {
    doc("i" + i + "cost").innerHTML = e(game.i[i].cost, 2)
    doc("s" + i + "count").innerHTML = game.s[i].count;
    doc("s" + i + "cost").innerHTML = e(game.s[i].cost[game.s[i].count], 2);
    doc("u" + i + "count").innerHTML = game.u[i].count;
    doc("u" + i + "max").innerHTML = game.u[i].max;
    doc("u" + i + "cost").innerHTML = e(game.u[i].cost, 2) + " PP";
    if (game.u[i].count == game.u[i].max) {doc("u" + i + "cost").innerHTML = "Max"}
    doc("pi" + i + "x").innerHTML = e(game.pi[i].x, 2);
    doc("pi" + i + "cost").innerHTML = e(game.pi[i].cost, 2) + " PP";
  }
  for (let i = 1; i < 5; i++) {
    doc("c" + i + "count").innerHTML = game.c[i].count;
    doc("c" + i + "goal").innerHTML = e(game.c[i].goal[game.c[i].count], 2);
  }
  doc("i3x").innerHTML = e(game.i[3].x, 2, 2);
  doc("c1reward").innerHTML = game.a.rate;
  doc("c2reward").innerHTML = game.c[2].count;
  doc("statTotalPP").innerHTML = e(game.pp.total, 2);
  doc("statPPBoost").innerHTML = e((1 + Math.log10(game.pp.x + 1)) ** 1.20483, 2, 2);
  doc("statPPGain").innerHTML = e(game.pp.gain, 2);
  doc("statPPTime").innerHTML = time(game.pp.best);
  doc("statIncTotal").innerHTML = e(game.inc.total, 2);
  doc("statIncPrestige").innerHTML = e(game.inc.prestige, 2);
  doc("statARate").innerHTML = game.a.rate + "/sec";
}
function render() {
  for (let i = 1; i < 5; i++) {if (game.c[i].in == true && game.inc.prestige >= game.c[i].goal[game.c[i].count]) {canComChall = true}}
  if (game.c[4].in == true) {c4effect = 1 + (0.069 * (game.c[4].count + 1))}
}
function hide() {
  doc("unlockPinc").style.display = "none";
  doc("unlockA").style.display = "none";
  doc("unlockPi").style.display = "none";
  doc("tabAutomation").style.display = "none";
  doc("tabScaling").style.display = "none";
  doc("tabPrestige").style.display = "none";
  doc("subTabUpgrades").style.display = "none";
  doc("subTabPincrements").style.display = "none";
  doc("subTabChallenges").style.display = "none";
  doc("ppTop").style.display = "none";
  doc("ppTopSec").style.display = "none";
  doc("incTopSec").style.display = "none";
  doc("aprestige").style.display = "none";
  doc("cprogress").style.display = "none";
  doc("cprogressTime").style.display = "none";
  doc("ccomplete").style.display = "none";
  doc("refund").style.display = "none";
  doc("i2").style.display = "none";
  doc("i3").style.display = "none";
  doc("ai0").style.display = "none";
  doc("ai1").style.display = "none";
  doc("ai2").style.display = "none";
  doc("ai3").style.display = "none";
  doc("aa0").style.display = "none";
  doc("aa1").style.display = "none";
  doc("aa2").style.display = "none";
  doc("aa3").style.display = "none";
  doc("u1").style.display = "none";
  doc("u2").style.display = "none";
  doc("u3").style.display = "none";
  doc("pi1").style.display = "none";
  doc("pi2").style.display = "none";
  doc("pi3").style.display = "none";
  doc("stats").style.display = "none";
}
function confirms(c) {
  if (c == 'reset') {
    game.confirm.reset++;
    if ((game.confirm.reset % 2) == 1) {doc("ocReset").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.reset % 2) == 0) {doc("ocReset").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (c == 'prestige') {
    game.confirm.prestige++;
    if ((game.confirm.prestige % 2) == 1) {doc("ocPrestige").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.prestige % 2) == 0) {doc("ocPrestige").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (c == 'challenge') {
    game.confirm.challenge++;
    if ((game.confirm.challenge % 2) == 1) {doc("ocChallenge").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.challenge % 2) == 0) {doc("ocChallenge").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (c == 'WIP') {
    game.confirm.WIP++;
    if ((game.confirm.WIP % 2) == 1) {doc("ocWIP").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.WIP % 2) == 0) {doc("ocWIP").style.backgroundColor = "rgb(225, 0, 0)"}
  }
}
function stats() {
  game.stats++;
  if ((game.stats % 2) == 1) {doc("stats").style.display = "inline"; doc("ocStats").style.backgroundColor = "rgb(34, 139, 34)"}
  if ((game.stats % 2) == 0) {doc("stats").style.display = "none"; doc("ocStats").style.backgroundColor = "rgb(255, 0, 0)"}
}

//0th Prestige layer `Increment`
function increment(i) {
  if (i == 0 && canComChall == false) {
    game.inc.x += game.i[0].x;
    game.inc.prestige += game.i[0].x;
    game.inc.total += game.i[0].x;
    render();
  }
  if (i == 1 && game.inc.x >= game.i[1].cost && canComChall == false) {
    game.inc.x -= game.i[1].cost;
    game.i[1].count++;
  }
  if (i == 2 && game.inc.x >= game.i[2].cost && canComChall == false) {
    game.inc.x -= game.i[2].cost;
    game.i[2].count++;
  }
  if (i == 3 && game.inc.x >= game.i[3].cost && canComChall == false) {
    game.inc.x -= game.i[3].cost;
    game.i[3].count++;
  }
  functions();
}
function automate(a) {
  if (game.c[1].in == false && canComChall == false && a != 'prestige') {
    game.a.count[a]++;
    interval(a, game.a.rate);
    doc("a" + a + "enabled").innerHTML = enabled[game.a.count[a] % 2];
  }
  if (a == 'prestige' && game.c[1].in == false && canComChall == false) {
    game.a.prestige.count++;
    alayer(a, game.a.rate);
    doc("aprestigeenabled").innerHTML = enabled[game.a.prestige.count % 2];
  }
}
function aautomate(a) {
  if (game.c[1].in == false && canComChall == false) {
    game.aa[a]++;
    doc("aa" + a + "enabled").innerHTML = enabled[game.aa[a] % 2];
    if ((game.a.count[a] % 2) == 0 && (game.aa[a] % 2) == 1) {
      automate(a);
    }
  }
}
function scaling(s) {
  if (game.inc.x >= game.s[s].cost[game.s[s].count] && game.s[s].count < 5 && canComChall == false) {
    game.inc.x -= game.s[s].cost[game.s[s].count];
    game.s[s].count++;
  }
}

//1st Prestige layer `Prestige`
function refund() {
  for (let i = 1; i < 4; i++) {
    if (game.u[i].count > 0 && canComChall == false) {
      game.u[i].count--;
      values();
      game.pp.x += game.u[i].cost;
      game.pp.refund = 0;
    }
  }
  if (game.u[1].count > 0 || game.u[2].count > 0 || game.u[3].count > 0 && canComChall == false) {
    refund();
  }
  functions();
}
function confirmPrestige() {
  if (game.inc.prestige >= game.pp.req && canComChall == false) {
    if ((game.confirm.prestige % 2) == 1) {let confirmYes = confirm("Are you sure you want to Prestige?"); if (confirmYes) {prestige()}}
    else {prestige()}
  }
  else if (canComChall == false) {
    if ((game.confirm.prestige % 2) == 1) {
      let confirmNo = confirm("You need " + e(game.pp.req, 2) + " Increment to gain Prestige Points. Are you sure you want to Prestige?");
      if (confirmNo) {prestige()}
    }
    else {prestige()}
  }
}
function prestige() {
  let time = new Date();
  let getTime = time.getTime();
  if (game.inc.prestige >= game.pp.req && canComChall == false) {
    game.pp.x += game.pp.gain;
    game.pp.total += game.pp.gain
    ppgainLastPrestige = game.pp.gain;
    game.pp.end = getTime;
    game.pp.time = game.pp.end - game.pp.start;
    game.pp.start = getTime;
    if (ppLastTen.length < 10) {ppLastTen.push(ppgainLastPrestige / (game.pp.time / 1000))}
    else {ppLastTen.shift(); ppLastTen.push(ppgainLastPrestige / (game.pp.time / 1000))}
    for (let i = 0; i < ppLastTen.length; i++) {ppAverage += ppLastTen[i]}
    ppAverage /= ppLastTen.length;
  }
  resetPrestige();
  hide();
  functions();
}
function upgrade(u) {
  if (game.pp.x >= game.u[u].cost && game.u[u].count < game.u[u].max && canComChall == false && game.c[2].in == false) {
    game.pp.x -= game.u[u].cost;
    game.pp.refund += game.u[u].cost;
    game.u[u].count++;
  }
  functions();
}
function pincrement(p) {
  if (game.pp.x >= game.pi[p].cost && canComChall == false) {
    game.pp.x -= game.pi[p].cost;
    game.pi[p].count++;
  }
  functions();
}
function confirmChallenge(c) {
  if (game.c[c].count < cmax[c] && canComChall == false) {
    if ((game.confirm.challenge % 2) == 1) {
      let confirmed = confirm("Are you sure you want to start a Challenge? You will start from the beginning of the prestige");
      if (confirmed) {challenge(c)}
    }
    else {challenge(c)}
  }
}
function challenge(c) {
  cexit();
  if (c == 1 && game.c[1].count < cmax[1]) {
    game.c[1].in = true;
    game.a.prestige.count = 0;
    game.aa = [0, 0, 0, 0];
    doc("aprestigeenabled").innerHTML = "Disabled";
    doc("apenabledInput").checked = false;
    doc("apenabledInput").disabled = true;
  }
  if (c == 2 && game.c[2].count < cmax[2]) {refund(); game.c[2].in = true}
  if (c == 3 && game.c[3].count < cmax[3]) {game.c[3].in = true}
  if (c == 4 && game.c[4].count < cmax[4]) {game.c[4].in = true; render()}
  resetPrestige();
  hide();
  functions();
  doc("cprogress").style.display = "inline";
}
function ccomplete() {
  if (game.c[1].in == true && game.inc.prestige >= game.c[1].goal[game.c[1].count]) {
    game.c[1].count++;
    game.a.rate += 15;
  }
  if (game.c[2].in == true && game.inc.prestige >= game.c[2].goal[game.c[2].count]) {
    game.c[2].count++;
    for (let i = 1; i < 4; i++) {
      game.u[i].max++;
    }
  }
  if (game.c[3].in == true && game.inc.prestige >= game.c[3].goal[game.c[3].count]) {game.c[3].count++}
  if (game.c[4].in == true && game.inc.prestige >= game.c[4].goal[game.c[4].count]) {
    game.c[4].count++;
    game.pp.req /= 10;
  }
  cexit();
}
function confirmCexit() {
  if ((game.confirm.challenge % 2) == 1 && canComChall) {
    let confirmed = confirm("Are you sure you want to exit the Challenge? You will not get rewarded for completing it")
    if (confirmed) {cexit()}
  }
  else {cexit()}
}
function cexit() {
  for (let i = 1; i < 5; i++) {
    if (game.c[i].in == true) {
      game.c[i].in = false;
      canComChall = false;
      resetPrestige();
      hide();
      functions();
    }
  }
  doc("apenabledInput").disabled = false;
  c4effect = 1;
}

//Miscellaneous functions
document.addEventListener("keydown", function(event) {
  if (event.key == "a" || event.key == "A") {pressed.a = true}
  if (event.key == "p" || event.key == "P") {pressed.p = true}
  if (event.key == "r" || event.key == "R") {pressed.r = true}
  if (event.key == "1") {pressed.one = true}
  if (event.key == "2") {pressed.two = true}
  if (event.keyCode == 16) {pressed.shift = true}
});
document.addEventListener("keyup", function(event) {
  if (event.key == "a" || event.key == "A") {pressed.a = false}
  if (event.key == "p" || event.key == "P") {pressed.p = false}
  if (event.key == "r" || event.key == "R") {pressed.r = false}
  if (event.key == "1") {pressed.one = false}
  if (event.key == "2") {pressed.two = false}
  if (event.keyCode == 16) {pressed.shift = false}
});
document.addEventListener("keypress", function(event) {
  /*if (pressed.a) {
    let unlockInc = [2500, 250000, 2.5e7, 2.5e9];
    let unlockPP = [5, 31, 177, 1000];
    let unlockeda = 0;
    let unlockedaa = 0;
    let enableda = 0;
    let enabledaa = 0;
    for (let i = 0; i < 4; i++) {
      if (game.inc.prestige >= unlockInc[i] || game.pp.total >= unlockPP[i]) {unlockeda++}
      if ((game.a.count[i] % 2) == 1) {enableda++}
      if (game.pp.total >= unlockPP[i]) {unlockedaa++}
      if ((game.aa[i] % 2) == 1) {enabledaa++}
      if (game.inc.prestige >= unlockInc[i]) {
        if ((game.a.count[i] % 2) == 0) {
          automate(i);
          console.log("Auto 1" + i)
        }
        if (game.pp.total >= unlockPP[i]) {
          if ((game.aa[i] % 2) == 0) {
            aautomate(i);
            console.log("Auto 2" + i)
          }
        }
      }
    }
    if (enableda == unlockeda) {for (let i = 0; i < 4; i ++) {automate(i)}}
    if (enabledaa == unlockedaa) {for (let i = 0; i < 4; i++) {aautomate(i)}}
  }*/
  if (pressed.a && pressed.one) {
    let unlockInc = [2500, 250000, 2.5e7, 2.5e9];
    let unlockPP = [5, 31, 177, 1000];
    let unlocked = 0;
    let enabled = 0;
    for (let i = 0; i < 4; i++) {
      if (game.inc.prestige >= unlockInc[i] || game.pp.total >= unlockPP[i]) {unlocked++}
      if ((game.a.count[i] % 2) == 1) {enabled++}
    }
    if (enabled == 0 || enabled == unlocked) {for (let i = 0; i < unlocked; i++) {automate(i)}}
    else {
      for (let i = 0; i < unlocked; i++) {
        if ((game.inc.prestige >= unlockInc[i] || game.pp.total >= unlockPP[i]) && (game.a.count[i] % 2) == 0) {automate(i)}
      }
    }
  }//These Work
  if (pressed.a && pressed.two) {
    let unlock = [5, 31, 177, 1000];
    let unlocked = 0;
    let enabled = 0;
    for (let i = 0; i < 4; i++) {
      if (game.pp.total >= unlock[i]) {unlocked++}
      if ((game.aa[i] % 2) == 1) {enabled++}
    }
    if (enabled == 0 || enabled == unlocked) {for (let i = 0; i < unlocked; i++) {aautomate(i)}}
    else {for (let i = 0; i < unlocked; i++) {if (game.pp.total >= unlock[i] && (game.aa[i] % 2) == 0) {aautomate(i)}}}
  }//These Work
  if (pressed.a && pressed.p) {automate('prestige'); doc("apenabledInput").checked = trued[game.a.prestige.count % 2]}
  if (pressed.shift && pressed.p) {prestige()}
  if (pressed.r) {refund()}
});
function setapat() {
  let x = doc("aprestigeat").value;
  if (x === "") {game.a.prestige.at = null}
  else {game.a.prestige.at = x}
}
function getGame() {return game}
function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  copyToClipboard(el);
  document.body.removeChild(el);
  alert("Copied to clipboard");
}
function copyToClipboard(el) {
  el = (typeof el === "string") ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  }
  else {el.select()}
  document.execCommand("copy");
}

//Initialization of display
hide();
loadToggle();
functions();
tab(game.inTab);
