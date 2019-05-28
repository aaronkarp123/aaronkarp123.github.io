var r,g,b;
var rd, gd, bd;
var mode;
var noise_scale, num_iter;
var cur_x;
var depth;
var wash;
var unwash;

var washr,washg,washb, washbd, wdepth;
var num_wash;

var data, cur_height;

var resets;


function populateMountain(){
  var dataPoints = []
  for (var i = 0; i < width; i++){
    dataPoints.push(noise((i+resets)/(128 / depth))* -noise_scale*(depth*1.5));
  }
  return dataPoints;
}


function reset(){
  r = Math.random() * 255;
  g = Math.random() * 255;
  b = Math.random() * 255;
  rd = (Math.random() + 0.2 - 0.6)*60;
  gd = (Math.random() + 0.2 - 0.6)*60;
  bd = (Math.random() + 0.2 - 0.6)*60;
  washr = Math.random() * 80;
  washg = Math.random() * 80;
  washb = Math.random() * 50 + 200;
  washbd = (Math.random() - 0.5)*1.0;
  num_wash = 0.0;
  wdepth = -0.4;
  depth = 1.0;
  cur_x = 0;
  cur_height = 0;
}

function setup() {

	createCanvas(windowWidth, windowHeight);
  reset();
  wash = false;
  unwash = false;
  num_iter = 0;
  noise_scale = height;
	mode = 0;
  resets=0;

	background(220);
  noStroke();
}

function washout(){
  if (unwash){
    fill(220)
    for(var i=0; i<width; i++){
      rect(i, 0 , 3, noise(i/500+(num_wash*width)) * noise_scale/6.0 * (1-wdepth+0.2) + wdepth*height);
    }
  }
  else{
    fill(washr,washg,washb);
    for(var i=0; i<width; i++){
      rect(i, height , 3, noise(i/500+(num_wash*width)) * -noise_scale/6.0 * (wdepth+0.2) - wdepth*height);
    }
  }
  wdepth += 0.002;
  if (!unwash){
    if (washb + washbd >= 255 || washb + washbd <= 150)
      washbd *= -1;
    washb += washbd;
  }
  num_wash ++;

  if (wdepth >= 1.05){
    if (unwash){
      unwash = false;
      wash = false;
      reset();
      return;
    }
    unwash = true;
    wdepth = -0.15  ;
  }
}

function draw() {
  if (wash){
    washout();
  }
  else{
    if (cur_x == 0)
      data = populateMountain();
    fill(r, g, b);
    push();

    //rect(cur_x, height , 3, noise(num_iter/(128 / depth)) * -noise_scale*(depth*1.5));

    for (var i = 0; i < width; i++){
      var minV = Math.max(cur_height, data[i]);
      rect(i, height+15, 3, minV+(noise(10000+i+num_iter*width / 100000) - 0.5)*55/(depth+0.7));
    }

    pop();
  }
  num_iter ++;

  cur_x += 1;
  cur_height -= 0.9;

  //if (cur_x > width && !wash){
  if (cur_height <  Math.min.apply(Math, data) && !wash){

    depth -= (Math.random()/5.0);
    cur_height = 0.0;

    if (depth <= 0){
      wash = true;
    }

    cur_x = 0;

    resets+= width;


    data = populateMountain();

    if (r + rd >= 255 || r + rd <= 0)
      rd *= -1;
    if (g + gd >= 255 || g + gd <= 0)
      gd *= -1;
    if (b + bd >= 255 || b + bd <= 0)
      bd *= -1;
    r += rd;
    g += gd;
    b += bd;
  }

}

function keyPressed() {
  if (key ==' ') {
  	mode = (mode + 1) % 2;
    if (mode == 1)
      outer_radius = 1.0;
      outer_radius_dif = Math.abs(outer_radius_dif);
  }
}