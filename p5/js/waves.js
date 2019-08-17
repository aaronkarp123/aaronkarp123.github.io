let frame_count = 0;
let resolution = 0.002;
let v_resolution = 0.5;
let seeds = [];
let back_c = [0,0,0];
let back_c_v = [Math.random(-0.0001, 0.0001)/20,Math.random(-0.0001, 0.0001)/20,Math.random(-0.0001, 0.0001)/20];

let height = 0.1;
let prev_height = 0.1;
let height_vel = 0;
let height_acc = 0;
let height_list = [0.1, 1, 3, 5, 10, 25, 50, 100, 500, 1000, 500000];
let height_goal = height;
let cur_duration = 60;
let traveling = false;
let halfway_hit = true;

let max_tdur = 30;
let min_tdur = 5;
let max_wdur = 12;
let min_wdur = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = -6; i <= windowHeight * v_resolution + 3; i++){
    seeds.push(random(100000));
  }
  frameRate(60);
}

function draw_line(seed, col, y_off){
  let ratio = windowWidth / (windowWidth * resolution);
  let prev_x = 0;
  let prev_y = noise(seed + frame_count*resolution) * height - height/2 + y_off;
  let cur_x = 0;
  let cur_y = 0;
  stroke(col);
  strokeWeight(10);
  for (var i = 1; i <= windowWidth * resolution + 1; i++){
    cur_x = i*ratio;
    cur_y = noise(seed + frame_count*resolution + i) * height - height/2 + y_off;
    line(prev_x, prev_y, cur_x, cur_y);
    prev_x = cur_x;
    prev_y = cur_y;
  }
}

function new_goal(){
  temp_goal = height_list[Math.floor(Math.random() * height_list.length)];
  if (Math.random() > 0.85)
    temp_goal = Math.random() * 10 + 1;
  else if (Math.random() > 0.9)
    temp_goal = Math.random() * 100 + 10
  else if (Math.random() > 0.92)
    temp_goal = Math.random() * 1000 + 100
  else if (Math.random() > 0.96)
    temp_goal = Math.random() * 25000 + 1000
  while (temp_goal == height_goal){
    temp_goal = height_list[Math.floor(Math.random() * height_list.length)];
  }

  if (frame_count < 10*60)
    temp_goal = constrain(temp_goal, 0, Math.random()+3);
  if (frame_count < 30*60)
    temp_goal = constrain(temp_goal, 0, 15);
  return temp_goal;
}

function adjust_height(){
  cur_duration--;
  if (cur_duration <= 0 && !traveling){
    prev_height = height;
    height_goal = new_goal();
    cur_duration = Math.random() * 60 * (max_tdur - min_tdur) + 60 * (min_tdur);
    if (Math.abs(height_goal - prev_height) > 1000)
      cur_duration = constrain(cur_duration, 10*60, 99999);
    if (Math.abs(height_goal - prev_height) > 10000)
      cur_duration = constrain(cur_duration, 30*60, 99999);
    height_acc = ((height_goal - height) / Math.abs(height_goal - height) * Math.abs(height_goal - height) / (cur_duration/2))
      * ((height_goal - height) / Math.abs(height_goal - height) * Math.abs(height_goal - height) / (cur_duration/2))
      / (2 * (height_goal - height) / 2);

    //height_vel = (height_goal - height) / Math.abs(height_goal - height) * Math.abs(height_goal - height) / (cur_duration);
    console.log("Getting to " + height_goal + " in " + cur_duration/60.0 + " seconds with " + height_acc +" acc");
    traveling = true;
    halfway_hit = false;
  }
  if (!halfway_hit && Math.abs(height_goal - height) - Math.abs((height_goal - prev_height)/2) <= height_vel) {
    height_acc = ((height_goal - height) / Math.abs(height_goal - height) * Math.abs(height_goal - height) / (cur_duration/2))
      * ((height_goal - height) / Math.abs(height_goal - height) * Math.abs(height_goal - height) / (cur_duration/2))
      / (2 * (height_goal - height)) * -1 * 1.05;
    console.log("Switch acc: " + height_acc);
    halfway_hit = true;
  }
  //console.log((height_vel + height_acc) / Math.abs(height_vel + height_acc) + " !=? "+  (height_vel) / Math.abs(height_vel));
  if (traveling && height_vel != 0 && (height_vel + height_acc) / Math.abs(height_vel + height_acc) != (height_vel) / Math.abs(height_vel)){
    height_acc = 0;
    height_vel = 0;
    cur_duration = Math.random() * 60 * (max_wdur - min_wdur) + 60 * (min_wdur);
    console.log("Waiting for " + cur_duration/60.0 + " seconds");
    traveling = false;
  }
  height_vel += height_acc;
  height += height_vel;
  if (height <= 0)
    console.log( "AAAAAANOOOOOO");
}

function adjust_color(){
  for (var i = 0; i < 3; i++){
    if (back_c[i] + back_c_v[i] >= 255 || back_c[i] + back_c_v[i] <= 0)
      back_c_v[i] *= -1;
    back_c[i] += (back_c_v[i] + back_c_v[i] * Math.sqrt(Math.abs(height_vel)));
  }
}

function draw() {
  frame_count++;
  adjust_height();
  adjust_color();
  background(back_c);
  let ratio = windowHeight / (windowHeight * v_resolution);
  for (var r = -6; r <= windowHeight * v_resolution + 3; r++){
    if (r%2 == 0)
      draw_line(seeds[r], [255 - back_c[0], 255-back_c[1], 255-back_c[2]], r * ratio);
    else
      draw_line(seeds[r], back_c, r * ratio);
  }

}