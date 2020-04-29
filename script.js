//Declare vars, game state is initialized in `game` using `setGame()`
function setGame() {
  return {
    inc: {x: 10, prestige: 10, total: 10},
    i: [{x: 0}, {x: 1, count: 0, cost: 10}, {x: 1, count: 0, cost: 1000}, {x: 1, count: 0, cost: 100000}],
    a: {count: [0, 0, 0, 0], rate: 25, prestige: {count: 0, at: null}},
    aa: [0, 0, 0, 0],
    s: [null, {count: 0, cost: [1e20, 1e21, 1e23, 1e34, "Max", "Max"]}, {count: 0, cost: [1e22, 1e26, 1e35, "Max", "Max", "Max"]}, {count: 0, cost: [1e24, 1e27, "Max", "Max", "Max", "Max"]}],
    pp: {x: 0, ascension: 0, total: 0, gain: 1, req: 1e9, refund: 0, start: 0, end: 3.1536e12, time: 3.1536e12, best: 3.1536e12, lastPrestige: 0, lastTen: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], average: 0, timeLastPrestige: 3.1536e12},
    u: [false, {count: 0, max: 5, cost: 1}, {count: 0, max: 5, cost: 2}, {count: 0, max: 5, cost: 10}],
    pi: [null, {x: 0, count: 0, cost: 10}, {x: 0, count: 0, cost: 1000}, {x: 0, count: 0, cost: 1e6}],
    c: [null, {in: false, count: 0, goal: [1e12, 1e17, 1e19, 4.92e20, "Completed", "Completed"]}, {in: false, count: 0, goal: [5.12e9, 2.5e10, 5e14, "Completed", "Completed", "Completed", "Completed", "Completed", "Completed", "Completed", "Completed"]}, {in: false, count: 0, goal: [1e8, "Completed", "Completed", "Completed", "Completed", "Completed"]}, {in: false, count: 0, goal: [2.43e19, "Completed", "Completed", "Completed", "Completed", "Completed"]}],
    ap: {x: 0, transcension: 0, total: 0, gain: 1, req: 1e10, start: 0, end: 3.1536e12, time: 3.1536e12, best: 3.1535e12, lastAscension: 0, lastTen: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], average: 0, timeLastAscension: 3.1536e12},
    b: {increment: [{cost: 10, bought: false, effect: 0}, {cost: 1, bought: false, effect: 0}, {cost: 1, bought: false, effect: 0}, {cost: 1, bought: false, effect: 0}], prestige: [null]},
    unlocked: {scaling: false, pincBoosts: false},
    confirm: {reset: 1, challenge: 1, prestige: 1, ascension: 1},
    toggle: {stats: 0, unlocks: 1, i1: 0},
    in: {tab: 1, subTabP: 1, subTabA: 11, subSubTabA: 111},
    time: 0,
    version: [0, 1, 0],
  }
}
var game = setGame();
var canComChall = false;
var c4effect = 1;
var pressed = {a: false, p: false, r: false, one: false, two: false, shift: false}
var cmax = [null, 4, 3, 1, 1];
var blurred = false;
const trued = [false, true];
const enabled = ["Disabled", "Enabled"];

//Automation loops
const interval = (a, rate) => {
  setTimeout(() => {
    if (blurred == false) {
      if (a == 0 && (game.a.count[0] % 2) == 1) {increment(0)}
      if (a == 1 && (game.a.count[1] % 2) == 1 && (game.inc.x >= (game.i[1].cost * 10) || game.inc.x == game.i[1].cost) && (game.toggle.i1 % 2) == 1) {increment(1)}
      if (a == 1 && (game.a.count[1] % 2) == 1 && (game.toggle.i1 % 2) == 0) {increment(1)}
      if (a == 2 && (game.a.count[2] % 2) == 1) {increment(2)}
      if (a == 3 && (game.a.count[3] % 2) == 1) {increment(3)}
      if ((game.a.count[0] % 2) == 1) {doc("incxTopSec").innerHTML = e(game.i[0].x * game.a.rate, 2)}
      else {doc("incxTopSec").innerHTML = 0}
    }
    if ((game.a.count[a] % 2) == 1) {interval(a, rate)}
  }, (1000 / rate));
}
const refunding = () => {
  setTimeout(() => {
    for (let i = 1; i < 4; i++) {
      if (game.u[i].count >0 && canComChall == false) {
        game.u[i].count--;
        values();
        game.pp.x += game.u[i].cost;
      }
      if (game.u[1].count > 0 || game.u[2].count > 0 || game.u[3].count > 0 && canComChall == false) {refunding()}
    }
  }, 1);
}
const alayer = (a, rate) => {
  setTimeout(() => {
    if (blurred == false) {
      if (a == 'prestige' && game.inc.prestige >= game.pp.req && game.a.prestige.at != null && game.pp.gain >= game.a.prestige.at) {
        prestige();
      }
    }
    if (a == 'prestige' && (game.a.prestige.count % 2) == 1) {
      alayer(a, rate);
      doc("ppxTopSec").innerHTML = e((game.pp.average * 1000), 2, 0);
    }
    else {doc("ppxTopSec").innerHTML = 0}
  }, (1000 / rate));
}
const boostsInc = (a, rate) => {
  setTimeout(() => {
    if (blurred == false) {
      game.b.increment[a].effect++;
      display();
    }
    if (a >= 1 && a <= 2 && game.b.increment[a].bought) {boostsInc(a, rate)}
    if (a == 3 && game.b.increment[3].bought && game.b.increment[3].effect < 864000) {boostsInc(3, rate)}
  }, (1000 / rate));
}
const boostsPinc = (a, rate) => {
  setTimeout(() => {
    
  }, (1000 / rate));
}

//Functions relating to changes to the save data
function confirmReset() {
  if ((game.confirm.reset % 2) == 1) {
    let confirmed = confirm("Are you sure you want to reset? You will lose all of your progress!");
    if (confirmed) {reset()}
  }
  else {reset()}
}
function reset() {
  doc("loading").style.display = "inline";
  doc("game").style.display = "none";
  game = setGame();
  canComChall = false;
  c4effect = 1;
  for (let i = 1; i < 4; i++) {game.i[i].count = 0}
  values();
  game.inc.x = game.i[1].cost;
  game.inc.prestige = game.i[1].cost;
  for (let i = 0; i < 4; i++) {
    doc("a" + i + "enabled").innerHTML = enabled[game.a.count[i] % 2];
    doc("aa" + i + "enabled").innerHTML = enabled[game.aa[i] % 2];
  }
  setTimeout(() => {
    game = setGame();
    console.log("Game Reset")
    doc("loading").style.display = "none";
    doc("game").style.display = "inline";
    hide();
    functions();
    loadToggle();
    tab(1);
  }, 1000);
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
function resetAscension() {
  for (let i = 1; i < 4; i++) {
    game.s[i].count = 0;
    game.u[i].count = 0;
    game.u[i].max = 5;
    game.pi[i].count = 0;
    game.c[i].count = 0;
  }
  game.c[4].count = 0;
  game.a.rate = 25;
  game.pp.req = 1e9;
  game.pp.refund = 0;
  resetPrestige();
  for (let i = 0; i < 4; i++) {
    game.a.count[i] = 0;
    game.aa[i] = 0;
    doc("a" + i + "enabled").innerHTML = enabled[game.a.count[i] % 2];
    doc("aa" + i + "enabled").innerHTML = enabled[game.aa[i] % 2];
  }
  game.a.prestige.count = 0;
  game.pp.x = 0;
  game.pp.ascension = 0;
  functions();
}
function save() {localStorage.setItem("game", JSON.stringify(game))}
function load() {
  let data = JSON.parse(localStorage.getItem("game"));
  if (localStorage.getItem("gameFile") != null) {data = localStorage.getItem("gameFile"); localStorage.removeItem("gameFile")}
  if (data != null) {loadGame(data)}
}
function loadGame(data) {
  game = setGame();
  if (typeof data.version == "undefined") {
    game.inc.x = data.increment;
    game.inc.prestige = data.incrementPrePrestige;
    game.inc.total = data.incrementTotal;
    game.pp.x = data.pp;
    game.pp.ascension = data.pp;
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
    game.pp.ascension = data.pp.total;
    game.pp.total = data.pp.total;
    if (data.c[1].count >= 2) {game.c[1].count = 2}
    if (data.c[1].count >= 4) {game.c[1].count = 3}
    if (data.c[1].count >= 6) {game.c[1].count = 4}
    if (data.c[2].count >= 2) {game.c[2].count = 1}
    if (data.c[2].count >= 3) {game.c[2].count = 2}
    game.a.rate = 25 + (15 * game.c[1].count);
    for (let i = 1; i <= game.c[2].count; i++) {for (let j = 1; j < 4; j++) {game.u[j].max++}}
    game.u[0] = false;
    console.log("Loaded version 0.0.7");
  }
  else if (data.version[0] == 0 && data.version[1] == 0 && (data.version[2] == 9 || data.version[2] == 8)) {
    game.inc = data.inc;
    game.i = data.i;
    game.a = data.a;
    game.aa = data.aa;
    game.s[1].cost = [1e20, 1e21, 1e23, 1e34, "Max", "Max"];
    game.s[2].cost = [1e22, 1e26, 1e35, "Max", "Max", "Max"];
    game.s[3].cost = [1e24, 1e27, "Max", "Max", "Max", "Max"];
    game.pp.x = data.pp.x;
    game.pp.ascension = data.pp.total;
    game.pp.total = data.pp.total;
    game.pp.gain = data.pp.gain;
    game.pp.req = data.pp.req;
    game.pp.refund = data.pp.refund;
    game.pp.start = data.pp.start;
    game.pp.end = data.pp.end;
    game.pp.time = data.pp.time;
    game.pp.best = data.pp.best;
    game.u = data.u;
    game.u[0] = false;
    game.pi = data.pi;
    game.c[2].goal = [5.12e9, 2.5e10, 5e14, "Completed", "Completed", "Completed", "Completed", "Completed", "Completed", "Completed", "Completed"];
    game.unlocked.scaling = data.unlocked.scaling;
    game.confirm.reset = data.confirm.reset;
    game.confirm.challenge = data.confirm.challenge;
    game.confirm.prestige = data.confirm.prestieg;
    game.confirm = data.confirm;
    game.toggle.stats = data.stats;
    game.in.tab = data.inTab;
    game.in.subTabP = data.inSubTab;
    console.log("Loaded version 0.0." + data.version[2]);
  }
  else if (data.version[0] == 0 && data.version[1] == 1 && data.version[2] == 0) {
    game.inc = data.inc;
    game.i = data.i
    game.a = data.a;
    game.aa = data.aa;
    game.a = data.a;
    game.s = data.s;
    game.pp = data.pp;
    game.u = data.u;
    game.pi = data.pi;
    game.c = data.c;
    game.ap = data.ap;
    game.b = data.b;
    game.unlocked = data.unlocked;
    game.confirm = data.confirm;
    game.toggle = data.toggle;
    game.in = data.in;
    game.time = data.time;
    console.log("loaded Version 0.1.0");
  }
  hide();
  functions();
  render();
  tab(game.in.tab);
  if (game.in.tab == 6) {subTab(game.in.subTabP)}
  loadOffline();
  loadToggle();
}
function loadOffline() {
  let timeOff = Math.abs(game.time - Date.now());
  let seconds = Math.floor(timeOff / 1000);
  let num = Math.floor((timeOff * game.a.rate) / 1000);
  let ppTime = game.pp.lastTen[game.pp.lastTen.length - 1] * 1000;
  if ((game.a.count[0] % 2) == 1) {
    game.inc.x += (num * game.i[0].x);
    game.inc.prestige += (num * game.i[0].x);
    game.inc.total += (num * game.i[0].x);
  }
  if ((game.a.prestige.count % 2) == 1 && game.pp.timeLastPrestige < timeOff) {
    let prestigeCount = Math.floor(timeOff / game.pp.timeLastPrestige);
    game.pp.x += Math.floor(prestigeCount * game.pp.lastPrestige);
    game.pp.ascension += Math.floor(prestigeCount * game.pp.lastPrestige);
    game.pp.total += Math.floor(prestigeCount * game.pp.lastPrestige);
    num = timeOff - (game.pp.timeLastPrestige * prestigeCount);
    game.inc.x += (num * game.i[0].x);
    game.inc.prestige += (num * game.i[0].x);
    game.inc.total += (num * game.i[0].x);
  }
  for (let i = 1; i < 3; i++) {if (game.b.increment[i].bought) {game.b.increment[i].effect += seconds}}
  /*if (game.b.increment[3].bought && (game.b.increment[3].effect + seconds) < 864000) {game.b.increment[3].effect += seconds}
  else if (game.b.increment[3].bought) {game.b.increment[3].effect = 864000}*/
  game.time = Date.now();
  save();
  functions();
  doc("loading").style.display = "none";
  doc("game").style.display = "inline";
  console.log("Loaded offline progress: " + time(timeOff));
}
function loadToggle() {
  for (let i = 0; i < 4; i++) {
    if ((game.a.count[i] % 2) == 1 && (game.aa[i] % 2) == 0 && game.c[1].in == false) {interval(i, game.a.rate)}
    if ((game.a.count[i] % 2) == 1 && (game.aa[i] % 2) == 1 && game.c[1].in == false) {interval(i, game.a.rate)}
    doc("a" + i + "enabled").innerHTML = enabled[game.a.count[i] % 2];
    doc("aa" + i + "enabled").innerHTML = enabled[game.aa[i] % 2];
  }
  if ((game.a.prestige.count % 2) == 1) {alayer('prestige', game.a.rate)}
  for (let i = 1; i < 3; i++) {if (game.b.increment[i].bought) {boostsInc(i, 1)}}
  if (game.b.increment[3].bought && game.b.increment[3].effect < 864000) {boostsInc(3, 1)}
  doc("aprestigeenabled").innerHTML = enabled[game.a.prestige.count % 2]
  doc("apenabledInput").checked = trued[game.a.prestige.count % 2];
  doc("aprestigeat").value = game.a.prestige.at;
  if ((game.confirm.reset % 2) == 1) {doc("tReset").style.backgroundColor = "rgb(34, 139, 34)"}
  if ((game.confirm.reset % 2) == 0) {doc("tReset").style.backgroundColor = "rgb(225, 0, 0)"}
  if ((game.confirm.challenge % 2) == 1) {doc("tChallenge").style.backgroundColor = "rgb(34, 139, 34)"}
  if ((game.confirm.challenge % 2) == 0) {doc("tChallenge").style.backgroundColor = "rgb(225, 0, 0)"}
  if ((game.confirm.prestige % 2) == 1) {doc("tPrestige").style.backgroundColor = "rgb(34, 139, 34)"}
  if ((game.confirm.prestige % 2) == 0) {doc("tPrestige").style.backgroundColor = "rgb(225, 0, 0)"}
  if ((game.confirm.ascension % 2) == 1) {doc("tAscension").style.backgroundColor = "rgb(34, 139, 34)"}
  if ((game.confirm.ascension % 2) == 0) {doc("tAscension").style.backgroundColor = "rgb(225, 0, 0)"}
  if ((game.toggle.stats % 2) == 1) {doc("stats").style.display = "inline"; doc("tStats").style.backgroundColor = "rgb(34, 139, 34)"}
  if ((game.toggle.stats % 2) == 0) {doc("stats").style.display = "none"; doc("tStats").style.backgroundColor = "rgb(255, 0, 0)"}
  if ((game.toggle.unlocks % 2) == 1) {doc("unlocks").style.display = "inline"; doc("tUnlocks").style.backgroundColor = "rgb(34, 139, 34)"}
  if ((game.toggle.unlocks % 2) == 0) {doc("unlocks").style.display = "none"; doc("tUnlocks").style.backgroundColor = "rgb(255, 0, 0)"}
  if ((game.toggle.i1 % 2) == 1) {doc("ti1").textContent = "Auto Increment 1 buys at 10%"}
  if ((game.toggle.i1 % 2) == 0) {doc("ti1").textContent = "Auto Increment 1 buys at 100%"}
  console.log("Loaded Toggle");
}
function exporty() {copyStringToClipboard(btoa(JSON.stringify(game)))}
function importy() {let data = JSON.parse(atob(prompt("Paste your save code here."))); if (data !== "") {loadGame(data)}}
function debug(save) {return JSON.parse(atob(save))}

//Useful/convenient functions
function doc(x) {return document.getElementById(x)}
function tab(t) {
  doc("tab1").style.display = "none";
  doc("tab2").style.display = "none";
  doc("tab4").style.display = "none";
  doc("tab5").style.display = "none";
  doc("tab6").style.display = "none";
  doc("tab7").style.display = "none";
  doc("subTab1").style.display = "none";
  doc("subTab2").style.display = "none";
  doc("subTab3").style.display = "none";
  doc("subTab11").style.display = "none";
  doc("subTab12").style.display = "none";
  doc("subTab13").style.display = "none";
  doc("subTab14").style.display = "none";
  doc("subTab111").style.display = "none";
  doc("subTab112").style.display = "none";
  doc("tab" + t).style.display = "inline";
  game.in.tab = t;
  if (t == 6) {subTab(game.in.subTabP)}
  if (t == 7) {subTab(game.in.subTabA)}
}
function subTab(s) {
  doc("subTab1").style.display = "none";
  doc("subTab2").style.display = "none";
  doc("subTab3").style.display = "none";
  doc("subTab11").style.display = "none";
  doc("subTab12").style.display = "none";
  doc("subTab13").style.display = "none";
  doc("subTab14").style.display = "none";
  doc("subTab" + s).style.display = "inline";
  if (s >= 1 && s <= 3) {game.in.subTabP = s}
  if (s >= 11 && s <= 14) {game.in.subTabA = s}
  if (s == 11) {subSubTab(game.in.subSubTabA)}
}
function subSubTab(s) {
  doc("subTab111").style.display = "none";
  doc("subTab112").style.display = "none";
  doc("subTab" + s).style.display = "inline";
  game.in.subSubTabA = s;
}
function e(num, exp, dec) {
  if (typeof num == "string") {return num} else if (num >= 1e6) {return Number(num).toExponential(exp)} else {return num.toFixed(dec)}
}
function time(time) {
  let x = time / 1000;
  if (x == Infinity) {return "Infinite Time"}
  let y = e(Math.floor(x / 3153600), 2);
  let yy = (y == 1) ? " Year " : " Years ";
  if (y == 0) {y = ""; yy = ""}
  let d = Math.floor((x % 3153600) / 86400);
  let dd = (d == 1) ? " Day " : " Days ";
  if (d == 0) {d = ""; dd = ""}
  let h = Math.floor((x % 3153600 % 86400) / 3600);
  let hh = (h == 1) ? " Hour " : " Hours ";
  if (h == 0) {h = ""; hh = ""}
  let m = Math.floor((x % 3153600 % 86400 % 3600) / 60);
  let mm = (m == 1) ? " Minute " : " Minutes ";
  if (m == 0) {m = ""; mm = ""}
  let s = (x % 3153600 % 86400 % 3600 % 60).toFixed(2);
  let ss = (s == 1) ? " Second" : " Seconds";
  if (s == 0) {s = ""; ss = ""}
  return y + yy + d + dd + h + hh + m + mm + s +ss;
}
function confirms(c) {
  if (c == 'reset') {
    game.confirm.reset++;
    if ((game.confirm.reset % 2) == 1) {doc("tReset").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.reset % 2) == 0) {doc("tReset").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (c == 'challenge') {
    game.confirm.challenge++;
    if ((game.confirm.challenge % 2) == 1) {doc("tChallenge").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.challenge % 2) == 0) {doc("tChallenge").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (c == 'prestige') {
    game.confirm.prestige++;
    if ((game.confirm.prestige % 2) == 1) {doc("tPrestige").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.prestige % 2) == 0) {doc("tPrestige").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (c == 'ascension') {
    game.confirm.ascension++;
    if ((game.confirm.ascension % 2) == 1) {doc("tAscension").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.confirm.ascension % 2) == 0) {doc("tAscension").style.backgroundColor = "rgb(225, 0, 0)"}
  }
}
function toggle(name) {
  if (name == 'stats') {
    game.toggle.stats++;
    if ((game.toggle.stats % 2) == 1) {doc("stats").style.display = "inline"; doc("tStats").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.toggle.stats % 2) == 0) {doc("stats").style.display = "none"; doc("tStats").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (name == 'unlocks') {
    game.toggle.unlocks++;
    if ((game.toggle.unlocks % 2) == 1) {doc("unlocks").style.display = "inline"; doc("tUnlocks").style.backgroundColor = "rgb(34, 139, 34)"}
    if ((game.toggle.unlocks % 2) == 0) {doc("unlocks").style.display = "none"; doc("tUnlocks").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (name == 'i1') {
    game.toggle.i1++;
    if ((game.toggle.i1 % 2) == 1) {doc("ti1").textContent = "Auto Increment 1 buys at 10%"}
    if ((game.toggle.i1 % 2) == 0) {doc("ti1").textContent = "Auto Increment 1 buys at 100%"}
  }
}

//Display related functions
function functions() {unlock(); values(); display()}
function unlock() {
  if (game.inc.prestige >= 0) {
    doc("unlockInc").style.display = "inline";
    if (game.pp.ascension == 0) {doc("unlockIncType").textContent = "Automation"}
    if (game.pp.ascension == 0) {doc("unlockIncReq").textContent = e(2500 - game.inc.prestige, 2)}
    doc("unlockPincType").textContent = "Upgrades";
    doc("unlockPincReq").textContent = e(1 - game.pp.ascension, 2);
    doc("unlockI").style.display = "inline";
    doc("unlockIReq").textContent = e(1000 - game.inc.prestige, 2);
    if (game.ap.transcension >= 1) {doc("unlockA").style.display = "inline"}
    doc("unlockAReq").textContent = e(2500 - game.inc.prestige, 2);
    doc("unlockAReq").style.color = "rgb(150, 0, 210)";
    doc("unlockACurrency").textContent = "Increment";
    if (game.ap.transcension >= 1) {doc("unlockPi").style.display = "inline"}
    doc("unlockPiReq").textContent = e(10 - game.pp.ascension, 2);
  }
  if (game.inc.prestige >= 1000) {
    doc("unlockIReq").textContent = e(100000 - game.inc.prestige, 2);
    doc("i2").style.display = "inline";
  }
  if (game.inc.prestige >= 2500) {
    if (game.pp.ascension == 0) {doc("unlockIncType").textContent = "Prestige"}
    if (game.pp.ascension == 0) {doc("unlockIncReq").textContent = e(1e9 - game.inc.prestige, 2)}
    doc("unlockA").style.display = "inline";
    doc("unlockAReq").textContent = e(250000 - game.inc.prestige, 2);
    doc("tabAutomation").style.display = "inline";
    doc("ai0").style.display = "inline";
  }
  if (game.inc.prestige >= 100000) {
    doc("unlockI").style.display = "none";
    doc("i3").style.display = "inline";
  }
  if (game.inc.prestige >= 250000) {
    doc("unlockAReq").textContent = e(2.5e7 - game.inc.prestige, 2);
    doc("ai1").style.display = "inline";
  }
  if (game.inc.prestige >= 2.5e7) {
    doc("unlockAReq").textContent = e(2.5e9 - game.inc.prestige, 2);
    doc("ai2").style.display = "inline";
  }
  if (game.inc.prestige >= 1e9) {
    doc("unlockIncType").textContent = "Scaling";
    doc("unlockIncReq").textContent = e(1e22 - game.inc.prestige, 2);
    if (game.ap.transcension == 0) {doc("unlockPinc").style.display = "inline"}
    doc("tabPrestige").style.display = "inline";
  }
  if (game.inc.prestige >= 2.5e9) {
    doc("unlockAReq").textContent = e(5 - game.pp.ascension, 2);
    doc("unlockAReq").style.color = "rgb(0, 0, 200)";
    doc("unlockACurrency").textContent = "Prestige Points";
    doc("ai3").style.display = "inline";
  }
  if (game.inc.prestige >= 1e22) {
    game.unlocked.scaling = true;
  }
  if (game.unlocked.scaling) {doc("tabScaling").style.display = "inline"; doc("unlockInc").style.display = "none"}
  if (game.pp.ascension >= 1) {
    doc("unlockPinc").style.display = "inline";
    doc("unlockPincType").textContent = "Pincrements";
    doc("unlockPincReq").textContent = e(10 - game.pp.ascension, 2);
    doc("ppTop").style.display = "inline";
    doc("tabAutomation").style.display = "inline";
    doc("tabPrestige").style.display = "inline";
    doc("subTabUpgrades").style.display = "inline";
    doc("refund").style.display = "inline";
    doc("u1").style.display = "inline";
    doc("u2").style.display = "inline";
    doc("u3").style.display = "inline";
    doc("statPPTotal").style.display = "inline";
    doc("statPPBoost").style.display = "inline";
    doc("statPPGain").style.display = "inline";
    doc("statPPTime").style.display = "inline";
    doc("statIncPrestige").style.display = "inline";
    doc("tPrestige").style.display = "inline";
  }
  if (game.pp.ascension >= 5) {
    doc("unlockAReq").textContent = e(250000 - game.inc.prestige, 2);
    if (game.inc.prestige >= 250000) {doc("unlockAReq").textContent = e(2.5e7 - game.inc.prestige, 2)}
    if (game.inc.prestige >= 2.5e7) {doc("unlockAReq").textContent = e(2.5e9 - game.inc.prestige, 2)}
    if (game.inc.prestige >= 2.5e9) {doc("unlockAReq").textContent = e(31 - game.pp.ascension, 2)}
    doc("ai0").style.display = "inline";
    doc("aa0").style.display = "inline";
  }
  if (game.pp.ascension >= 10) {
    doc("unlockPincType").textContent = "Challenges";
    doc("unlockPincReq").textContent = e(50 - game.pp.ascension, 2);
    doc("unlockPi").style.display = "inline";
    doc("unlockPiReq").textContent = e(1000 - game.pp.ascension, 2);
    doc("subTabPincrements").style.display = "inline";
    doc("pi1").style.display = "inline";
  }
  if (game.pp.ascension >= 31) {
    doc("unlockAReq").textContent = e(2.5e7 - game.inc.prestige, 2);
    if (game.inc.prestige >= 2.5e7) {doc("unlockAReq").textContent = e(2.5e9 - game.inc.prestige, 2)}
    if (game.inc.prestige >= 2.5e9) {doc("unlockAReq").textContent = e(177 - game.pp.ascension, 2)}
    doc("ai1").style.display = "inline";
    doc("aa1").style.display = "inline";
  }
  if (game.pp.ascension >= 50) {
    doc("unlockPincType").textContent = "Ascension";
    doc("unlockPincReq").textContent = e(1e10 - game.pp.ascension, 2);
    doc("subTabChallenges").style.display = "inline";
    doc("c1").style.display = "inline";
    doc("c2").style.display = "inline";
    doc("c3").style.display = "inline";
    doc("c4").style.display = "inline";
  }
  if (game.pp.ascension >= 177) {
    doc("unlockAReq").textContent = e(2.5e9 - game.inc.prestige, 2);
    if (game.inc.prestige >= 2.5e9) {doc("unlockAReq").textContent = e(1000 - game.pp.ascension, 2)}
    doc("ai2").style.display = "inline";
    doc("aa2").style.display = "inline";
  }
  if (game.pp.ascension >= 1000) {
    doc("unlockAReq").textContent = e(10000 - game.pp.ascension, 2);
    doc("unlockAReq").style.color = "rgb(0, 0, 200)";
    doc("unlockACurrency").textContent = "Prestige Points";
    doc("unlockPiReq").textContent = e(1e6 - game.pp.ascension, 2);
    doc("ai3").style.display = "inline";
    doc("aa3").style.display = "inline";
    doc("pi2").style.display = "inline";
  }
  if (game.pp.ascension >= 10000) {
    doc("unlockA").style.display = "none";
    doc("aprestige").style.display = "inline";
  }
  if (game.pp.ascension >= 1e6) {
    doc("unlockPi").style.display = "none";
    doc("pi3").style.display = "inline";
  }
  if (game.pp.ascension >= 1e10) {
    doc("unlockPinc").style.display = "none";
    doc("tabAscension").style.display = "inline";
  }
  if (game.ap.transcension >= 1) {
    doc("ppTop").style.display = "inline";
    doc("apTop").style.display = "inline";
    doc("tabAutomation").style.display = "inline";
    doc("tabPrestige").style.display = "inline";
    doc("tabAscension").style.display = "inline";
    doc("subTabUpgrades").style.display = "inline";
    doc("subTabPincrements").style.display = "inline";
    doc("subTabChallenges").style.display = "inline";
    doc("subTabIncBoosts").style.display = "inline";
    doc("ppTopSec").style.display = "inline";
    doc("incTopSec").style.display = "inline";
    doc("refund").style.display = "inline";
    /*doc("respec").style.display = "inline";*/
    doc("u1").style.display = "inline";
    doc("u2").style.display = "inline";
    doc("u3").style.display = "inline";
    doc("binc1").style.display = "inline";
    doc("binc2").style.display = "inline";
    doc("binc3").style.display = "inline";
    doc("statAPTotal").style.display = "inline";
    doc("statAPBoost").style.display = "inline";
    doc("statAPGain").style.display = "inline";
    doc("statAPTime").style.display = "inline";
    doc("statPPTotal").style.display = "inline";
    doc("statPPAscension").style.display = "inline";
    doc("statPPBoost").style.display = "inline";
    doc("statPPGain").style.display = "inline";
    doc("statPPTime").style.display = "inline";
    doc("statIncPrestige").style.display = "inline";
    doc("tPrestige").style.display = "inline";
    doc("tAscension").style.display = "inline";
    if (game.pp.ascension >= 1e11) {game.unlocked.pincBoosts = true}
    else {
      doc("unlockPinc").style.display = "inline";
      doc("unlockPincType").textContent = "Prestige Boosts";
      doc("unlockPincReq").textContent = e(1e11 - game.pp.ascension, 2);
    }
  }
  if (game.unlocked.pincBoosts) {doc("subTabPincBoosts").style.display = "inline"; doc("unlockPinc").style.display = "none"}
  if (game.b.increment[1].bought && game.b.increment[2].bought && game.b.increment[3].bought) {doc("bincinc").style.display = "inline"}
  if ((game.a.count[0] % 2) == 1 || game.pp.ascension >= 1) {doc("incTopSec").style.display = "inline"}
  if ((game.a.prestige.count % 2) == 1) {doc("ppTopSec").style.display = "inline"}
  if ((game.stats % 2) == 1) {doc("stats").style.display = "inline"; doc("tStats").style.backgroundColor = "rgb(34, 139, 34)"}
  if ((game.stats % 2) == 0) {doc("stats").style.display = "none"; doc("tStats").style.backgroundColor = "rgb(255, 0, 0)"}
  /*
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 2; j++) {
      if (game.b[i][j].bought && doc("b" + i + "-" + (j + 1)) != "undefined") {
        doc("b" + i + "-" + (j + 1)).style.display = "inline";
      }
    }
  }
  */
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
}
function values() {
  game.i[0].x = Math.floor((((game.i[1].count * (game.u[1].count + 1)) * ((game.i[2].count + 1) * (game.u[2].count + 1))) ** ((game.i[3].count + 1) * (1 + (game.u[3].count / 30)))) * ((1 + Math.log10(game.pp.x + 1)) ** 1.20484) * (1 + (((1 + Math.log10(game.b.increment[1].effect + 1)) ** 4.75) - 1) / 100));
  game.i[1].x = Math.floor((((game.i[1].count + 1) * (game.u[1].count + 1)) * ((game.i[2].count + 1) * (game.u[2].count + 1))) ** ((game.i[3].count + 1) * (1 + (game.u[3].count / 30))) * ((1 + Math.log10(game.pp.x + 1)) ** 1.20484) * (1 + (((1 + Math.log10(game.b.increment[1].effect + 1)) ** 4.75) - 1) / 100)) - Math.floor((((game.i[1].count * (game.u[1].count + 1)) * ((game.i[2].count + 1) * (game.u[2].count + 1))) ** ((game.i[3].count + 1) * (1 + (game.u[3].count / 30)))) * ((1 + Math.log10(game.pp.x + 1)) ** 1.20484) * (1 + (((1 + Math.log10(game.b.increment[1].effect + 1)) ** 4.75) - 1) / 100));
  game.i[2].x = (game.i[2].count + 1) * (game.u[2].count + 1);
  game.i[3].x = (game.i[3].count + 1) * (1 + (game.u[3].count / 30));
  game.i[1].cost = Math.floor((10 * (2 ** ((game.i[1].count / (1.14 ** (game.c[3].count + 1))) * Math.log10(8 - game.s[1].count - ((((1 + Math.log10(game.b.increment[3].effect + 1)) ** 2) - 1) / 100)))) / ((1.16 - (0.16 * (0 ** game.i[1].count))) - (game.u[1].count / 100))) * (c4effect ** (game.i[1].count + game.i[2].count + game.i[3].count)));
  game.i[2].cost = Math.floor(((1000 * ((10 - game.s[2].count - ((((1 + Math.log10(game.b.increment[3].effect + 1)) ** 2) - 1) / 17)) ** (game.i[2].count / (1.25 ** game.c[3].count)))) ** (1.02 ** game.u[2].count)) * (c4effect ** (game.i[1].count + game.i[2].count + game.i[3].count)));
  game.i[3].cost = Math.floor((((10 - (0.2 * game.c[3].count)) ** ((6 - (game.s[3].count / 10) - ((((1 + Math.log10(game.b.increment[3].effect + 1)) ** 3.75) - 1) / 5000)) * (2 ** game.i[3].count))) * (3 ** game.u[3].count)) * (c4effect ** (game.i[1].count + game.i[2].count + game.i[3].count)));
  if (game.i[3].count == 0) {game.i[3].cost = Math.floor((((10 - (0.2 * game.c[3].count)) ** 5) * (3 ** game.u[3].count)) * (c4effect ** (game.i[1].count + game.i[2].count + game.i[3].count)))}
  if (game.c[3].in == true) {
  game.i[1].cost = Math.floor(100000 * (2 ** ((game.i[1].count / 1.14) * Math.log10(8 - game.s[1].count - ((((1 + Math.log10(game.b.increment[3].effect + 1)) ** 2) - 1) / 100)))) / ((1.16 - (0.16 * (0 ** game.i[1].count))) - (game.u[1].count / 100)));
  game.i[2].cost = Math.floor((1e6 * ((10 - game.s[2].count - ((((1 + Math.log10(game.b.increment[3].effect + 1)) ** 2) - 1) / 17)) ** game.i[2].count)) ** (1.02 ** game.u[2].count));
  game.i[3].cost = Math.floor(((10 - (0.2 * game.c[3].count)) ** ((10 - (game.s[3].count / 10) - ((((1 + Math.log10(game.b.increment[3].effect + 1)) ** 3.75) - 1) / 5000)) * (2 ** game.i[3].count)) * (3 ** game.u[3].count)));
    if (game.i[3].count == 0) {game.i[3].cost = 1e9 * (3 ** game.u[3].count)}
  }
  game.a.rate = Math.floor(25 + (15 * game.c[1].count) + Math.log10(((2 * game.b.increment[2].effect) ** 5) + 1));
  if (game.inc.prestige >= game.pp.req) {
    game.pp.gain = Math.floor((((game.pi[1].count * (game.pi[2].count + 1)) ** (game.pi[3].count + 1)) + Math.floor(((Math.abs(Math.log10(game.inc.prestige) - (Math.log10(game.pp.req) - 1)) - ((Math.log10(game.pp.req) - 1) - Math.log10(game.inc.prestige))) / 4) + 0.5)) * (1 + Math.log10(game.ap.x + 1)));
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
  if (game.pp.ascension >= game.ap.req) {
    game.ap.gain = Math.floor(((Math.abs(Math.log10(game.pp.ascension) - (Math.log10(game.ap.req) - 1)) - ((Math.log10(game.ap.req) - 1) - Math.log10(game.pp.ascension))) / 4) + 0.5);
  }
  else {game.ap.gain = 0}
  if (game.ap.time < game.ap.best && game.ap.gain != 0) {game.ap.best = game.ap.time}
}
function display() {
  let ppReqNext = game.pp.req * (100 ** Math.floor(((Math.abs(Math.log10(game.inc.prestige) - (Math.log10(game.pp.req) - 1)) - ((Math.log10(game.pp.req) - 1) - Math.log10(game.inc.prestige))) / 4) + 0.5));
  let apReqNext = game.ap.req * (100 ** Math.floor(((Math.abs(Math.log10(game.pp.ascension) - (Math.log10(game.ap.req) - 1)) - ((Math.log10(game.ap.req) - 1) - Math.log10(game.pp.ascension))) / 4) + 0.5));
  if (game.pp.ascension == 0) {apReqNext = game.ap.req}
  doc("ppxTop").textContent = e(game.pp.x, 2); 
  doc("incxTop").textContent = e(game.inc.x, 2);
  doc("ppxTab").textContent = e(game.pp.x, 2);
  doc("ppboostTab").textContent = e((1 + Math.log10(game.pp.x + 1)) ** 1.20483, 2, 2);
  doc("refundx").textContent = e(game.pp.refund, 2);
  (game.u[0]) ? doc("refund").style.backgroundColor = "rgb(35, 35, 35)" : doc("refund").style.backgroundColor = "rgb(0, 0, 0)";
  doc("ppReq").textContent = e(ppReqNext - game.inc.prestige, 2);
  if (game.inc.prestige >= game.pp.req) {doc("ppgain").textContent = e(game.pp.gain, 2)} else {doc("ppgain").textContent = 0}
  doc("ppgain").textContent = e(game.pp.gain, 2);
  doc("pigain").textContent = e((game.pi[1].count * (game.pi[2].count + 1)) ** (game.pi[3].count + 1), 2);
  for (let i = 0; i < 4; i++) {doc("i" + i + "x").textContent = e(game.i[i].x, 2); doc("ai" + i + "rate").textContent = game.a.rate}
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
  for (let i = 1; i < 4; i++) {
    doc("binc" + i + "costx").textContent = e(game.b.increment[i].cost, 2) + " AP";
    if (game.b.increment[i].bought) {
      doc("binc" + i).style.backgroundColor = "rgb(55, 55, 55)";
      doc("binc" + i + "cost").style.display = "none";
      doc("binc" + i + "costx").style.display = "none";
      doc("binc" + i + "bought").style.color = "rgb(212, 175, 55)";
      doc("binc" + i + "bought").textContent = "Bought";
    }
    else {
      doc("binc" + i).style.backgroundColor = "rgb(25, 25, 25)";
      doc("binc" + i + "cost").style.display = "inline";
      doc("binc" + i + "costx").style.display = "inline";
      doc("binc" + i + "bought").style.color = "rgb(150, 200, 50)";
      doc("binc" + i + "bought").textContent = "Buy: ";
    }
  }
  /*doc("bincinccost").textContent = game.b.increment[0].cost + " AP";*/
  doc("i3x").textContent = e(game.i[3].x, 2, 2);
  doc("c1reward").textContent = game.a.rate;
  doc("c2reward").textContent = game.c[2].count;
  doc("apxTop").textContent = e(game.ap.x, 2);
  doc("apxTab").textContent = e(game.ap.x, 2);
  doc("apboostTab").textContent = e(1 + Math.log10(game.ap.x + 1), 2, 2);
  /*doc("respecx").textContent = e(game.ap.respec, 2);*/
  /*(game.b.respec) ? doc("respec").style.backgroundColor = "rgb(55, 55, 55)" : doc("respec").style.backgroundColor = "rgb(0, 0, 0)";*/
  doc("apReq").textContent = e(apReqNext - game.pp.ascension, 2);
  doc("apgain").textContent = e(game.ap.gain, 2);
  if (game.pp.ascension < game.ap.req) {doc("apgain").textContent = 0}
  doc("binc1effect").textContent = "+" + e(((1 + Math.log10(game.b.increment[1].effect + 1)) ** 4.75) - 1, 2, 2) + "%";
  if (((1 + Math.log10(game.b.increment[1].effect + 1)) ** 4.75) - 1 >= 100) {
    doc("binc1effect").textContent = e(1 + ((((1 + Math.log10(game.b.increment[1].effect + 1)) ** 4.75) - 1) / 100), 2, 2) + "x"
  }
  doc("binc2effect").textContent = "+" + Math.floor(Math.log10(((2 * game.b.increment[2].effect) ** 5) + 1)) + "/sec"
  doc("binc3effect").textContent = "-" + e((((1 + Math.log10(game.b.increment[3].effect + 1)) ** 2) - 1) / 100, 2, 2) + ", -" + e((((1 + Math.log10(game.b.increment[3].effect + 1)) ** 2) - 1) / 17, 2, 2) + ", -" + e((((1 + Math.log10(game.b.increment[3].effect + 1)) ** 3.75) - 1) / 5000, 2, 2);
  doc("statAPTotalx").textContent = e(game.ap.total, 2);
  doc("statAPBoostx").textContent = null;
  doc("statAPGainx").textContent = e(game.ap.gain, 2);
  doc("statAPTimex").textContent = time(game.ap.best);
  doc("statPPTotalx").textContent = e(game.pp.total, 2);
  doc("statPPAscensionx").textContent = e(game.pp.ascension, 2);
  doc("statPPBoostx").textContent = e((1 + Math.log10(game.pp.x + 1)) ** 1.20484, 2, 2);
  doc("statPPGainx").textContent = game.pp.gain;
  doc("statPPTimex").textContent = time(game.pp.best);
  doc("statIncTotalx").textContent = e(game.inc.total, 2);
  doc("statIncPrestigex").textContent = e(game.inc.prestige, 2);
  doc("version").textContent = "Version " + game.version[0] + "." + game.version[1] + "." + game.version[2];
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
  doc("tabAscension").style.display = "none";
  doc("subTabIncBoosts").style.display = "none";
  doc("subTabPincBoosts").style.display = "none";
  doc("binc1").style.display = "none";
  doc("binc2").style.display = "none";
  doc("binc3").style.display = "none";
  doc("bincinc").style.display = "none";
  doc("apTop").style.display = "none";
  doc("ppTop").style.display = "none";
  doc("ppTopSec").style.display = "none";
  doc("incTopSec").style.display = "none";
  doc("aprestige").style.display = "none";
  doc("cprogress").style.display = "none";
  doc("cprogressTime").style.display = "none";
  doc("ccomplete").style.display = "none";
  doc("refund").style.display = "none";
  /*doc("respec").style.display = "none";*/
  doc("i2").style.display = "none";
  doc("i3").style.display = "none";
  for (let i = 0; i < 4; i++) {doc("ai" + i).style.display = "none"; doc("aa" + i).style.display = "none"}
  for (let i = 1; i < 4; i++) {doc("u" + i).style.display = "none"; doc("pi" + i).style.display = "none"}
  doc("stats").style.display = "none";
  if ((game.toggle.stats % 2) == 1) {doc("stats").style.display = "inline"}
  doc("statAPTotal").style.display = "none";
  doc("statAPBoost").style.display = "none";
  doc("statAPGain").style.display = "none";
  doc("statAPTime").style.display = "none";
  doc("statPPTotal").style.display = "none";
  doc("statPPAscension").style.display = "none";
  doc("statPPBoost").style.display = "none";
  doc("statPPGain").style.display = "none";
  doc("statPPTime").style.display = "none";
  doc("statIncPrestige").style.display = "none";
  doc("tPrestige").style.display = "none";
  doc("tAscension").style.display = "none";
}
function render() {
  for (let i = 1; i < 5; i++) {if (game.c[i].in == true && game.inc.prestige >= game.c[i].goal[game.c[i].count]) {canComChall = true}}
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
  game.u[0] = true;
  display();
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
  if (game.inc.prestige >= game.pp.req && canComChall == false) {
    game.pp.x += game.pp.gain;
    game.pp.ascension += game.pp.gain;
    game.pp.total += game.pp.gain;
    game.pp.lastPrestige = game.pp.gain;
    game.pp.end = Date.now();
    game.pp.time = game.pp.end - game.pp.start;
    game.pp.start = Date.now();
    game.pp.lastTen.shift(); game.pp.lastTen.push(game.pp.lastPrestige / game.pp.time);
    for (let i = 0; i < game.pp.lastTen.length; i++) {game.pp.average += game.pp.lastTen[i]}
    game.pp.average /= game.pp.lastTen.length;
    game.pp.timeLastPrestige = game.pp.time;
  }
  if (game.u[0]) {
    refunding();
    game.pp.refund = 0;
    game.u[0] = false;
  }
  resetPrestige();
  hide();
  doc("unlockA").style.display = "inline";
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
  if (c == 2 && game.c[2].count < cmax[2]) {refunding(); game.c[2].in = true}
  if (c == 3 && game.c[3].count < cmax[3]) {game.c[3].in = true}
  if (c == 4 && game.c[4].count < cmax[4]) {game.c[4].in = true; c4effect = 1 + (0.069 * (game.c[4].count + 1))}
  resetPrestige();
  hide();
  functions();
  doc("cprogress").style.display = "inline";
}
function ccomplete() {
  if (game.c[1].in == true && game.inc.prestige >= game.c[1].goal[game.c[1].count]) {game.c[1].count++}
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

//2nd Prestige layer 'Ascension'
/*function respec(r) {
  if (r == 'boosts') {game.b.respec = true}
  display();
}*/
function confirmAscension() {
  if (game.pp.ascension >= game.ap.req && canComChall == false) {
    if ((game.confirm.ascension % 2) == 1) {let confirmYes = confirm("Are you sure you want to Ascend?"); if (confirmYes) {ascension()}}
    else {ascension()}
  }
  else if (canComChall == false) {
    if ((game.confirm.ascension % 2) == 1) {
      let confirmNo = confirm("You need " + e(game.ap.req, 2) + " Prestige Points to gain Ascension Points. Are you sure you want to Ascend?");
      if (confirmNo) {ascension()}
    }
    else {ascension()}
  }
}
function ascension() {
  if (game.pp.ascension >= game.ap.req && canComChall == false) {
    game.ap.x += game.ap.gain;
    game.ap.transcension += game.ap.gain;
    game.ap.total += game.ap.gain;
    game.ap.lastAscension = game.ap.gain;
    game.ap.end = Date.now();
    game.ap.time = game.ap.end - game.ap.start;
    game.ap.start = Date.now();
    game.ap.lastTen.shift(); game.ap.lastTen.push(game.ap.lastAsension / game.ap.time);
    for (let i = 0; i < game.ap.lastTen.length; i++) {game.ap.average += game.ap.lastTen[i]}
    game.ap.average /= game.ap.lastTen.length;
    game.ap.timeLastAscension = game.ap.time;
  }
  /*if (game.b.respec) {
    for (let i = 1; i < 4; i++) {
      if (game.b.increment[i].bought) {
        game.ap.x += game.b.increment[i].cost;
        game.ap.respec = 0;
        game.b.increment[i].bought = false;
      }
      game.b.increment[i].canBuy = true;
    }
    game.b.respec = false;
  }*/
  hide();
  functions();
  resetAscension();
  hide();
  doc("unlockA").style.display = "inline";
  functions();
}
function boostInc(b) {
  if (game.ap.x >= game.b.increment[b].cost && game.b.increment[b].bought == false) {
    game.ap.x -= game.b.increment[b].cost;
    /*game.ap.respec[0] += game.b.increment[b].cost;*/
    game.b.increment[b].bought = true;
    if (b >= 1 && b <= 3) {boostsInc(b, 1)}
  }
  functions();
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
  }
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
  if (pressed.shift && pressed.p) {confirmPrestige()}
  if (pressed.r) {refund()}
});
window.addEventListener("blur", function(event) {
  blurred = true;
  game.time = Date.now();
  save();
});
window.addEventListener("focus", function(event) {
  blurred = false;
  doc("loading").style.display = "inline";
  doc("game").style.display = "none";
  loadOffline();
});
window.addEventListener("beforeunload", function(event) {
  game.time = Date.now();
  save();
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
doc("loading").style.display = "inline";
doc("game").style.display = "none";
load();
hide();
functions();
tab(game.in.tab);
