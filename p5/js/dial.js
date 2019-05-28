var r,g,b;
var rotation;
var lineSize;
var rd, gd, bd;
var mode;
var outer_radius;
var outer_radius_dif;
var noise_scale, num_iter;

function setup() {

	createCanvas(windowWidth, windowHeight);
	r = Math.random() * 255;
	g = Math.random() * 255;
	b = Math.random() * 255;
	rd = (Math.random() - 0.5) / 2.0;
	gd = (Math.random() - 0.5) / 2.0;
	bd = (Math.random() - 0.5) / 2.0;
	rotation = 0;
  outer_radius = 1.0;
  outer_radius_dif = 0.0012;
  num_iter = 0;
  noise_scale = 0.1;
	mode = 0;

	if (width > height)
		lineSize = height/2.2;
	else
		lineSize = width/2.2;
	background(220);
  noStroke();
}

function draw() {

  push();
  translate(width/2, height/2);
  rotate(rotation);
  if (mode == 1){
    fill(255-r,255-g,255-b);
    var diff = lineSize*outer_radius - lineSize;
    rect(-lineSize*outer_radius, 0, diff, 5);
    rect(lineSize*outer_radius - diff, 0, diff, 5);
  }
  fill(r,g,b);
  rect(-lineSize,0, lineSize*2, 5);
  //if (mode == 2){
	//  fill(255-r,255-g,255-b);
	//  rect(0,-lineSize/4, 5, lineSize*2/4);
  //}
  pop();
  rotation += Math.PI/(360.0 * 5);
  //outer_radius = 1.0 + noise(num_iter/128) * noise_scale;
  outer_radius += outer_radius_dif;

  if (outer_radius >= 1.1 || outer_radius <= 1.0)
    outer_radius_dif *= -1;

  r += rd;
  g += gd;
  b += bd;

  if (r + rd >= 255 || r + rd <= 0)
  	rd *= -1;
  if (g + gd >= 255 || g + gd <= 0)
  	gd *= -1;
  if (b + bd >= 255 || b + bd <= 0)
  	bd *= -1;

  num_iter ++;

}

function keyPressed() {
  if (key ==' ') {
  	mode = (mode + 1) % 2;
    if (mode == 1)
      outer_radius = 1.0;
      outer_radius_dif = Math.abs(outer_radius_dif);
  }
}