//Declare vars, game state is initialized in `game` using `setGame()` inside `load()`
function setGame(v) {
  if (v == undefined) {v = '0.1.1'}
  if (v == '0.1.1') {
    return {
      inc: {x: 10, prestige: 10, total: 10},
      i: {count: [null, 0, 0, 0]},
      a: {enabled: [false, false, false, false], prestige: {enabled: false, at: 0}},
      aa: {enabled: [false, false, false, false]},
      s: {count: [null, 0, 0, 0]},
      pp: {x: 0, ascension: 0, total: 0, start: null, time: 1e100, best: 1e100, lastPrestige: 0, lastTen: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      u: {count: [null, 0, 0, 0], refund: [0, false]},
      pi: {count: [null, 0, 0, 0]},
      c: {p: {in: [null, false, false, false, false, false, false, false, false], count: [null, 0, 0, 0, 0, 0, 0, 0, 0]}, a: {}},
      ap: {x: 0, transcension: 0, total: 0, start: null, time: 1e100, best: 1e100, lastAscension: 0, lastTen: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      b: {inc: {bought: [null, 0, 0, 0], effect: [null, 0, 0, 0], inc: {bought: false, effect: 0}}, pinc: {bought: [null, false, false, false], effect: [null, 1, 0, 0]}},
      m: {inc: {bought: 0, effect: [null, 0, 0, 0]}, pinc: {bought: 0, effect: [null, 0, 0, 0]}},
      unlocked: {scaling: false, pincBoosts: false},
      confirm: {reset: true, challenge: true, prestige: true, ascension: true},
      toggle: {stats: false, unlocks: true, i1: false},
      in: {tab: 1, subTabP: 1, subTabA: 11, subSubTabA: 111},
      time: 0,
      version: [0, 1, 1],
    }
  }
}
var game = {}
var broken = {}
var freeze = false;
var blurred = false;
var pc4effect = 1;
var pressed = {a: false, p: false, r: false, one: false, two: false, shift: false}
var offline = 4;

//Initial var setup
function start() {if (game.pp.start == null) {game.pp.start = Date.now()}; if (game.ap.start == null) {game.ap.start = Date.now()}}
setInterval(() => {if (doc("loading").style.display == "none") {broken = game}}, 1000);

//const vars
const trued = [false, true];
const scost = [null, [1e20, 1e21, 1e23, 1e34, 1e45, "Max"], [1e22, 1e26, 1e35, 1e46, "Max", "Max"], [1e24, 1e27, "Max", "Max", "Max", "Max"]];
const pcgoal = [null, [1e12, 1e17, 1e19, 4.92e20, 3.59e34, "Completed"], [5.12e9, 2.5e10, 5e14, 2.5e26, "Completed", "Completed",], [1e8, 2.75e32, "Completed", "Completed", "Completed", "Completed"], [2.43e19, "Completed", "Completed", "Completed", "Completed", "Completed"], [5e13, "Completed", "Completed", "Completed", "Completed"]];
const binccost = [null, 1, 1, 1, 10];
const cmax = [null, 5, 4, 2, 1, 1];

//Function vars, not saved but updated
var i = {x: [0, 0, 0, 0], cost: [null, 0, 0, 0]}
var arate = 0;
var pp = {gain: 0, req: 1e9, end: null, average: 0}
var u = {max: [null, 0, 0, 0], cost: [null, 0, 0, 0]}
var pi = {x: [null, 0, 0, 0], cost: [null, 0, 0, 0]};
var ap = {gain: 0, req: 1e10, end: null, average: 0};

//Automation loops
const interval = (a, rate) => {
  setTimeout(() => {
    if (blurred == false) {
      if (a == 0 && game.a.enabled[0]) {increment(0)}
      if (a == 1 && game.a.enabled[1] && (game.inc.x >= (i.cost[1] * 10) || game.inc.x == i.cost[1]) && game.toggle.i1) {increment(1)}
      if (a == 1 && game.a.enabled[1] && !game.toggle.i1) {increment(1)}
      if (a == 2 && game.a.enabled[2]) {increment(2)}
      if (a == 3 && game.a.enabled[3]) {increment(3)}
      if (game.a.enabled[0]) {doc("incxTopSec").textContent = e(i.x[0] * arate, 2)}
      else {doc("incxTopSec").textContent = 0}
    }
    if (game.a.enabled[a]) {interval(a, rate)}
  }, (1000 / rate));
}
const refunding = () => {
  setTimeout(() => {
    for (let i = 1; i < 4; i++) {
      if (game.u.count[i] > 0) {
        game.u.count[i]--;
        updateu1();
        updateu2();
        updateu3();
        game.pp.x += u.cost[i];
        updatepinc();
        updaterefund();
        updatestatpinc();
      }
      if (game.u.count[1] > 0 || game.u.count[2] > 0 || game.u.count[3] > 0) {refunding()}
    }
    game.u.refund[0] = 0;
  }, 1);
}
const alayer = (a, rate) => {
  setTimeout(() => {
    if (a == 'prestige') {
      if (!blurred && game.inc.prestige >= pp.req && game.a.prestige.at != null && pp.gain >= game.a.prestige.at) {prestige()}
      if (game.a.prestige.enabled) {alayer(a, rate); doc("ppxTopSec").textContent = e(Math.floor(pp.average * 1000), 2)}
      else {doc("ppxTopSec").textContent = 0}
    }
  }, (1000 / rate));
}
const boostsInc = (a, rate) => {
  setTimeout(() => {
    if (game.b.inc.bought[a] && !blurred) {
      game.b.inc.effect[a]++;
      updatei0();
      updatei1();
      updatei2();
      updatei3();
      updateauto();
      updatebinc1();
      updatebinc2();
      updatebinc3();
    }
    if (a == 'inc' && game.b.inc.inc.bought && !blurred) {
      game.b.inc.inc.effect++;
      updatei0();
      updatei1();
      updatepinc();
      updatebincinc();
      updatestatpinc();
    }
    if (a >= 1 && a <= 2 && game.b.inc.bought[a]) {boostsInc(a, rate)}
    if (a == 3 && game.b.inc.bought[3] && game.b.inc.effect[3] < 864000) {boostsInc(3, rate)}
    if (a == 'inc' && game.b.inc.inc.bought) {boostsInc(a, rate)}
  }, (1000 / rate));
}
const boostsPinc = (a, rate) => {
  setTimeout(() => {
    if (a == 3 && game.b.pinc.bought[3] && !blurred) {
      game.b.pinc.effect[3]++;
      updateauto();
    }
  }, (1000 / rate));
}

//Functions relating to changes to the save data
function confirmReset() {
  if (game.confirm.reset) {
    let confirmed = confirm("您确定要重置吗？ 你将失去所有的进度！");
    if (confirmed) {reset()}
  }
  else {reset()}
}
function reset() {
  doc("loading").style.display = "inline";
  doc("game").style.display = "none";
  freeze = true;
  game = setGame();
  start();
  hide();
  updates();
  unlockinc();
  unlockpinc();
  unlockainc();
  tab(1);
  freeze = false;
  setTimeout(() => {
    updates();
    unlockinc();
    unlockpinc();
    unlockainc();
    doc("loading").style.display = "none";
    doc("game").style.display = "inline";
    console.log("Reset Game");
  }, 1);
}
function resetPrestige() {
  for (let i = 0; i < 4; i++) {
    if (game.a.enabled[i] && !game.aa.enabled[i]) {game.a.enabled[i] = false}
    if (!game.a.enabled[i] && game.aa.enabled[i] && !game.c.p.in[1]) {automate(i)}
    if (game.c.p.in[1]) {game.a.enabled[i] = false; game.aa.enabled[i] = false}
  }
  game.i.count[1] = 0;
  game.i.count[2] = 0;
  game.i.count[3] = 0;
  updatei1();
  updatei2();
  updatei3();
  game.inc.x = i.cost[1];
  game.inc.prestige = i.cost[1];
  hide();
  updates();
  unlockinc();
  unlockpinc();
  unlockainc();
}
function resetAscension() {
  for (let i = 0; i < 4; i++) {
    game.a.enabled[i] = false;
    game.aa.enabled[i] = false;
  }
  game.a.prestige.enabled = false;
  for (let i = 1; i < 4; i++) {
    game.s.count[i] = 0;
    game.u.count[i] = 0;
    game.pi.count[i] = 0;
  }
  for (let i = 1; i < 6; i++) {game.c.p.count[i] = 0}
  game.i.count[1] = 0;
  game.i.count[2] = 0;
  game.i.count[3] = 0;
  updatei1();
  updatei2();
  updatei3();
  game.inc.x = i.cost[1];
  game.inc.prestige = i.cost[1];
  game.pp.x = 0;
  game.pp.ascension = 0;
  hide();
  updates();
  unlockinc();
  unlockpinc();
  unlockainc();
}
function save() {localStorage.setItem("wallgame", JSON.stringify(game))}
function load() {
  let data = JSON.parse(localStorage.getItem("wallgame"));
  if (localStorage.getItem("wallgameFile") != null) {data = localStorage.getItem("wallgameFile"); localStorage.removeItem("wallgameFile")}
  if (data != null) {loadGame(data)}
  else {game = setGame()}
}
function loadGame(d) {
  s("loading");
  h("game");
  freeze = true;
  let data = d;
  if (data.version == undefined) {console.log("Loaded version 0.0.0 - 0.0.6")}
  if (data.version[0] == 0 && data.version[1] == 0 && data.version[2] == 7) {console.log("Loaded version 0.0.7")}
  if (data.version[0] == 0 && data.version[1] == 0 && (data.version[2] == 8 || data.version[2] == 9)) {
    console.log("Loaded version 0.0." + data.version[2])
    game = setGame('0.1.1');
    game.inc = data.inc;
    for (let j = 1; j < 4; j++) {
      game.i.count[j] = data.i[j].count;
      game.s.count[j] = data.s[j].count;
      game.u.count[j] = data.u[j].count;
      game.pi.count[j] = data.pi[j].count;
    }
    for (let i = 0; i < 4; i++) {
      game.a.enabled[i] = !!(data.a.count[i] % 2);
      game.aa.enabled[i] = !!(data.aa[i] % 2);
    }
    game.pp.x = data.pp.x;
    game.pp.ascension = data.pp.total;
    game.pp.total = data.pp.total;
    game.pp.start = data.pp.start;
    game.pp.time = data.pp.time;
    game.pp.best = data.pp.best;
    for (let i = 1; i < 5; i++) {game.c.p.in[i] = data.c[i].in; game.c.p.count[i] = data.c[i].count}
    game.unlocked.scaling = data.unlocked.scaling;
    game.confirm.reset = !!data.confirm.reset;
    game.confirm.challenge = !!data.confirm.challenge;
    game.confirm.prestige = !!data.confirm.prestige;
    game.in.tab = data.inTab;
    game.in.subTabP = data.inSubTab;
    data = game;
  }
  if (data.version[0] == 0 && data.version[1] == 1 && data.version[2] == 0) {
    console.log("Loaded version 0.1.0");
    game = setGame('0.1.1');
    game.inc = data.inc;
    for (let j = 1; j < 4; j++) {
      game.i.count[j] = data.i[j].count;
      game.s.count[j] = data.s[j].count;
      game.u.count[j] = data.u[j].count;
      game.pi.count[j] = data.pi[j].count;
    }
    for (let i = 0; i < 4; i++) {
      game.a.enabled[i] = !!(data.a.count[i] % 2);
      game.aa.enabled[i] = !!(data.aa[i] % 2);
    }
    game.a.prestige.enabled = !!(data.a.prestige.count % 2);
    game.pp.x = data.pp.x;
    game.pp.ascension = data.pp.ascension;
    game.pp.total = data.pp.total;
    game.pp.start - data.pp.start;
    game.pp.time = data.pp.time;
    game.pp.best = data.pp.best;
    game.pp.lastPrestige = data.pp.lastPrestige;
    game.pp.lastTen = data.pp.lastTen;
    for (let i = 1; i < 5; i++) {game.c.p.in[i] = data.c[i].in; game.c.p.count[i] = data.c[i].count}
    game.ap.x = data.ap.x;
    game.ap.transcension = data.ap.transcension;
    game.ap.total = data.ap.total;
    game.ap.start = data.ap.start;
    game.ap.time = data.ap.time;
    game.ap.best = data.ap.best;
    game.ap.lastAscension = data.ap.lastAscension;
    game.ap.lastTen = data.ap.lastTen;
    for (let i = 1; i < 4; i ++) {
      game.b.inc.bought[i] = data.b.increment[i].bought;
      game.b.inc.effect[i] = data.b.increment[i].effect;
    }
    game.unlocked = data.unlocked;
    game.confirm.reset = !!data.confirm.reset;
    game.confirm.challenge = !!data.confirm.challenge;
    game.confirm.prestige = !!data.confirm.prestige;
    game.toggle = data.toggle;
    game.in = data.in;
    game.time = data.time;
    data = game;
  }
  if (data.version[0] == 0 && data.version[1] == 1 && data.version[2] == 1) {console.log("Loaded version 0.1.1"); game = data}
  if (game.version == undefined) {game = setGame()}
  tab(game.in.tab);
  loadOffline();
  loadToggle();
  freeze = false;
  h("loading");
  s("game");
}
function loadOffline() {
  let timeOff = Math.abs(game.time - Date.now());
  let seconds = Math.floor(timeOff / 1000);
  let clicks = Math.floor(seconds * arate);
  let ppTime = game.pp.lastTen[9];
  if (game.a.enabled[0]) {
    if (game.a.prestige.enabled && game.pp.time < timeOff) {
      let pcount = Math.floor(timeOff / game.pp.time);
      game.pp.x += Math.floor(pcount * game.pp.lastPrestige / offline);
      game.pp.ascension += Math.floor(pcount * game.pp.lastPrestige / offline);
      game.pp.total += Math.floor(pcount * game.pp.lastPrestige / offline);
      clicks = Math.floor((timeOff - (pcount * game.pp.time)) * arate / 1000);
    }
    game.inc.x += Math.floor(clicks * i.x[0] / offline);
    game.inc.prestige += Math.floor(clicks * i.x[0] / offline);
    game.inc.total += Math.floor(clicks * i.x[0] / offline);
  }
  for (let i = 1; i < 3; i++) {if (game.b.inc.bought[i]) {game.b.inc.effect[i] += seconds}}
  if (game.b.inc.bought[3] && (game.b.inc.effect[3] + seconds) < 864000) {game.b.inc.effect[3] += seconds}
  if (game.b.inc.inc.bought) {game.b.inc.inc.effect += seconds}
  else if (game.b.inc.bought[3]) {game.b.inc.effect[3] = 864000}
  updates();
  unlockinc();
  unlockpinc();
  unlockainc();
  game.time = Date.now();
  save();
  console.log("Loaded offline progress: " + time(timeOff));
}
function loadToggle() {
  for (let i = 0; i < 4; i++) {if (game.a.enabled[i] && !game.c.p.in[1]) {interval(i, arate)}}
  if (game.a.prestige.enabled) {alayer('prestige', arate)}
  for (let i = 1; i < 3; i++) {if (game.b.inc.bought[i]) {boostsInc(i, 1)}}
  if (game.b.inc.bought[3] && game.b.inc.effect[3] < 864000) {boostsInc(3, 1)}
  if (game.b.inc.inc.bought) {boostsInc('inc', 1)}
  doc("aprestigeat").value = game.a.prestige.at;
  updateauto();
  updateconfirm();
  updatetoggle();
}
function exporty() {
  if (doc("loading").style.display = "none") {copyStringToClipboard(btoa(JSON.stringify(game)))}
  else {copyStringToClipboard(btoa(JSON.stringify(broken)))}
}
function importy() {let data = JSON.parse(atob(prompt("在此处粘贴您的存档代码。"))); if (data !== "") {loadGame(data)}}
function debug(save) {return JSON.parse(atob(save))}

//Useful/convenient functions
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
  if (typeof num == "string") {return num}
  else if (typeof num == "undefined") {return "Error"}
  else if (num >= 1e6) {return num.toExponential(exp)}
  else {return num.toFixed(dec)}
}
function doc(x) {return document.getElementById(x)}
function h(x) {return document.getElementById(x).style.display = "none"}
function s(x) {return document.getElementById(x).style.display = "inline"}
function enabled(x) {if (x) {return "Enabled"} else {return "Disabled"}}
function time(time) {
  let x = time / 1000;
  if (x == Infinity) {return "Infinite Time"}
  let y = e(Math.floor(x / 31536000), 2);
  let yy = (y == 1) ? " Year " : " Years ";
  if (y == 0) {y = ""; yy = ""}
  let d = Math.floor((x % 31536000) / 86400);
  let dd = (d == 1) ? " Day " : " Days ";
  if (d == 0) {d = ""; dd = ""}
  let h = Math.floor((x % 31536000 % 86400) / 3600);
  let hh = (h == 1) ? " Hour " : " Hours ";
  if (h == 0) {h = ""; hh = ""}
  let m = Math.floor((x % 31536000 % 86400 % 3600) / 60);
  let mm = (m == 1) ? " Minute " : " Minutes ";
  if (m == 0) {m = ""; mm = ""}
  let s = (x % 31536000 % 86400 % 3600 % 60).toFixed(3);
  let ss = (s == 1) ? " Second" : " Seconds";
  if (s == 0) {s = ""; ss = ""}
  if (time == 0) {return "0.000 Seconds"}
  else {return y + yy + d + dd + h + hh + m + mm + s + ss}
}
function confirms(c) {
  if (c == 'reset') {
    game.confirm.reset = !game.confirm.reset;
    if (game.confirm.reset) {doc("tReset").style.backgroundColor = "rgb(34, 139, 34)"}
    if (!game.confirm.reset) {doc("tReset").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (c == 'challenge') {
    game.confirm.challenge = !game.confirm.challenge;
    if (game.confirm.challenge) {doc("tChallenge").style.backgroundColor = "rgb(34, 139, 34)"}
    if (!game.confirm.challenge) {doc("tChallenge").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (c == 'prestige') {
    game.confirm.prestige = !game.confirm.prestige;
    if (game.confirm.prestige) {doc("tPrestige").style.backgroundColor = "rgb(34, 139, 34)"}
    if (!game.confirm.prestige) {doc("tPrestige").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (c == 'ascension') {
    game.confirm.ascension = !game.confirm.ascension;
    if (game.confirm.ascension) {doc("tAscension").style.backgroundColor = "rgb(34, 139, 34)"}
    if (!game.confirm.ascension) {doc("tAscension").style.backgroundColor = "rgb(225, 0, 0)"}
  }
}
function toggle(name) {
  if (name == 'stats') {
    game.toggle.stats = !game.toggle.stats;
    if (game.toggle.stats) {doc("stats").style.display = "inline"; doc("tStats").style.backgroundColor = "rgb(34, 139, 34)"}
    if (!game.toggle.stats) {doc("stats").style.display = "none"; doc("tStats").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (name == 'unlocks') {
    game.toggle.unlocks = !game.toggle.unlocks;
    if (game.toggle.unlocks) {
      doc("unlocks").style.display = "inline";
      doc("tUnlocks").style.backgroundColor = "rgb(34, 139, 34)";
    }
    if (!game.toggle.unlocks) {doc("unlocks").style.display = "none"; doc("tUnlocks").style.backgroundColor = "rgb(225, 0, 0)"}
  }
  if (name == 'i1') {
    game.toggle.i1 = !game.toggle.i1;
    if (game.toggle.i1) {doc("ti1").textContent = "Auto Increment 1 buys at 10%"}
    if (!game.toggle.i1) {doc("ti1").textContent = "Auto Increment 1 buys at 100%"}
  }
}

//Display related functions
function updates() {
  updateincrement();
  updateprestige();
  updateascension();
  updateconfirm();
  updatetoggle();
}
function updateincrement() {
  updateinc();
  updatei0();
  updatei1();
  updatei2();
  updatei3();
  updateauto();
  updates1();
  updates2();
  updates3();
  updatestatinc();
}
function updateprestige() {
  updatepinc();
  updaterefund();
  updateppreq();
  updateppgain();
  updateu1();
  updateu2();
  updateu3();
  updatepigain();
  updatepi1();
  updatepi2();
  updatepi3();
  updatecprogress();
  updatepc1();
  updatepc2();
  updatepc3();
  updatepc4();
  updatepc5();
  updatestatpinc();
}
function updateascension() {
  updateainc();
  updateapreq();
  updateapgain();
  updatebinc1();
  updatebinc2();
  updatebinc3();
  updatebincinc();
  updatebpinc1();
  updatebpinc2();
  updatebpinc3();
  updateminc1();
  updateminc2();
  updateminc3();
  updatestatainc();
}

function updateinc() {
  doc("incxTop").textContent = e(game.inc.x, 2);
}
function updatepinc() {
  doc("ppxTop").textContent = e(game.pp.x, 2);
  doc("ppxTab").textContent = e(game.pp.x, 2);
  doc("ppboostTab").textContent = e((1 + Math.log10(game.pp.x + 1)) ** (1.20484 * (1 + ((Math.sqrt(Math.sqrt(Math.sqrt(game.b.inc.inc.effect ** 3)))) / 25))), 2, 2);
}
function updateainc() {
  doc("apxTop").textContent = e(game.ap.x, 2);
  doc("apxTab").textContent = e(game.ap.x, 2);
  doc("apboostTab").textContent = e(1 + Math.log10(game.ap.x + 1), 2, 2);
  doc("apboost2Tab").textContent = e(Math.floor(Math.log10(game.ap.x + 7) ** 5), 2);
}
function updatei0() {
  i.x[0] = Math.floor(((((game.i.count[1] + Math.floor(Math.log10(game.ap.x + 7) ** 5)) * (game.u.count[1] + 1)) * ((game.i.count[2] + 1) * (game.u.count[2] + 1))) ** ((game.i.count[3] + 1) * (1 + (game.u.count[3] / 30)))) * ((1 + Math.log10(game.pp.x + 1)) ** (1.20484 * (1 + ((Math.sqrt(Math.sqrt(Math.sqrt(game.b.inc.inc.effect ** 3)))) / 25)))) * (1 + (((1 + Math.log10(game.b.inc.effect[1] + 1)) ** 4.75) - 1) / 100));
  doc("i0x").textContent = e(i.x[0], 2);
}
function updatei1() {
  i.x[1] = Math.floor((((game.i.count[1] + Math.floor(Math.log10(game.ap.x + 7) ** 5) + 1) * (game.u.count[1] + 1)) * ((game.i.count[2] + 1) * (game.u.count[2] + 1))) ** ((game.i.count[3] + 1) * (1 + (game.u.count[3] / 30))) * ((1 + Math.log10(game.pp.x + 1)) ** (1.20484 * (1 + ((Math.sqrt(Math.sqrt(Math.sqrt(game.b.inc.inc.effect ** 3)))) / 25)))) * (1 + (((1 + Math.log10(game.b.inc.effect[1] + 1)) ** 4.75) - 1) / 100)) - Math.floor(((((game.i.count[1] + Math.floor(Math.log10(game.ap.x + 7) ** 5)) * (game.u.count[1] + 1)) * ((game.i.count[2] + 1) * (game.u.count[2] + 1))) ** ((game.i.count[3] + 1) * (1 + (game.u.count[3] / 30)))) * ((1 + Math.log10(game.pp.x + 1)) ** (1.20484 * (1 + ((Math.sqrt(Math.sqrt(Math.sqrt(game.b.inc.inc.effect ** 3)))) / 25)))) * (1 + (((1 + Math.log10(game.b.inc.effect[1] + 1)) ** 4.75) - 1) / 100));
  doc("i1x").textContent = e(i.x[1], 2);
  if (!game.c.p.in[3]) {
    i.cost[1] = Math.floor((10 * (2 ** ((game.i.count[1] / (1.14 ** (game.c.p.count[3] + 1))) * Math.log10(8 - game.s.count[1] - ((((1 + Math.log10(game.b.inc.effect[3] + 1)) ** 2) - 1) / 100)))) / (1.16 - (0.16 * (0 ** game.i.count[1])) - ((game.u.count[1] * game.b.pinc.effect[1]) / 100))) * (pc4effect ** (game.i.count[1] + game.i.count[2] + game.i.count[3])));
  }
  else {
    i.cost[1] = Math.floor(100000 * (2 ** (game.i.count[1] / 1.14) * Math.log10(8 - game.s.count[1] - ((((1 + Math.log10(game.b.inc.effect[3] + 1)) ** 2) - 1) / 100)))) / (1.16 - (0.16 * (0 ** game.i.count[1])) - ((game.u.count[1] * game.b.pinc.effect[1]) / 100));
  }
  doc("i1cost").textContent = e(i.cost[1], 2);
}
function updatei2() {
  i.x[2] = (game.i.count[2] + 1) * (game.u.count[2] + 1);
  doc("i2x").textContent = e(i.x[2], 2);
  if (!game.c.p.in[3]) {
    i.cost[2] = Math.floor(((1000 * ((10 - game.s.count[2] - ((((1 + Math.log10(game.b.inc.effect[3] + 1)) ** 2) - 1) / 17)) ** (game.i.count[2] / (1.25 ** game.c.p.count[3])))) ** (1.02 ** (game.u.count[2] * game.b.pinc.effect[1]))) * (pc4effect ** (game.i.count[1] + game.i.count[2] + game.i.count[3])));
  }
  else {
    i.cost[2] = Math.floor((1e6 * ((10 - game.s.count[2] - ((((1 + Math.log10(game.b.inc.effect[3] + 1)) ** 2) - 1) / 17)) ** game.i.count[2])) ** (1.02 ** (game.u.count[2] * game.b.pinc.effect[1])));
  }
  
  doc("i2cost").textContent = e(i.cost[2], 2);
}
function updatei3() {
  i.x[3] = (game.i.count[3] + 1) * (1 + (game.u.count[3] / 30));
  doc("i3x").textContent = e(i.x[3], 2, 2);
  if (!game.c.p.in[3]) {
    if (game.i.count[3] >= 1) {
      i.cost[3] = Math.floor(((10 - (0.25 * game.c.p.count[3])) ** ((6 - (game.s.count[3] / 10) - ((((1 + Math.log10(game.b.inc.effect[3] + 1)) ** 3.75) - 1) / 5000)) * (2 ** game.i.count[3]))) * (3 ** (game.u.count[3] * game.b.pinc.effect[1])) * (pc4effect ** (game.i.count[1] + game.i.count[2] + game.i.count[3])));
    }
    else {i.cost[3] = Math.floor(((10 - (0.25 * game.c.p.count[3])) ** (5 * (2 ** game.i.count[3]))) * (3 ** (game.u.count[3] * game.b.pinc.effect[1])))}
  }
  else {
    if (game.i.count[3] >= 1) {
      i.cost[3] = Math.floor((10 ** ((10 - (game.s.count[3] / 10) - ((((1 + Math.log10(game.b.inc.effect[3] + 1)) ** 3.75) - 1) / 5000)) * (2 ** game.i.count[3]))) * (3 ** (game.u.count[3] * game.b.pinc.effect[1])) * (pc4effect ** (game.i.count[1] + game.i.count[2] + game.i.count[3])));
    }
    else {i.cost[3] = Math.floor((10 ** (9 * (2 ** game.i.count[3]))) * (3 ** (game.u.count[3] * game.b.pinc.effect[1])))}
  }
  doc("i3cost").textContent = e(i.cost[3], 2);
}
function updateauto() {
  arate = Math.floor(25 + (15 * game.c.p.count[1] * (1 + game.c.p.count[5])) + Math.log10(((2 * game.b.inc.effect[2]) ** 5) + 1));
  for (let i = 0; i < 4; i++) {
    doc("ai" + i + "rate").textContent = arate;
    doc("a" + i + "enabled").textContent = enabled(game.a.enabled[i]);
    doc("aa" + i + "enabled").textContent = enabled(game.aa.enabled[i]);
  }
  doc("aprestigeenabled").textContent = enabled(game.a.prestige.enabled);
  doc("aprestigeat").textContent = game.a.prestige.at;
  doc("apenabledInput").checked = game.a.prestige.enabled;
}
function updates1() {
  doc("s1count").textContent = game.s.count[1];
  doc("s1cost").textContent = e(scost[1][game.s.count[1]], 2);
}
function updates2() {
  doc("s2count").textContent = game.s.count[2];
  doc("s2cost").textContent = e(scost[2][game.s.count[2]], 2);
}
function updates3() {
  doc("s3count").textContent = game.s.count[3];
  doc("s3cost").textContent = e(scost[3][game.s.count[3]], 2);
}
function updaterefund() {
  doc("refundx").textContent = e(game.u.refund[0], 2);
  (game.u.refund[1]) ? doc("refund").style.backgroundColor = "rgb(35, 35, 35)" : doc("refund").style.backgroundColor = "rgb(0, 0, 0)";
}
function updateppreq() {
  pp.req = 1e9 / (10 ** game.c.p.count[4]);
  let ppReqNext = pp.req * (100 ** Math.floor(((Math.abs(Math.log10(game.inc.prestige) - (Math.log10(pp.req) - 1)) - ((Math.log10(pp.req) - 1) - Math.log10(game.inc.prestige))) / 4) + 0.5));
  if (game.inc.prestige == 0) {ppReqNext = pp.req}
  doc("ppReq").textContent = e(ppReqNext - game.inc.prestige, 2);
}
function updateppgain() {
  if (game.inc.prestige < pp.req) {pp.gain = 0}
  else {
    pp.gain = Math.floor((((game.pi.count[1] * (game.pi.count[2] + 1)) ** (game.pi.count[3] + 1)) + Math.floor(((Math.abs(Math.log10(game.inc.prestige) - (Math.log10(pp.req) - 1)) - ((Math.log10(pp.req) - 1) - Math.log10(game.inc.prestige))) / 4) + 0.5)) * (1 + Math.log10(game.ap.x + 1)));
  }
  doc("ppgain").textContent = e(pp.gain, 2);
}
function updateu1() {
  doc("u1count").textContent = game.u.count[1];
  u.max[1] = 5 + (game.c.p.count[2] * (1 + game.c.p.count[5]));
  doc("u1max").textContent = u.max[1];
  u.cost[1] = Math.floor((game.u.count[1] + 1) ** 1.25);
  (game.u.count[1] == u.max[1]) ? doc("u1cost").textContent = "Max" : doc("u1cost").textContent = e(u.cost[1], 2) + " PP";
  if (game.b.pinc.bought[1]) {h("u1neg")}
}
function updateu2() {
  doc("u2count").textContent = game.u.count[2];
  u.max[2] = 5 + (game.c.p.count[2] * (1 + game.c.p.count[5]));
  doc("u2max").textContent = u.max[2];
  u.cost[2] = Math.ceil(1 + (1.99 ** (game.u.count[2] * 1.2)));
  (game.u.count[2] == u.max[2]) ? doc("u2cost").textContent = "Max" : doc("u2cost").textContent = e(u.cost[2], 2) + " PP";
  if (game.b.pinc.bought[1]) {h("u2neg")}
}
function updateu3() {
  doc("u3count").textContent = game.u.count[3];
  u.max[3] = 5 + (game.c.p.count[2] * (1 + game.c.p.count[5]));
  doc("u3max").textContent = u.max[3];
  u.cost[3] = Math.floor(10 ** ((game.u.count[3] + 1) * 1.05));
  (game.u.count[3] == u.max[3]) ? doc("u3cost").textContent = "Max" : doc("u3cost").textContent = e(u.cost[3], 2) + " PP";
  if (game.b.pinc.bought[1]) {h("u3neg")}
}
function updatepigain() {
  doc("pigain").textContent = e((game.pi.count[1] * (game.pi.count[2] + 1)) ** (game.pi.count[3] + 1), 2);
}
function updatepi1() {
  pi.x[1] = (((game.pi.count[1] + 1) * (game.pi.count[2] + 1)) ** (game.pi.count[3] + 1)) - ((game.pi.count[1] * (game.pi.count[2] + 1)) ** (game.pi.count[3] + 1));
  doc("pi1x").textContent = e(pi.x[1], 2);
  pi.cost[1] = Math.ceil(10 * (1.25 ** (game.pi.count[1] * 1.1)));
  doc("pi1cost").textContent = e(pi.cost[1], 2);
}
function updatepi2() {
  pi.x[2] = game.pi.count[2] + 1;
  doc("pi2x").textContent = e(pi.x[2], 2);
  pi.cost[2] = Math.floor(1000 * (7.5 ** game.pi.count[2]));
  doc("pi2cost").textContent = e(pi.cost[2], 2);
}
function updatepi3() {
  pi.x[3] = game.pi.count[3] + 1;
  doc("pi3x").textContent = e(pi.x[3], 2);
  pi.cost[3] = 10 ** (6 * (2 ** game.pi.count[3]));
  doc("pi3cost").textContent = e(pi.cost[3], 2);
}
function updatecprogress() {
  for (let j = 1; j < 6; j++) {
    if (game.c.p.in[j]) {
      s("cprogress");
      s("cprogressTime");
      doc("cnum").textContent = j;
      doc("cnumTime").textContent = j;
      doc("cgoal").textContent = e(pcgoal[j][game.c.p.count[j]] - game.inc.prestige, 2);
      if (game.a.enabled[0]) {
        doc("ctime").textContent = time(((pcgoal[j][game.c.p.count[j]] - game.inc.prestige) * 1000) / (i.x[0] * arate));
      }
      else {doc("ctime").textContent = "Infinity Years"}
      if (game.inc.prestige >= pcgoal[j][game.c.p.count[j]]) {
        h("cprogress");
        h("cprogressTime");
        s("ccomplete");
      }
    }
  }
}
function updatepc1() {
  doc("pc1count").textContent = game.c.p.count[1];
  doc("pc1goal").textContent = e(pcgoal[1][game.c.p.count[1]], 2);
}
function updatepc2() {
  doc("pc2count").textContent = game.c.p.count[2];
  doc("pc2goal").textContent = e(pcgoal[2][game.c.p.count[2]], 2);
}
function updatepc3() {
  doc("pc3count").textContent = game.c.p.count[3];
  doc("pc3goal").textContent = e(pcgoal[3][game.c.p.count[3]], 2);
}
function updatepc4() {
  doc("pc4count").textContent = game.c.p.count[4];
  doc("pc4goal").textContent = e(pcgoal[4][game.c.p.count[4]], 2);
  if (game.c.p.in[4]) {pc4effect = 1 + (0.075 * (game.c.p.count[4] + 1))}
  else {pc4effect = 1}
}
function updatepc5() {
  doc("pc5count").textContent = game.c.p.count[5];
  doc("pc5goal").textContent = e(pcgoal[5][game.c.p.count[5]], 2);
}
function updateapreq() {
  ap.req = 1e10 /*/ (1.584894 ** game.c.p.count[5])*/;
  let apReqNext = ap.req * (100 ** Math.floor(((Math.abs(Math.log10(game.pp.ascension) - (Math.log10(ap.req) - 1)) - ((Math.log10(ap.req) - 1) - Math.log10(game.pp.ascension))) / 4) + 0.5));
  if (game.pp.ascension == 0) {apReqNext = ap.req}
  doc("apReq").textContent = e(apReqNext - game.pp.ascension, 2);
}
function updateapgain() {
  if (game.pp.ascension < 1e10) {ap.gain = 0}
  else {
    ap.gain = Math.floor(((Math.abs(Math.log10(game.pp.ascension) - (Math.log10(ap.req) - 1)) - ((Math.log10(ap.req) - 1) - Math.log10(game.pp.ascension))) / 4) + 0.5);
  }
  doc("apgain").textContent = e(ap.gain, 2);
  doc("statAPGainx").textContent = e(game.ap.gain, 2);
}
function updatebinc1() {
  if (((1 + Math.log10(game.b.inc.effect[1] + 1)) ** 4.75) - 1 >= 100) {
    doc("binc1effect").textContent = "*" + e(1 + ((((1 + Math.log10(game.b.inc.effect[1] + 1)) ** 4.75) - 1) / 100), 2, 2);
  }
  else {
    doc("binc1effect").textContent = "+" + e(((1 + Math.log10(game.b.inc.effect[1] + 1)) ** 4.75) - 1, 2, 2) + "%";
  }
  if (game.b.inc.bought[1]) {
    doc("binc1").style.backgroundColor = "rgb(55, 55, 55)";
    doc("binc1cost").textContent = "Bought";
  }
  else {
    doc("binc1").style.backgroundColor = "rgb(25, 25, 25)";
    doc("binc1cost").textContent = "Cost: 1 AP";
  }
}
function updatebinc2() {
  doc("binc2effect").textContent = "+" + Math.floor(Math.log10(((2 * game.b.inc.effect[2]) ** 5) + 1)) + "/sec";
  if (game.b.inc.bought[2]) {
    doc("binc2").style.backgroundColor = "rgb(55, 55, 55)";
    doc("binc2cost").textContent = "Bought";
  }
  else {
    doc("binc2").style.backgroundColor = "rgb(25, 25, 25)";
    doc("binc2cost").textContent = "Cost: 1 AP";
  }
}
function updatebinc3() {
  doc("binc3effect").textContent = "-" + e((((1 + Math.log10(game.b.inc.effect[3] + 1)) ** 2) - 1) / 100, 2, 2) + ", -" + e((((1 + Math.log10(game.b.inc.effect[3] + 1)) ** 2) - 1) / 17, 2, 2) + ", -" + e((((1 + Math.log10(game.b.inc.effect[3] + 1)) ** 3.75) - 1) / 5000, 2, 2);
  if (game.b.inc.bought[3]) {
    doc("binc3").style.backgroundColor = "rgb(55, 55, 55)";
    doc("binc3cost").textContent = "Bought";
  }
  else {
    doc("binc3").style.backgroundColor = "rgb(25, 25, 25)";
    doc("binc3cost").textContent = "Cost: 1 AP";
  }
}
function updatebincinc() {
  doc("bincinceffect").textContent = "^" + e(1 + ((Math.sqrt(Math.sqrt(Math.sqrt(game.b.inc.inc.effect ** 3)))) / 25), 2, 2);
  if (game.b.inc.inc.bought) {
    doc("bincinc").style.backgroundColor = "rgb(55, 55, 55)";
    doc("bincinccost").textContent = "Bought";
  }
  else {
    doc("bincinc").style.backgroundColor = "rgb(25, 25, 25)";
    doc("bincinccost").textContent = "Cost: 10 AP";
  }
}
function updatebpinc1() {
  if (game.b.pinc.bought[1]) {
    doc("bpinc1").style.backgroundColor = "rgb(55, 55, 55)";
    doc("bpinc1cost").textContent = "Bought";
    doc("bpinc1effect").textContent = "True";
  }
  else {
    doc("bpinc1").style.backgroundColor = "rgb(25, 25, 25)";
    doc("bpinc1cost").textContent = "Cost: 5 AP";
    doc("bpinc1effect").textContent = "False";
  }
}
function updatebpinc2() {
  
}
function updatebpinc3() {
  doc("bpinc3effect").textContent = "+" + Math.floor(Math.sqrt(Math.sqrt(Math.sqrt(game.b.pinc.effect[3]))) ** 3) + " +" + Math.floor(Math.log10(game.b.pinc.effect[3] + 1) ** 2) + " +" + Math.floor(Math.sqrt(Math.sqrt(game.b.pinc.effect[3])) / 2.5) + " /" + Math.floor(1 + Math.log10(game.b.pinc.effect[3] + 1) ** 3.8778);
  if (doc("pc5").style.display == "inline") {doc("bpinc3effect2").textContent = "+0"}
  else {doc("bpinc3effect2").textContent = ""}
  if (game.b.pinc.bought[3]) {
    doc("bpinc3").style.backgroundColor = "rgb(55, 55, 55)";
    doc("bpinc3cost").textContent = "Bought";
  }
  else {
    doc("bpinc3").style.backgroundColor = "rgb(25, 25, 25)";
    doc("bpinc3cost").textContent = "Cost: 10 AP";
  }
}
function updateminc1() {
  if (game.m.inc.bought >= 1) {
    doc("minc1").style.backgroundColor = "rgb(55, 55, 55)";
    doc("minc1cost").textContent = "Bought";
  }
  else {
    doc("minc1").style.backgroundColor = "rgb(25, 25, 25)";
    doc("minc1cost").textContent = "Cost: 5 AP";
  }
}
function updateminc2() {
  if (game.m.inc.bought >= 2) {
    doc("minc2").style.backgroundColor = "rgb(55, 55, 55)";
    doc("minc2cost").textContent = "Bought";
  }
  else {
    doc("minc2").style.backgroundColor = "rgb(25, 25, 25)";
    doc("minc2cost").textContent = "Cost: 10 AP";
  }
}
function updateminc3() {
  if (game.m.inc.bought >= 3) {
    doc("minc3").style.backgroundColor = "rgb(55, 55, 55)";
    doc("minc3cost").textContent = "Bought";
  }
  else {
    doc("minc3").style.backgroundColor = "rgb(25, 25, 25)";
    doc("minc3cost").textContent = "Cost: 25 AP";
  }
}
function updatestatinc() {
  doc("statIncTotalx").textContent = e(game.inc.total, 2);
  doc("statIncPrestigex").textContent = e(game.inc.prestige, 2);
}
function updatestatpinc() {
  doc("statPPTotalx").textContent = e(game.pp.total, 2);
  doc("statPPAscensionx").textContent = e(game.pp.ascension, 2);
  doc("statPPBoostx").textContent = e((1 + Math.log10(game.pp.x + 1)) ** (1.20484 * (1 + ((Math.sqrt(Math.sqrt(Math.sqrt(game.b.inc.inc.effect ** 3)))) / 25))), 2, 2);
  doc("statPPGainx").textContent = e(pp.gain, 2);
  if (game.pp.time < game.pp.best && game.pp.gain != 0) {game.pp.best = game.pp.time}
  doc("statPPTimex").textContent = time(game.pp.best);
}
function updatestatainc() {
  doc("statAPTotalx").textContent = e(game.ap.total, 2);
  doc("statAPBoostx").textContent = e(1 + Math.log10(game.ap.x + 1), 2, 2);
  if (game.ap.time < game.ap.best && game.ap.gain != 0) {game.ap.best = game.ap.time}
  doc("statAPGainx").textContent = e(ap.gain, 2);
  doc("statAPTimex").textContent = time(game.ap.best);
}
function updateconfirm() {
  if (game.confirm.reset) {doc("tReset").style.backgroundColor = "rgb(34, 139, 34)"}
  if (!game.confirm.reset) {doc("tReset").style.backgroundColor = "rgb(225, 0, 0)"}
  if (game.confirm.challenge) {doc("tChallenge").style.backgroundColor = "rgb(34, 139, 34)"}
  if (!game.confirm.challenge) {doc("tChallenge").style.backgroundColor = "rgb(225, 0, 0)"}
  if (game.confirm.prestige) {doc("tPrestige").style.backgroundColor = "rgb(34, 139, 34)"}
  if (!game.confirm.prestige) {doc("tPrestige").style.backgroundColor = "rgb(225, 0, 0)"}
  if (game.confirm.ascension) {doc("tAscension").style.backgroundColor = "rgb(34, 139, 34)"}
  if (!game.confirm.ascension) {doc("tAscension").style.backgroundColor = "rgb(225, 0, 0)"}
}
function updatetoggle() {
  if (game.toggle.stats) {doc("tStats").style.backgroundColor = "rgb(34, 139, 34)"; s("stats")}
  if (!game.toggle.stats) {doc("tStats").style.backgroundColor = "rgb(225, 0, 0)"; h("stats")}
  if (game.toggle.unlocks) {doc("tUnlocks").style.backgroundColor = "rgb(34, 139, 34)"; s("unlocks")}
  if (!game.toggle.unlocks) {doc("tUnlocks").style.backgroundColor = "rgb(225, 0, 0)"; h("unlocks")}
  if (game.toggle.i1) {doc("ti1").textContent = "Auto Increment 1 buys at 10%"}
  if (!game.toggle.i1) {doc("ti1").textContent = "Auto Increment 1 buys at 100%"}
}

function unlockinc() {
  let i = game.inc.prestige;
  let p = game.pp.ascension;
  if (p >= 1) {doc("unlockIncType").textContent = "Scaling"; doc("unlockIncReq").textContent = e(1e22 - i, 2)}
  else {doc("unlockIncType").textContent = "Automation"; doc("unlockIncReq").textContent = 2500 - i}
  doc("unlockIReq").textContent = 1000 - i;
  if (p < 1000) {doc("unlockAReq").textContent = e(2.5e9 - i, 2); s("unlockA")} else {(h("unlockA"))}
  if (p < 177) {doc("unlockAReq").textContent = e(2.5e7 - i, 2)}
  if (p < 31) {doc("unlockAReq").textContent = 250000 - i}
  if (p < 5) {doc("unlockAReq").textContent = 2500 - i}
  s("unlockInc");
  if (!game.c.p.in[5]) {s("unlockI")} else {h("unlockI")}
  if (i >= 1000 && !game.c.p.in[5]) {
    doc("unlockIReq").textContent = 100000 - i;
    s("i2");
  }
  if (i >= 2500) {
    if (p >= 0) {doc("unlockIncType").textContent = "Scaling"; doc("unlockIncReq").textContent = e(1e22 - i,2)}
    else {doc("unlockIncType").textContent = "Prestige"; doc("unlockIncReq").textContent = e(1e9 - i, 2)}
    if (p < 31) {doc("unlockAReq").textContent = 250000 - i}
    s("tabAutomation");
    s("incTopSec");
    s("ai0");
    s("hk1");
  }
  if (i >= 100000 && !game.c.p.in[5]) {
    s("i3");
    h("unlockI");
  }
  if (i >= 250000) {
    if (p < 177) {doc("unlockAReq").textContent = e(2.5e7 - i, 2)}
    s("ai1");
  }
  if (i >= 2.5e7) {
    doc("unlockAReq").textContent = e(2.5e9 - i, 2);
    s("ai2");
  }
  if (i >= 1e9) {
    doc("unlockIncType").textContent = "Scaling";
    doc("unlockIncReq").textContent = e(1e22 - i, 2);
    s("tabPrestige");
  }
  if (i >= 2.5e9) {
    h("unlockA");
    s("ai3");
  }
  if (i >= 1e22) {
    game.unlocked.scaling = true;
  }
  if (game.unlocked.scaling) {
    s("tabScaling");
    h("unlockInc");
  }
  for (let j = 1; j <= game.b.inc.bought; j++) {s("minc" + j)}
  if (game.m.inc.bought >= 1) {
    s("i2");
    s("i3");
    s("minc2");
    h("unlockI");
  }
  if (game.m.inc.bought >= 2) {
    s("ai0");
    s("ai1");
    s("ai2");
    s("ai3");
    s("aa0");
    s("aa1");
    s("aa2");
    s("aa3");
    s("minc3");
    h("unlockInc");
  }
}
function unlockpinc() {
  let i = game.inc.prestige;
  let p = game.pp.ascension;
  let a = game.ap.transcension;
  if (a == 0) {doc("unlockPincType").textContent = "Upgrades"; doc("unlockPincReq").textContent = 1 - p}
  else {doc("unlockPincType").textContent = "Auto Increment on Prestige"; doc("unlockPincReq").textContent = 5 - p}
  doc("unlockPiReq").textContent = 10 - p;
  if (p >= 1) {
    doc("unlockPincType").textContent = "Auto Increment on Prestige";
    doc("unlockPincReq").textContent = 5 - p;
    s("unlockPinc");
    if (p < 1000 && i < 2.5e9) {s("unlockA")}
    s("tabAutomation");
    s("tabPrestige");
    s("subTabUpgrades");
    s("tPrestige");
    s("incTopSec");
    s("ppTop");
    s("refund");
    s("u1");
    s("u2");
    s("u3");
    s("statPPTotal");
    s("statPPBoost");
    s("statPPGain");
    s("statPPTime");
    s("statIncPrestige");
  }
  if (p >= 5) {
    if (a == 0) {
      doc("unlockPincType").textContent = "P-Increments";
      doc("unlockPincReq").textContent = 10 - p;
    }
    else {
      doc("unlockPincType").textContent = "Auto Increment 1 on Prestige";
      doc("unlockPincReq").textContent = 31 - p;
    }
    s("ai0");
    s("aa0");
    s("hk1");
    s("hk2");
  }
  if (p >= 10) {
    doc("unlockPincType").textContent = "Auto Increment 1 on Prestige";
    doc("unlockPincReq").textContent = 31 - p;
    doc("unlockPiReq").textContent = 1000 - p;
    s("unlockPi");
    s("subTabPincrements");
    s("pi1");
  }
  if (p >= 31) {
    if (a == 0) {
      doc("unlockPincType").textContent = "P-Challenges";
      doc("unlockPincReq").textContent = 50 - p;
    }
    else {
      doc("unlockPincType").textContent = "Auto Increment 2 on Prestige";
      doc("unlockPincReq").textContent = 177 - p;
    }
    s("ai1");
    s("aa1");
  }
  if (p >= 50) {
    doc("unlockPincType").textContent = "Auto Increment 2 on Prestige";
    doc("unlockPincReq").textContent = 177 - p;
    s("subTabPChallenges");
  }
  if (p >= 177) {
    doc("unlockPincType").textContent = "Auto Increment 3 on Prestige";
    doc("unlockPincReq").textContent = 1000 - p;
    s("ai2");
    s("aa2");
  }
  if (p >= 1000) {
    doc("unlockPincType").textContent = "Auto Prestige";
    doc("unlockPincReq").textContent = 10000 - p;
    doc("unlockPiReq").textContent = e(1e6 - p, 2);
    s("ai3");
    s("aa3");
    s("pi2");
  }
  if (p >= 10000) {
    if (a == 0) {
      doc("unlockPincType").textContent = "Ascension";
      doc("unlockPincReq").textContent = e(1e10 - p, 2);
    }
    else if (!game.unlocked.pincBoosts) {
      doc("unlockPincType").textContent = "Prestige Boosts";
      doc("unlockPincReq").textContent = e(1e11 - p, 2);
    }
    s("ppTopSec");
    s("aprestige");
  }
  if (p >= 1e6) {
    s("pi3");
    h("unlockPi");
  }
  if (p >= 1e10) {
    s("tabAscension");
    h("unlockPinc");
  }
  if (p >= 1e11 && a >= 1) {
    game.unlocked.pincBoosts = true;
  }
  if (game.unlocked.pincBoosts) {s("subSubTabPincBoosts"); h("unlockPinc")}
}
function unlockainc() {
  let p = game.pp.ascension;
  let a = game.ap.transcension;
  if (a >= 1) {
    doc("unlockAincType").textContent ="Mastery";
    doc("unlockAincReq").textContent = 5 - a;
    if (!game.unlocked.pincBoosts) {s("unlockPinc")}
    if (p >= 1e12) {h("unlockPinc")}
    s("unlockAinc");
    s("unlockPi");
    if (p >= 1e6) {h("unlockPi")}
    if (p >= 1000) {h("unlockA")}
    s("tabAutomation");
    s("tabPrestige");
    s("tabAscension");
    s("subTabUpgrades");
    s("subTabPincrements");
    s("subTabPChallenges");
    s("subTabBoosts");
    s("subSubTabIncBoosts");
    s("ppTop");
    s("apTop");
    s("incTopSec");
    s("ppTopSec");
    s("refund");
    s("u1");
    s("u2");
    s("u3");
    s("binc1");
    s("binc2");
    s("binc3");
    s("statAPTotal");
    s("statAPBoost");
    s("statAPGain");
    s("statAPTime");
    s("statPPTotal");
    s("statPPAscension");
    s("statPPBoost");
    s("statPPGain");
    s("statPPTime");
    s("statIncPrestige");
    s("tPrestige");
    s("tAscension");
  }
  if (a >= 5) {
    doc("unlockAincType").textContent ="P-Challenge 5";
    doc("unlockAincReq").textContent = 15 - a;
    s("subTabMastery");
  }
  if (a >= 15) {
    doc("unlockAincType").textContent ="A-Increments";
    doc("unlockAincReq").textContent = 25 - a;
    s("pc5");
    h("unlockAinc");
  }
  if (a >= 25) {
    
  }
  if (game.b.inc.bought[1] && game.b.inc.bought[2] && game.b.inc.bought[3]) {
    s("bincinc");
  }
}
function hide() {
  let unlockArray = ["Inc", "Pinc", "Ainc", "I", "A", "Pi"];
  for (let i = 0; i < unlockArray.length; i++) {h("unlock" + unlockArray[i])}
  let tabArray = ["Automation", "Scaling", "Prestige", "Ascension"];
  for (let i = 0; i < tabArray.length; i++) {h("tab" + tabArray[i])}
  let subTabArray = ["Upgrades", "Pincrements", "PChallenges", "Boosts", "Mastery", "Aincrements", "AChallenges"];
  for (let i = 0; i < subTabArray.length; i++) {h("subTab" + subTabArray[i])}
  h("subSubTabIncBoosts");
  h("subSubTabPincBoosts");
  h("ppTop");
  h("apTop");
  h("incTopSec");
  h("ppTopSec");
  h("cprogress");
  h("cprogressTime");
  h("ccomplete");
  h("refund");
  for (let i = 2; i < 4; i++) {h("i" + i); h("hk" + (i - 1)); h("minc" + i)}
  for (let i = 0; i < 4; i++) {h("ai" + i); h("aa" + i)}
  for (let i = 1; i < 4; i++) {h("u" + i); h("pi" + i); h("binc" + i)}
  h("aprestige");
  h("pc5");
  h("bincinc");
  h("bpinc3");
  let statArray = ["s", "APTotal", "APBoost", "APGain", "APTime", "PPTotal", "PPAscension", "PPBoost", "PPGain", "PPTime", "IncPrestige"];
  for (let i = 0; i < statArray.length; i++) {h("stat" + statArray[i])}
  h("tPrestige");
  h("tAscension");
}
function checkFreeze() {
  for (let i = 1; i < 6; i++) {if (game.c.p.in[i] && game.inc.prestige >= pcgoal[i][game.c.p.count[i]]) {freeze = true}}
}

//0th Prestige layer `Increment`
function increment(n) {
  if (n == 0 && !freeze) {
    game.inc.x += i.x[0];
    game.inc.prestige += i.x[0];
    game.inc.total += i.x[0];
    updateinc();
    updateppreq();
    updateppgain();
    updatecprogress();
    updatestatinc();
    updatestatpinc();
    unlockinc();
    checkFreeze();
  }
  if (n == 1 && game.inc.x >= i.cost[1] && !freeze && !game.c.p.in[5]) {
    game.inc.x -= i.cost[1];
    game.i.count[1]++;
    updateinc();
    updatei0();
    updatei1();
    updatei2();
    updatei3();
  }
  if (n == 2 && game.inc.x >= i.cost[2] && !freeze && !game.c.p.in[5]) {
    game.inc.x -= i.cost[2];
    game.i.count[2]++;
    updateinc();
    updatei0();
    updatei1();
    updatei2();
    updatei3();
  }
  if (n == 3 && game.inc.x >= i.cost[3] && !freeze && !game.c.p.in[5]) {
    game.inc.x -= i.cost[3];
    game.i.count[3]++;
    updateinc();
    updatei0();
    updatei1();
    updatei2();
    updatei3();
  }
}
function automate(a) {
  if (a == 'prestige' && !game.c.p.in[1] && !freeze) {
    game.a.prestige.enabled = !game.a.prestige.enabled;
    alayer(a, arate);
    updateauto();
  }
  else if (!game.c.p.in[1] && !freeze) {
    game.a.enabled[a] = !game.a.enabled[a];
    interval(a, arate);
    updateauto();
    updatecprogress();
  }
  if (game.a.enabled[0]) {s("incTopSec")}
}
function aautomate(a) {
  if (!game.c.p.in[1] && !freeze) {
    game.aa.enabled[a] = !game.aa.enabled[a];
    if (!game.a.enabled[a] && game.aa.enabled[a]) {automate(a)}
    updateauto();
  }
}
function scaling(s) {
  if (game.inc.x >= scost[s][game.s.count[s]] && (game.s.count[s] < 5 && scost[s][game.s.count[s]] != "Max")) {
    game.inc.x -= scost[s][game.s.count[s]];
    game.s.count[s]++;
    updateinc();
    updatei1();
    updatei2();
    updatei3();
    updates1();
    updates2();
    updates3();
  }
}

//1st Prestige layer `Prestige`
function refund() {
  game.u.refund[1] = !game.u.refund[1];
  updaterefund();
}
function confirmPrestige() {
  if (game.inc.prestige >= pp.req && !freeze) {
    if (game.confirm.prestige) {let confirmYes = confirm("你确定要声望吗？"); if (confirmYes) {prestige()}}
    else {prestige()}
  }
  else if (!freeze) {
    if (game.confirm.prestige) {
      let confirmNo = confirm("你需要 " + e(pp.req, 2) + " 递增来获得声望点数。 你确定要声望吗？");
      if (confirmNo) {prestige()}
    }
    else {prestige()}
  }
}
function prestige() {
  if (game.inc.prestige >= pp.req && !freeze) {
    game.pp.x += pp.gain;
    game.pp.ascension += pp.gain;
    game.pp.total += pp.gain;
    game.pp.lastPrestige = pp.gain;
    pp.end = Date.now();
    game.pp.time = Math.abs(pp.end - game.pp.start);
    game.pp.start = Date.now();
    game.pp.lastTen.shift();
    game.pp.lastTen.push(game.pp.lastPrestige / game.pp.time);
    pp.average = 0;
    for (let i = 0; i < 10; i++) {pp.average += game.pp.lastTen[i]}
    pp.average /= 10;
  }
  if (game.u.refund[1] && !freeze) {
    refunding();
    game.u.refund[0] = 0;
    game.u.refund[1] = false;
  }
  if (!freeze) {resetPrestige()}
  updatetoggle();
}
function upgrade(n) {
  if ((game.i.count[1] == 0 && game.i.count[2] == 0 && game.i.count[3] == 0) || game.b.pinc.bought[1]) {
    if (game.pp.x >= u.cost[n] && game.u.count[n] < u.max[n] && !game.c.p.in[2] && !freeze) {
      game.pp.x -= u.cost[n];
      game.u.refund[0] += u.cost[n];
      game.u.count[n]++;
      updatepinc();
      updatei1();
      updatei2();
      updatei3();
      updaterefund();
      updateu1();
      updateu2();
      updateu3();
      updatestatpinc();
    }
  }
  else {alert("购买递增后无法购买升级")}
}
function pincrement(p) {
  if (game.pp.x >= pi.cost[p] && !freeze) {
    game.pp.x -= pi.cost[p];
    game.pi.count[p]++;
    updatei0();
    updatei1();
    updatepinc();
    updateppgain();
    updatepigain();
    updatepi1();
    updatepi2();
    updatepi3();
    updatestatpinc();
  }
}
function confirmPChallenge(c) {
  if (game.c.p.count[c] < cmax[c] && !freeze) {
    if (game.confirm.challenge) {
      let confirmed = confirm("您确定要开始挑战吗？ 你将从声望开头开始");
      if (confirmed) {challengeP(c)}
    }
    else {challengeP(c)}
  }
}
function challengeP(c) {
  cexit();
  if (c == 1 && game.c.p.count[1] < 5 && !freeze) {
    game.a.prestige.enabled = false;
    game.c.p.in[1] = true;
    doc("apenabledInput").disabled = true;
  }
  if (c == 2 && game.c.p.count[2] < 4 && !freeze) {refunding(); game.c.p.in[2] = true}
  if (c == 3 && game.c.p.count[3] < 2 && !freeze) {game.c.p.in[3] = true}
  if (c == 4 && game.c.p.count[4] < 1 && !freeze) {game.c.p.in[4] = true}
  if (c == 5 && game.c.p.count[5] < 1 && !freeze) {game.c.p.in[5] = true}
  if (!freeze) {resetPrestige()}
}
function ccomplete() {
  for (let i = 1; i < 6; i++) {if (game.c.p.in[i] && game.inc.prestige >= pcgoal[i][game.c.p.count[i]]) {game.c.p.count[i]++}}
  cexit();
}
function confirmCexit() {
  if (game.confirm.challenge && freeze) {
    let confirmed = confirm("您确定要退出挑战吗？ 你不会因为完成它而获得奖励");
    if (confirmed) {cexit()}
  }
  else {cexit()}
}
function cexit() {
  for (let i = 1; i < 6; i++) {
    if (game.c.p.in[i]) {
      game.c.p.in[i] = false;
      pc4effect = 1;
      doc("apenabledInput").disabled = false;
      freeze = false;
      resetPrestige();
    }
  }
}

//2nd Prestige layer 'Ascension'
/*function respec(r) {
  if (r == 'boosts') {game.b.respec = true}
  display();
}*/
function confirmAscension() {
  if (game.pp.ascension >= ap.req && !freeze) {
    if (game.confirm.ascension) {let confirmYes = confirm("你确定要转生吗？"); if (confirmYes) {ascension()}}
    else {ascension()}
  }
  else if (!freeze) {
    if (game.confirm.ascension) {
      let confirmNo = confirm("你需要 " + e(ap.req, 2) + " 声望点数来获得转生点数。 你确定要转生吗？");
      if (confirmNo) {ascension()}
    }
    else {ascension()}
  }
}
function ascension() {
  if (game.pp.ascension >= ap.req && !freeze) {
    game.ap.x += ap.gain;
    game.ap.transcension += ap.gain;
    game.ap.total += ap.gain;
    game.ap.lastAscension = ap.gain;
    ap.end = Date.now();
    game.ap.time = Math.abs(ap.end - game.ap.start);
    game.ap.start = Date.now();
    game.ap.lastTen.shift(); game.ap.lastTen.push(game.ap.lastAscension / game.ap.time);
    ap.average = 0;
    for (let i = 0; i < 10; i++) {ap.average += game.ap.lastTen[i]}
    ap.average /= 10;
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
  if (!freeze) {resetAscension()}
  updatetoggle();
}
function boostInc(b) {
  if (b >= 1 && b <= 3 && game.ap.x >= 1 && !game.b.inc.bought[b] && !freeze) {
    game.ap.x--;
    game.b.inc.bought[b] = true;
    boostsInc(b, 1);
    updateainc();
    updatei0();
    updatei1();
    updatei2();
    updatei3();
    updateauto();
    updatebinc1();
    updatebinc2();
    updatebinc3();
    updatestatainc();
    unlockainc();
  }
  if (b == 'inc' && game.ap.x >= 10 && !game.b.inc.inc.effect && !freeze) {
    game.ap.x -= 10;
    game.b.inc.inc.bought = true;
    boostsInc(b, 1);
    updateainc();
    updatebincinc();
    updatestatainc();
  }
}
function boostPinc(b) {
  if (b == 1 && game.ap.x >= 5 && !game.b.pinc.bought[1] && !freeze) {
    game.ap.x -= 5;
    game.b.pinc.bought[1] = true;
    game.b.pinc.effect[1] = 0;
    updateainc();
    updatei0();
    updatei1();
    updatei2();
    updatei3();
    updateu1();
    updateu2();
    updateu3();
    updatebpinc1();
    updatestatainc();
  }
  if (b >= 2 && b <= 3 && game.ap.x >= 10 && !game.b.pinc.bought[b] && !freeze) {
    game.ap.x -= 10;
    game.b.pinc.bought[b] = true;
    boostsPinc(b, 1);
  }
}
function mastery(m) {
  if (m == 'inc1' && game.ap.x >= 5 && game.m.inc.bought == 0 && !freeze) {
    game.ap.x -= 5;
    game.m.inc.bought++;
    updateainc();
    updateminc1();
    updatestatainc();
    unlockinc();
  }
  if (m == 'inc2' && game.ap.x >= 10 && game.m.inc.bought == 1 && !freeze) {
    game.ap.x -= 10;
    game.m.inc.bought++;
    updateainc();
    updateminc2();
    updatestatainc();
    unlockinc();
  }
  if (m == 'inc3' && game.ap.x >= 25 && game.m.inc.bought == 2 && !freeze) {
    game.ap.x -= 25;
    game.m.inc.bought++;
    updateainc();
    updateminc3();
    updatestatainc();
    unlockinc();
  }
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
  if (!pressed.a && pressed.p && !pressed.r && !pressed.one && !pressed.two && pressed.shift) {confirmPrestige()}
  if (pressed.a && !pressed.p && !pressed.r && !pressed.one && !pressed.two && pressed.shift) {confirmAscension()}
  if (!pressed.a && !pressed.p && pressed.r && !pressed.one && !pressed.two && !pressed.shift) {refund()}
});
window.addEventListener("blur", function(event) {blurred = true; game.time = Date.now(); save()});
window.addEventListener("focus", function(event) {blurred = false; offline = 1; loadOffline(); offline = 4});
window.addEventListener("beforeunload", function(event) {game.time = Date.now(); save()});
function hotkey(h) {
  if (h == 1) {
    let unlockInc = [2500, 250000, 2.5e7, 2.5e9];
    let unlockPinc = [5, 31, 177, 1000];
    let unlocked = 0;
    let enabled = 0;
    for (let i = 0; i < 4; i++) {
      if (game.inc.prestige >= unlockInc[i] || game.pp.ascension >= unlockPinc[i]) {unlocked++}
      if (game.a.enabled[i]) {enabled++;}
    }
    if (enabled == 0 || enabled == unlocked) {for (let i = 0; i < unlocked; i++) {automate(i)}}
    else {
      for (let i = 0; i < unlocked; i++) {
        if ((game.inc.prestige >= unlockInc[i] || game.pp.ascension >= unlockPinc[i]) && !game.a.enabled[i]) {automate(i)}
      }
    }
  }
  if (h == 2) {
    let unlockPinc = [5, 31, 177, 1000];
    let unlocked = 0;
    let enabled = 0;
    for (let i = 0; i < 4; i++) {
      if (game.pp.ascension >= unlockPinc[i]) {unlocked++}
      if (game.aa.enabled[i]) {enabled++}
    }
    if (enabled == 0 || enabled == unlocked) {for (let i = 0; i < unlocked; i++) {aautomate(i)}}
    else {for (let i = 0; i < unlocked; i++) {if (game.pp.ascension >= unlockPinc[i] && !game.aa.enabled[i]) {aautomate(i)}}}
  }
}
function setapat() {if (doc("aprestigeat").value === "") {game.a.prestige.at = null} else {game.a.prestige.at = doc("aprestigeat").value}}
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
  alert("存档已复制到剪切板");
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
load();
start();
checkFreeze();
hide();
updates();
unlockinc();
unlockpinc();
unlockainc();
save();
h("loading");
s("game");
