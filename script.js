var game = {
  highestnumber: 0,
	sessionnumber: 0,
  number: 0,
  i1: 1,
  i2: 1,
  i3: 1,
  i4: 1,
  i3current: 1,
  i4current: 1,
  i2cost: 10,
  i3cost: 1000,
  i4cost: [1e6, 1e12, 1e24, 1e48, 1e96, 1e192, Infinity],
  i1count: 0,
  i2count: 0,
  i3count: 0,
  i4count: 0,
  pp: 0,
  ppcost: 1e9,
  prestigecount: 0,
  u1current: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  u2current: [0.00, 0.05, 0.10, 0.14, 0.18, 0.21, 0.24, 0.26, 0.28, 0.29, 0.30],
  u3current: [1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049],
  u1cost: [1, 2, 4, 8, "Max"],
  u2cost: [2, 5, 8, "Max"],
  u3cost: [5, 10, "Max"],
  u1count: 0,
  u2count: 0,
  u3count: 0,
}
var automation = {
  a1count: 0,
  a1condition: 0,
  a2count: 0,
  a2condition: 0,
  a3count: 0,
  a3condition: 0,
  a4count: 0,
  a4condition: 0,
}
var challenge = {
  in1: 0,
  com1: 0,
}
const a1interval = (delay) => {
  setTimeout(() => {
    i1();
    if (automation.a1condition == 1) {
      a1interval(delay);
    }
  }, delay);
}
const a2interval = (delay) => {
  setTimeout(() => {
    i2();
    if (automation.a2condition == 1) {
      a2interval(delay);
    }
  }, delay);
}
const a3interval = (delay) => {
  setTimeout(() => {
    i3();
    if (automation.a3condition == 1) {
      a3interval(delay);
    }
  }, delay);
}
const a4interval = (delay) => {
  setTimeout(() => {
    i4();
    if (automation.a4condition == 1) {
      a4interval(delay);
    }
  }, delay);
}
var i2quotient = [132, 142, 152, 162, 172, 182, 192, 202, 212, 222, 232];
var i3exponent = [1, 1.05, 1.1, 1.14, 1.18, 1.21, 1.24, 1.26, 1.28, 1.29, 1.30];
var i4multiplier = [1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049];

function reset() {
  function clear() {
    localStorage.clear();
  }
  clear();
  automation.a1count = 0;
  automation.a1condition = 0;
  automation.a2count = 0;
  automation.a2condition = 0;
  automation.a3count = 0;
  automation.a3condition = 0;
  automation.a4count = 0;
  automation.a4condition = 0;
  game.highestnumber = 0;
	game.sessionnumber = 0;
  game.number = 0;
  game.i1 = 1;
  game.i2 = 1;
  game.i3 = 1;
  game.i4 = 1;
  game.i3current = 1;
  game.i4current = 1;
  game.i2cost = 10;
  game.i3cost = 1000;
  game.i4cost = [1e6, 1e12, 1e24, 1e48, 1e96, 1e192, Infinity];
  game.i1count = 0;
  game.i2count = 0;
  game.i3count = 0;
  game.i4count = 0;
  game.pp = 0;
  game.ppcost = 1e9;
  game.prestigecount = 0;
  game.u1current = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  game.u2current = [0.00, 0.05, 0.10, 0.14, 0.18, 0.21, 0.24, 0.26, 0.28, 0.29, 0.30];
  game.u3current = [1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049];
  game.u1cost = [1, 2, 4, 8, "Max"];
  game.u2cost = [2, 5, 8, "Max"];
  game.u3cost = [5, 10, "Max"];
  game.u1count = 0;
  game.u2count = 0;
  game.u3count = 0;
  challenge.in1 = 0;
  challenge.com1 = 0;
  hide();
  window.location.reload(true);
  
}
load();
function load() {
  let loadgame = JSON.parse(localStorage.getItem("saveFile"));
  if (loadgame != null) {
    loadGame(loadgame);
  }
  let loadAutomation = JSON.parse(localStorage.getItem("automation"));
  if (loadAutomation != null) {
    loadGameAutomation(loadAutomation);
  }
}
function loadGame(loadgame) {
  if (typeof loadgame.highestnumber != "undefined") game.highestnumber = loadgame.highestnumber;
	if (typeof loadgame.sessionnumber != "undefined") game.sessionnumber = loadgame.sessionnumber;
  if (typeof loadgame.number != "undefined") game.number = loadgame.number;
  if (typeof loadgame.i1 != "undefined") game.i1 = loadgame.i1;
  if (typeof loadgame.i2 != "undefined") game.i2 = loadgame.i2;
  if (typeof loadgame.i3 != "undefined") game.i3 = loadgame.i3;
  if (typeof loadgame.i4 != "undefined") game.i4 = loadgame.i4;
  if (typeof loadgame.i3current != "undefined") game.i3current = loadgame.i3current;
  if (typeof loadgame.i4current != "undefined") game.i4current = loadgame.i4current;
  if (typeof loadgame.i2cost != "undefined") game.i2cost = loadgame.i2cost;
  if (typeof loadgame.i3cost != "undefined") game.i3cost = loadgame.i3cost;
  if (typeof loadgame.i4cost != "undefined") game.i4cost = loadgame.i4cost;
  if (typeof loadgame.i1count != "undefined") game.i1count = loadgame.i1count;
  if (typeof loadgame.i2count != "undefined") game.i2count = loadgame.i2count;
  if (typeof loadgame.i3count != "undefined") game.i3count = loadgame.i3count;
  if (typeof loadgame.i4count != "undefined") game.i4count = loadgame.i4count;
  if (typeof loadgame.pp != "undefined") game.pp = loadgame.pp;
  if (typeof loadgame.ppcost != "undefined") game.ppcost = loadgame.ppcost;
  if (typeof loadgame.prestigecount != "undefined") game.prestigecount = loadgame.prestigecount;
  if (typeof loadgame.u1current != "undefined") game.u1current = loadgame.u1current;
  if (typeof loadgame.u2current != "undefined") game.u2current = loadgame.u2current;
  if (typeof loadgame.u3current != "undefined") game.u3current = loadgame.u3current;
  if (typeof loadgame.u1cost != "undefined") game.u1cost = loadgame.u1cost;
  if (typeof loadgame.u2cost != "undefined") game.u2cost = loadgame.u2cost;
  if (typeof loadgame.u3cost != "undefined") game.u3cost = loadgame.u3cost;
  if (typeof loadgame.u1count != "undefined") game.u1count = loadgame.u1count;
  if (typeof loadgame.u2count != "undefined") game.u2count = loadgame.u2count;
  if (typeof loadgame.u3count != "undefined") game.u3count = loadgame.u3count;
}
function loadGameAutomation(loadAutomation) {
  if (typeof loadAutomation.a1count != "undefined") automation.a1count = loadAutomation.a1count;
  if (typeof loadAutomation.a1condition != "undefined") automation.a1condition = loadAutomation.a1condition;
  if (typeof loadAutomation.a2count != "undefined") automation.a2count = loadAutomation.a2count;
  if (typeof loadAutomation.a2condition != "undefined") automation.a2condition = loadAutomation.a2condition;
  if (typeof loadAutomation.a3count != "undefined") automation.a3count = loadAutomation.a3count;
  if (typeof loadAutomation.a3condition != "undefined") automation.a3condition = loadAutomation.a3condition;
  if (typeof loadAutomation.a4count != "undefined") automation.a4count = loadAutomation.a4count;
  if (typeof loadAutomation.a4condition != "undefined") automation.a4condition = loadAutomation.a4condition;
}
loadAutomate();
function loadAutomate() {
  if (automation.a1condition == 1) {
    a1interval(40)
    document.getElementById("enableda1").innerHTML = "True.";
  } else {document.getElementById("enableda1").innerHTML = "False."}
  if (automation.a2condition == 1) {
    a2interval(100)
    document.getElementById("enableda2").innerHTML = "True.";
  } else {document.getElementById("enableda2").innerHTML = "False."}
  if (automation.a3condition == 1) {
    a3interval(200)
    document.getElementById("enableda3").innerHTML = "True.";
  } else {document.getElementById("enableda3").innerHTML = "False."}
  if (automation.a4condition == 1) {
    a4interval(1000)
    document.getElementById("enableda4").innerHTML = "True.";
  } else {document.getElementById("enableda4").innerHTML = "False."}
}
function save() {
  localStorage.setItem("saveFile", JSON.stringify(game));
  localStorage.setItem("automation", JSON.stringify(automation));
}
var autoSave = setInterval(function() {
  save();
}, 1000);

function i1() {
	if (challenge.in1 == 0) {
 	  game.number += game.i1;
  	game.i1count++;
	}
}
function i2() {
  if (game.number >= game.i2cost) {
    game.number -= game.i2cost;
    game.i2count++;
  }
}
function i3() {
  if (game.number >= game.i3cost) {
    game.number -= game.i3cost;
    game.i3current = ((game.i3count + 1) * game.i3) + 1;
    game.i3count++;
  }
}
function i4() {
  if (game.number >= game.i4cost[game.i4count]) {
    game.number -= game.i4cost[game.i4count];
    game.i4current += (1 + (game.u3count / 10));
    game.i4count++;
  }
}

var automationenabled = ["False.", "True."];
function a1() {
	if (challenge.in1 == 0) {
		automation.a1count++;
		automation.a1condition = automation.a1count %2;
		a1interval(30);
    document.getElementById("enableda1").innerHTML = automationenabled[automation.a1condition];
	}
}
function a2() {
	if (challenge.in1 == 0) {
    automation.a2count++;
    automation.a2condition = automation.a2count % 2;
    a2interval(100);
    document.getElementById("enableda2").innerHTML = automationenabled[automation.a2condition];
	}
}
function a3() {
	if (challenge.in1 == 0) {
		automation.a3count++;
		automation.a3condtion = automation.a3count % 2;
		a3interval(200);
    document.getElementById("enableda3").innerHTML = automationenabled[automation.a3condition];
	}
}
function a4() {
	if (challenge.in1 == 0) {
	  automation.a4count++;
    automation.a4condition = automation.a3count % 2;
    a4interval(1000);
    document.getElementById("enableda4").innerHTML = automationenabled[automation.a4condition];
	}
}

function prePrestigeReset() {
  game.sessionnumber = 0;
  game.number = 0;
  game.i1 = 1;
  game.i2 = 1;
  game.i3 = 1;
  game.i4 = 1;
  game.i3current = 1;
  game.i4current = (1 + (game.u3count / 10));
  game.i2cost = 10;
  game.i3cost = 1000;
  game.i4cost = [1e6, 1e12, 1e24, 1e48, 1e96, 1e192, Infinity];
  game.i1count = 0;
  game.i2count = 0;
  game.i3count = 0;
  game.i4count = 0;
}
function prestige() {
  if (game.sessionnumber >= 1e9) {
    automation.a1count = 0;
    automation.a1condition = 0;
    automation.a2count = 0;
    automation.a2condition = 0;
    automation.a3count = 0;
    automation.a3condition = 0;
    automation.a4count = 0;
    automation.a4condition = 0;
    prePrestigeReset();
    document.getElementById("increment2").style.display = "none";
    document.getElementById("texti2").style.display = "none";
    document.getElementById("increment3").style.display = "none";
    document.getElementById("texti3").style.display = "none";
    document.getElementById("increment4").style.display = "none";
    document.getElementById("texti4").style.display = "none";
    document.getElementById("autoi1").style.display = "none"
    document.getElementById("texta1").style.display = "none"
    document.getElementById("autoi2").style.display = "none"
    document.getElementById("texta2").style.display = "none"
    document.getElementById("autoi3").style.display = "none"
    document.getElementById("texta3").style.display = "none"
    document.getElementById("autoi4").style.display = "none"
    document.getElementById("texta4").style.display = "none"
    game.pp++;
    game.prestigecount++;
  }
}
const refundp = (delay) => {
  setTimeout(() => {
		if (game.u1count > 0) {
		  game.u1count--;
		  game.pp += game.u1cost[game.u1count];
		}
		if (game.u2count > 0) {
		  game.u2count--;
		  game.pp += game.u2cost[game.u2count];
		}
		if (game.u3count > 0) {
		  game.u3count--;
  		game.pp += game.u3cost[game.u3count];
	  }
		if (game.u1count > 0 || game.u2count > 0 || game.u3count > 0) {
			refundp(delay);
		}
	}, delay);
  prePrestigeReset();
  automation.a1count = 0;
  automation.a1condition = 0;
  automation.a2count = 0;
  automation.a2condition = 0;
  automation.a3count = 0;
  automation.a3condition = 0;
  automation.a4count = 0;
  automation.a4condition = 0;
}
function upgrade1() {
  if (game.pp >= game.u1cost[game.u1count] && game.u1count < 10 && game.i2count == 0) {
    game.pp -= game.u1cost[game.u1count];
    game.u1count++;
  }
}
function upgrade2() {
  if (game.pp >= game.u2cost[game.u2count] && game.u2count < 10 && game.i3count == 0) {
    game.pp -= game.u2cost[game.u2count];
    game.u2count++;
  }
}
function upgrade3() {
  if (game.pp >= game.u3cost[game.u3count] && game.u3count < 19 && game.i4count == 0) {
    game.pp -= game.u3cost[game.u3count];
    game.u3count++;
    game.i4current = 1 + (game.u3count / 10);
  }
}

const challenge1a1interval = (delay) => {
  setTimeout(() => {
    challenge1a1();
    if (challenge.in1 == 1) {
      challenge1a1interval(delay);
    }
  }, delay);
}
function challenge1a1() {
 	game.number += game.i1;
  game.i1count++;
}
function challengep1() {
	if (challenge.in1 == 0) {
  	game.sessionnumber = 0;
  	game.number = 0;
  	game.i1 = 1;
 	  game.i2 = 1;
 	  game.i3 = 1;
 	  game.i4 = 1;
 	  game.i3current = 1;
 	  game.i4current = 1;
		game.i2cost = 10;
 	  game.i3cost = 1000;
  	game.i4cost = [1e6, 1e15, 1e30, Infinity];
  	game.i1count = 0;
    game.i2count = 0;
    game.i3count = 0;
 	  game.i4count = 0;
    automation.a1count = 0;
    automation.a1condition = 0;
    automation.a2count = 0;
    automation.a2condition = 0;
    automation.a3count = 0;
    automation.a3condition = 0;
    automation.a4count = 0;
    automation.a4condition = 0;
	  challenge.in1 = 1;
	  challenge1a1interval(250);
	  document.getElementById("enableda1").innerHTML = automationenabled[game.inchallenge1];
	}
}
function exitchallenge() {
	game.sessionnumber = 0;
 	game.number = 0;
 	game.i1 = 1;
	game.i2 = 1;
	game.i3 = 1;
	game.i4 = 1;
	game.i3current = 1;
	game.i4current = 1;
	game.i2cost = 10;
	game.i3cost = 1000;
 	game.i4cost = [1e6, 1e15, 1e30, Infinity];
 	game.i1count = 0;
  game.i2count = 0;
  game.i3count = 0;
 	game.i4count = 0;
  automation.a1count = 0;
  automation.a1condition = 0;
  automation.a2count = 0;
  automation.a2condition = 0;
  automation.a3count = 0;
  automation.a3condition = 0;
  automation.a4count = 0;
  automation.a4condition = 0;
	challenge.in1 = 0;
	document.getElementById("enableda1").innerHTML = automationenabled[challenge.in1];
}
function completechallengep() {
  if (challenge.in1 == 1 && game.sessionnumber >= 1e6) {
    challenge.in1 = 0;
    prePrestigeReset();
    challenge.com1++;
  }
}

//Save highest number
setInterval(function() {
  if (game.number > game.highestnumber) {
    game.highestnumber = game.number;
  }
}, 10);
//Save session number
setInterval(function() {
	if (game.number > game.sessionnumber) {
		game.sessionnumber = game.number;
	}
}, 10);
//Cost formula
setInterval(function() {
  game.i2cost = (10 * (2 ** Math.log10(8 ** game.i2count))) / (1.1 ** game.i2count);
  game.i3cost = (1000 * (10 ** game.i3count)) ** i3exponent[game.u2count];
  if (game.u3count == 0) {game.i4cost = [1e6, 1e12, 1e24, 1e48, 1e96, 1e192, Infinity]}  
  if (game.u3count == 1) {game.i4cost = [3e6, 9e12, 2.7e25, 8.1e49, 2.43e98, 7.29e194, Infinity]}
  if (game.u3count == 2) {game.i4cost = [9e6, 2.7e13, 8.1e25, 2.43e50, 7.29e99, 2.19e195, Infinity]}
  if (game.u3count == 3) {game.i4cost = [2.7e7, 8.1e13, 2.43e25, 7.29e50, 2.19e100, 6.56e195, Infinity]}
  if (game.u3count == 4) {game.i4cost = [8.1e7, 2.43e14, 7.29e25, 2.19e51, 6.56e100, 1.97e196, Infinity]}
  if (game.u3count == 5) {game.i4cost = [2.43e8, 7.29e14, 2.19e26, 6.56e51, 1.97e101, 5.9e196, Infinity]}
  if (game.u3count == 6) {game.i4cost = [7.29e8, 2.19e15, 6.56e26, 1.97e52, 5.9e101, 1.77e197, Infinity]}
  if (game.u3count == 7) {game.i4cost = [2.19e9, 6.56e15, 1.97e27, 5.9e52, 1.77e102, 5.31e197, Infinity]}
  if (game.u3count == 8) {game.i4cost = [6.56e9, 1.97e16, 5.9e27, 1.77e53, 5.31e102, 1.59e198, Infinity]}
  if (game.u3count == 9) {game.i4cost = [1.97e10, 5.9e16, 1.77e28, 5.31e53, 1.59e103, 4.78e198, Infinity]}
  if (game.u3count == 10) {game.i4cost = [5.9e10, 1.77e17, 5.31e28, 1.59e54, 4.78e103, 1.43e199, Infinity]}
}, 10);
//Increment formula
setInterval(function() {
  /*Variable*/game.i1 = (((game.i2count + 1) * (game.i3current) * (game.u1count + 1)) ** game.i4current);
  /*Display*/game.i2 = (((game.i2count + 2) * (game.i3current) * (game.u1count + 1)) ** game.i4current) - (((game.i2count + 1) * (game.i3current) * (game.u1count + 1)) ** game.i4current);
  /*Variable*/game.i3 = game.u2count + 1;
  /*variable*/game.i4 = (1 + (game.u3count / 10))
}, 10);
//Display refresh
setInterval(function() {
  document.getElementById("textnumber").innerHTML = e(game.number);
  document.getElementById("vari1").innerHTML = e(game.i1);
  document.getElementById("vari2").innerHTML = e(game.i2);
  document.getElementById("vari3").innerHTML = game.i3;
  document.getElementById("vari4").innerHTML = game.i4;
  document.getElementById("currenti3").innerHTML = game.i3current;
  document.getElementById("currenti4").innerHTML = e(game.i4current);
  document.getElementById("costi2").innerHTML = e(game.i2cost);
  document.getElementById("costi3").innerHTML = e(game.i3cost);
  document.getElementById("costi4").innerHTML = e(game.i4cost[game.i4count]);
  document.getElementById("textPrestigePoints").innerHTML = game.pp;
  document.getElementById("costPrestige").innerHTML = e(game.ppcost);
  document.getElementById("currentu1").innerHTML = game.u1current[game.u1count];
  document.getElementById("currentu2").innerHTML = game.u2current[game.u2count];
  document.getElementById("currentu3").innerHTML = game.u3current[game.u3count];
  document.getElementById("costu1").innerHTML = game.u1cost[game.u1count];
  document.getElementById("costu2").innerHTML = game.u2cost[game.u2count];
  document.getElementById("costu3").innerHTML = game.u3cost[game.u3count];
  document.getElementById("countu1").innerHTML = game.u1count;
  document.getElementById("countu2").innerHTML = game.u2count;
  document.getElementById("countu3").innerHTML = game.u3count;
}, 10);
//Display tabs
setInterval(function() {
  if (game.highestnumber >= 100000 || game.prestigecount > 0) {
    document.getElementById("automation").style.display = "inline";
  }
  if (game.highestnumber >= 1e9 || game.prestigecount > 0) {
    document.getElementById("prestigetab").style.display = "inline";
	}
  if (game.prestigecount >= 5) {
		document.getElementById("challenges").style.display = "inline"
	}
	if (game.highestnumber >= 5e11) {
    document.getElementById("scaling").style.display = "inline";
  }
}, 10);
//Display increment
setInterval(function() {
  if (game.sessionnumber >= 1) {
    document.getElementById("increment2").style.display = "inline-block";
    document.getElementById("texti2").style.display = "inline-block";
  }
  if (game.sessionnumber >= 100) {
    document.getElementById("increment3").style.display = "inline-block";
    document.getElementById("texti3").style.display = "inline-block";
  }
  if (game.sessionnumber >= 1e5) {
    document.getElementById("increment4").style.display = "inline-block";
    document.getElementById("texti4").style.display = "inline-block";
  }
}, 10);
//Display automation 
setInterval(function() {
  if (game.sessionnumber >= 100000) {
    document.getElementById("autoi1").style.display = "inline-block"
    document.getElementById("texta1").style.display = "inline-block"
  }
  if (game.sessionnumber >= 1e8) {
    document.getElementById("autoi2").style.display = "inline-block"
    document.getElementById("texta2").style.display = "inline-block"
  }
  if (game.sessionnumber >= 1e45) {
    document.getElementById("autoi3").style.display = "inline-block"
    document.getElementById("texta3").style.display = "inline-block"
  }
  if (game.sessionnumber >= 1e100) {
    document.getElementById("autoi4").style.display = "inline-block"
    document.getElementById("texta4").style.display = "inline-block"
  }
}, 10);
//Display upgrades
setInterval(function() {
  if (game.prestigecount >= 1) {
    document.getElementById("upgrade1").style.display = "inline-block"
    document.getElementById("textu1").style.display = "inline-block"
		document.getElementById("refundp").style.display = "inline-block"
  }
  if (game.prestigecount >= 2) {
    document.getElementById("upgrade2").style.display = "inline-block"
    document.getElementById("textu2").style.display = "inline-block"
  }
  if (game.prestigecount >= 5) {
    document.getElementById("upgrade3").style.display = "inline-block";
    document.getElementById("textu3").style.display = "inline-block";
  }
}, 10);
//Display challenges
setInterval(function() {
	if (game.prestigecount >= 5) {
		document.getElementById("challengep1").style.display = "inline";
	}
}, 10);
//Unlock tabs
setInterval(function() {
	if (game.highestnumber >= 5e11) {
		document.getElementById("unlocktab").innerHTML = "TBD";
	}
  else if (game.highestnumber >= 1e9) {
    document.getElementById("unlocktab").innerHTML = e(5e11);
  }
  else if (game.highestnumber >= 100000) {
    document.getElementById("unlocktab").innerHTML = e(1e9);
  }
  else {
    document.getElementById("unlocktab").innetHTML = 100000;
  }
}, 10);
//Unlock increment
setInterval(function() {
  if (game.sessionnumber >= 100000) {
    document.getElementById("unlockincrement").innerHTML = e(1e59);
  }
  else if (game.sessionnumber >= 100) {
    document.getElementById("unlockincrement").innerHTML = 100000;
  }
  else if (game.sessionnumber >= 1) {
    document.getElementById("unlockincrement").innerHTML = 100;
  }
  else {
    document.getElementById("unlockincrement").innerHTML = 1;
  }
}, 10);
//Unlock automation
setInterval(function() {
	if (game.sessionnumber >= 1e8) {
    document.getElementById("unlockautomation").innerHTML = e(1e45);
  }
  else if (game.sessionnumber >= 100000) {
    document.getElementById("unlockautomation").innerHTML = e(1e8);
  }
  else {
    document.getElementById("unlockautomation").innerHTML = 100000;
  }
}, 10);
//Unlock upgrade
setInterval(function() {
  if (game.prestigecount >= 5) {
    document.getElementById("unlockupgrade").innerHTML = "100 PP";
  }
  else if (game.prestigecount >= 2) {
    document.getElementById("unlockupgrade").innerHTML = "5 PP";
  }
  else if (game.prestigecount >= 1) {
    document.getElementById("unlockupgrade").innerHTML = "2 PP";
  }
  else {
    document.getElementById("unlockupgrade").innerHTML = "1 PP";
  }
}, 10);
//Unlock challenge
setInterval(function() {
	if (game.prestigecount >= 5) {
		document.getElementById("unlockchallenge").innerHTML = "TBD";
	}
	else {
		document.getElementById("unlockchallenge").innerHTML = "5 PP";
	}
}, 10);
//Unlock challenges
setInterval(function() {
	if (game.prestigecount >= 5) {
		document.getElementById("unlockchallenges").style.display = "none";
	}
}, 10);
//Complete challenge
setInterval(function() {
  if (challenge.in1 == 1 && game.sessionnumber >= 1e6) {
      document.getElementById("completechallengep").style.display = "inline";
  }
}, 10);

function e(num) {
  if (num >= 1e6) {
    return Number.parseFloat(num).toExponential(2);
  }
  else {
    return num.toFixed(1);
  }
}

hide();
function hide() {
  document.getElementById("backcl").style.display = "none";
  document.getElementById("textcl").style.display = "none";
  document.getElementById("increment2").style.display = "none";
  document.getElementById("texti2").style.display = "none";
  document.getElementById("increment3").style.display = "none";
  document.getElementById("texti3").style.display = "none";
  document.getElementById("increment4").style.display = "none";
  document.getElementById("texti4").style.display = "none";
  document.getElementById("automation").style.display = "none";
  document.getElementById("autoi1").style.display = "none";
  document.getElementById("texta1").style.display = "none";
  document.getElementById("autoi2").style.display = "none";
  document.getElementById("texta2").style.display = "none";
  document.getElementById("autoi3").style.display = "none";
  document.getElementById("texta3").style.display = "none";
  document.getElementById("autoi4").style.display = "none";
  document.getElementById("texta4").style.display = "none";
  document.getElementById("prestigetab").style.display = "none";
	document.getElementById("refundp").style.display = "none";
  document.getElementById("upgrade1").style.display = "none";
  document.getElementById("textu1").style.display = "none";
  document.getElementById("upgrade2").style.display = "none";
  document.getElementById("textu2").style.display = "none";
  document.getElementById("upgrade3").style.display = "none";
  document.getElementById("textu3").style.display = "none";
	document.getElementById("challenges").style.display = "none";
  document.getElementById("completechallengep").style.display = "none";
  document.getElementById("scaling").style.display = "none";
}
tab(1);
function tab(t) {
  document.getElementById("tab1").style.display = "none";
  document.getElementById("tab2").style.display = "none";
  document.getElementById("tab3").style.display = "none";
  document.getElementById("tab4").style.display = "none";
  document.getElementById("tab5").style.display = "none";
  document.getElementById("tab6").style.display = "none";
  document.getElementById("tab" + t).style.display = "inline";
  if (t == 3) {
  	document.getElementById("tab5").style.display = "inline"
  }
  if (t == 5 || t == 6) {
  	document.getElementById("tab3").style.display = "inline"
  }
}
function changelog() {
  document.getElementById("number").style.display = "none";
  document.getElementById("tabs").style.display = "none";
  document.getElementById("tab1").style.display = "none";
  document.getElementById("tab2").style.display = "none";
  document.getElementById("tab3").style.display = "none";
  document.getElementById("tab4").style.display = "none";
  document.getElementById("changelog").style.display = "none";
  document.getElementById("backcl").style.display = "inline";
  document.getElementById("textcl").style.display = "inline";
}
