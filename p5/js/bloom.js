var ratio;
var start_offset, start_offset_dif;
var xdif, ydif;
var ratio_dif;
var size, size_dif;
var co, co_dif;
var r,g,b;
var rd, gd, bd;
var boundingVal;

var targetR, targetS, targetCo;
var targetRDif, targetSDif, targetCoDif;
let rMatched = true, sMatched= true, coMatched = true;

function setup() {

	createCanvas(windowWidth, windowHeight);

  xdif = windowWidth / 2;
  ydif = windowHeight / 2;
  boundingVal = Math.min(xdif, ydif);
  size = (Math.random() * (boundingVal - 50)) + 50;
  size_dif = (Math.random() - 0.5) / 2.0;
  ratio = (Math.random() * 0.1 + 0.01);
  ratio_dif = (Math.random() - 0.5) / 100000.0;
  co = (Math.random() * 3) + 0.1;
  co_dif = (Math.random() - 0.5) / 10000.0;
  start_offset = Math.random() * 360;
  start_offset_dif = (Math.random() / 5.0 + 0.2) / 20.0;
  r = Math.random() * 255;
  g = Math.random() * 255;
  b = Math.random() * 255;
  rd = (Math.random() - 0.5)/1.5;
  gd = (Math.random() - 0.5)/1.5;
  bd = (Math.random() - 0.5)/1.5;

  targetR = ratio_dif;
  targetS = size_dif;
  targetCo = co_dif;

  background(220);
  noStroke();
}

function updateColors(){

  if (Math.random() < 0.0004)
    rd = (Math.random() - 0.5)/1.5;
  if (Math.random() < 0.0004)
    gd = (Math.random() - 0.5)/1.5;
  if (Math.random() < 0.0004)
    bd = (Math.random() - 0.5)/1.5;

  r += rd;
  g += gd;
  b += bd;

  if (r + rd >= 255 || r + rd <= 0)
    rd *= -1;
  if (g + gd >= 255 || g + gd <= 0)
    gd *= -1;
  if (b + bd >= 255 || b + bd <= 0)
    bd *= -1;
}

function updateRatio(){
  if (rMatched && Math.random() < 0.0005){
    targetR = (Math.random() - 0.5) / 100000.0; 
    if (ratio > 0.1)
      targetR = -1 * Math.abs(targetR);
    targetRDif = (targetR - ratio_dif) / (Math.random() * 4000 + 500);
    rMatched = false;
  }
  if (!rMatched){
    if(Math.abs(ratio_dif - targetR) > Math.abs(targetRDif)*2){
      ratio_dif += targetRDif;
    }
    else{
      rMatched = true;
      console.log("RATIO: " + ratio + "  RATIO_DIF: " + ratio_dif);
    }
  }

  if (ratio + ratio_dif >= 0.2){
    ratio_dif *= -1;
    targetR = -1 * Math.abs(targetR);
    targetRDif = (targetR - ratio_dif) / 1000.0;
  }
  if(ratio + ratio_dif <= 0.01){
    ratio_dif *= -1;
    targetR = Math.abs(targetR);
    targetRDif = (targetR - ratio_dif) / 1000.0;
  }
  ratio += ratio_dif;
  if (ratio >= 0.1 && ratio_dif <= 0)
    ratio += ratio_dif *(ratio*10)* (ratio*10);
}

function updateCo(){
  if (coMatched && Math.random() < 0.0006){
    targetCo = (Math.random() - 0.5) / 10000.0;
    if (targetCo < 0){
      targetCo *= 4;
    }
    targetCoDif = (targetCo - co_dif) / (Math.random() * 4000 + 500);
    coMatched = false;
  }
  if(!coMatched){
   if(Math.abs(co_dif - targetCo) > Math.abs(targetCoDif)*2){
    co_dif += targetCoDif;
  }
    else{
      coMatched= true;
      console.log("CO: " + co + "  CO_DIF: " + co_dif);
    }
  }
  if (co + co_dif >= 6){
    co_dif *= -1;
    targetCo = -1 * Math.abs(targetCo);
    targetCoDif = (targetCo - co_dif) / 1000.0;
  } 
  if(co + co_dif < 0.001){
    co_dif *= -1;
    targetCo = Math.abs(targetCo);
    targetCoDif = (targetCo - co_dif) / 1000.0;
  }
  co += co_dif;
}

function updateSize(){
  if (sMatched && Math.random() < 0.0004){
    targetS = (Math.random() - 0.5) / 2.0;
    targetSDif = (targetS - size_dif) /  (Math.random() * 4000 + 500);
    sMatched = false;
  }
  if (!sMatched){
   if(Math.abs(size_dif - targetS) > Math.abs(targetSDif)*2){
    size_dif += targetSDif;
  }
  else{
    console.log("SIZE: " + size + "  SIZE_DIF: " + size_dif);
    sMatched = true;
  }
}
//console.log("Set: " + sMatched + " \nSize: " + size + " \nsize_dif:  " + size_dif + " \ntarget_dif: " + targetS + " \ntarget_dif_acc: " + targetSDif);
if (size + size_dif >= boundingVal){
  size_dif *= -1;
  targetS = -1 * Math.abs(targetS);
  targetSDif = (targetS - size_dif) / 1000.0;
}
else if(size + size_dif < 50){
  size_dif *= -1;
  targetS = Math.abs(targetS);
  targetSDif = (targetS - size_dif) / 1000.0;
}
size += size_dif;
}

function udpateOffset(){
  if (Math.random() < 0.0002){
    start_offset_dif = (Math.random() / 5.0 + 0.2) / 20.0;
    console.log("START OFFSET DIF: " + start_offset_dif);
  }
  start_offset + start_offset_dif;
}

function updateAll(){
  updateRatio();
  updateColors();
  updateCo();
  updateSize();
  udpateOffset();
}

function draw() {
  var radius, x, y;
  let theta = start_offset;
  let theta_incr = 360 / (360 * ratio);

  fill (r,g,b);
  stroke(r,g,b);

  var prev_point = 0;
  for (var i = 0; i < int(360 * ratio); i++){
    radius = size*Math.cos(co*theta);
    x = radius * Math.cos(theta) + xdif;
    y = radius * Math.sin(theta) + ydif;
    if (prev_point != 0){
      line (prev_point[0], prev_point[1], x, y);
      //point (x, y);
    }
    prev_point = [x, y];
    theta += theta_incr;
  }
  updateAll();

  if (keyIsPressed == true) {
    console.log("Ratio: " + ratio + "  ratio_dif: " + ratio_dif + "\n" + 
      "Coef: " + co + "  Coef_dif:" + co_dif + "\n" + 
      "Size: " + size + "  size_dif: " + size_dif);
  }
}