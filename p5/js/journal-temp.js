let frame_count = 0;
let total_text = '';
let text_entries = [];
let entry_list = [];
let cur_clicked = false;
let original_date = new Date('06/26/2019');
let min_diameter = 20;
let speed_max = 0.4;

let flash_v = Math.floor(Math.random()*3);
console.log(flash_v);

// class for jounal entries (one instance per entry)
class entry {
  constructor(t_text, id, others) {
    this.date = new Date(t_text.split('\n').slice(0,1).join(""));
    var diffTime = Math.abs(this.date.getTime() - original_date.getTime());
    this.dayCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.text = t_text.split('\n').slice(0,1).join("") + " : Day " + this.dayCount + "<br>" + t_text.split('\n').slice(1).join("\n");
    this.len = this.text.length;
    this.ratio = 1;
    this.x=Math.random() * (windowWidth-200) + 100;
    this.y=Math.random() * (windowHeight-200) + 100;
    this.d=50;
    this.c=[80,30,155, 255];
    this.v=[Math.random()*speed_max - speed_max/2,Math.random()*speed_max - speed_max/2];
    this.others = others;
    this.id = id;
    this.clicked = false;
    this.dead = false;
  }

  // update pos/vel, every frame
  update_values() {
    this.x += this.v[0];
    this.y += this.v[1];
  }

  // after set_ratio, set initial values
  start_pos() {
    this.d = this.ratio * 100 + min_diameter;
    this.x=Math.random() * (windowWidth-200) + 100;
    this.y=Math.random() * (windowHeight-200) + 100;
    var is_t = this.init_collision_check();
    while(is_t) {
      this.x=Math.random() * (windowWidth-200) + 100;
      this.y=Math.random() * (windowHeight-200) + 100;
      is_t = this.init_collision_check();
    }
  }

  // check screen bounding box
  check_bounds(){
    if (this.x + this.d/2 > width) {

      this.x = width - this.d/2;

      this.v[0] += -0.9; 

    }

    else if (this.x - this.d/2 < 0) {

      this.x = this.d/2;

      this.v[0] *= -0.9;

    }

    if (this.y + this.d/2 > height) {

      this.y = height - this.d/2;

      this.v[1] *= -0.9; 

    } 

    else if (this.y - this.d/2 < 0) {

      this.y = this.d/2;

      this.v[1] *= -0.9;

    }
  }

  // draw self, every frame
  draw_self() {
    if (this.clicked){
      this.c[3] -= 1;
      /*textSize(25);
      textAlign(CENTER);
      fill(255,100,255);
      text(this.text, windowWidth/6, windowHeight/6, windowWidth/6*4, windowHeight/6*4);
      */
    }
    if (this.c[3] <= 0)
      this.dead = true;
    if (this.dead)
      return;
    this.update_values();
    this.collide();
    this.check_bounds();
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, this.d, this.d);
  }

  // check starting position collision
  init_collision_check() {
    for (var i = 0; i < this.others.length; i++) {
      if (i != this.id){

        var dx = this.others[i].x - this.x;

        var dy = this.others[i].y - this.y;

        var distance = sqrt(dx*dx + dy*dy);

        var minDist = this.others[i].d/2 + this.d/2;

        if (distance < minDist) { 
          return true;
        }
          
      }

    }   
    return false;
  }

  // check circle collision (http://processingjs.org/learning/topic/circlecollision/)
  collide() {

    for (var i = 0; i < this.others.length; i++) {
      if (i == this.id)
        continue;

      var dx = this.others[i].x - this.x;

      var dy = this.others[i].y - this.y;

      var distance = sqrt(dx*dx + dy*dy);

      var minDist = this.others[i].d/2 + this.d/2;

      if (distance < minDist) { 

        var angle = atan2(dy, dx);

        var targetX = this.x + cos(angle) * minDist;

        var targetY = this.y + sin(angle) * minDist;

        var ax = (targetX - this.others[i].x) * 0.05;

        var ay = (targetY - this.others[i].y) * 0.05;

        this.v[0] -= ax;

        this.v[1] -= ay;

        this.others[i].v[0] += ax;

        this.others[i].v[1] += ay;

        //this.c[flash_v] = Math.random()*255;


      }
    }   
  }

  selected() {
    this.clicked = true;
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  load_text_entries();
  frameRate(60);
}

// read initial text file
function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                total_text = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}

// convert text file into entry_list
function load_text_entries() {
  readTextFile("https://aaronmkarp.com/files/journal_entries.txt");
  text_entries = total_text.split("--");
  text_entries.shift();
  var max_len = 0;
  for (var i = text_entries.length - 1; i >= 0; i--) {
    var new_entry = new entry(text_entries[i], text_entries.length-1-i, entry_list);
    entry_list.push(new_entry);
    if (new_entry.len > max_len)
      max_len = new_entry.len;
  }
  for (var i = entry_list.length - 1; i >= 0; i--) {
    entry_list[i].ratio = entry_list[i].len / max_len;
    entry_list[i].start_pos();
  }
}

function mousePressed() {
  if (!cur_clicked){
    for (var i = 0; i < entry_list.length; i++) {
      if (overCircle(entry_list[i].x, entry_list[i].y, entry_list[i].d)){
        entry_list[i].selected();
        cur_clicked = true;
        document.getElementById("textArea").innerHTML = entry_list[i].text + "<br><br><button id='closeButton' onclick='turnDivOff()'>close</button>";
        turnDivOn();
      }
    }
  }
}

// check mouse collision against entry_list
function overCircle(x, y, diameter) {
  var disX = x - mouseX;
  var disY = y - mouseY;
  if (sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
    return true;
  } else {
    return false;
  }
}

function draw() {
  background(155,30,80);
  frame_count++;
  var i_offset = 0;
  for (var i = 0; i < entry_list.length; i++) {
    entry_list[i].id = entry_list[i].id + i_offset;
    entry_list[i].draw_self();
    if (entry_list[i].dead){
      entry_list.splice(i,1);
      i_offset -= 1;
      i-=1;
    }
  }

  if (Math.random() > 0.9995){
    flash_v = Math.floor(Math.random() * 3);
    console.log(flash_v);
  }
}



function turnDivOn() {
  //document.getElementById("overlay").style.display = "inline-block";
  document.getElementById("overlay").className = "visible";
}

function turnDivOff() {
  //document.getElementById("overlay").style.display = "none";
      cur_clicked = false;
      document.getElementById("overlay").className = "hidden";
}

function fadeOutEffect() {
    
}
