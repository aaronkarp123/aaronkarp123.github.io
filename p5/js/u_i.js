var dictionary;
var reader;
var cur_word;
var all_words;
var color;
var all_colors;
var num_frames;
var width_factor = 50;
var mod_frames = width_factor+25;
var speed = 1;
var max_length;
var os;
var highlights;
var cur_poss;
var done_moving = true;


function getText(){
    // read text from URL location
    /*var request = new XMLHttpRequest();
    request.open('GET', 'file:///Users/aaronkarp/Documents/WebDemos/p5/english-words-master/words.txt', true); //https://www.aaronmkarp.com/files/english-words-master/words.txt
    
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4){ 
        	if (request.status === 200 || request.status == 0) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return request.responseText;
            }
        }
        }
    }*/
    var txt = '';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	  if((xmlhttp.status == 200 || xmlhttp.status == 0) && xmlhttp.readyState == 4){
	    txt = xmlhttp.responseText;
	  }
	};
	xmlhttp.open("GET","../english-words-master/words.txt",true);
	xmlhttp.send();
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	num_frames = 0;
	cur_word = random_word(int(width/width_factor));
	all_words = [];
	color = [];
	all_colors = [];
	os = [];
	highlights = [];
	cur_poss = [];
	for (var i = 0; i < cur_word.length; i++){
		color.push(rand_color());
		all_words.push([cur_word[i]]);
		all_colors.push([color[i]]);
		cur_poss.push(50);
		if (cur_word[i] == "o")
			os.push([true]);
		else
			os.push([false]);
		highlights.push([false]);
	}

	max_length = int(height / width_factor)+1;
}

function ar_to_str(a) {
	var total = "";
	for (var i = 0; i < a.length; i++){
		total += a[i];
	}
	return total;
}

function random_word(l) {
	s = [];
	for (var i = 0; i < l; i++){
		s.push(String.fromCharCode(97+Math.floor(Math.random()*26)));
	}
	return s;
}

function rand_color() {
	return [int(Math.random()*120) + 80, int(Math.random()*120) + 80, int(Math.random()*120) + 80];
}

function update_negatives() {
	for (var c = 0; c < all_words.length; c++){
		for (var r = 0; r < all_words[c].length; r++){
			var ist = false;
			try{
			if (all_words[c][r] == 'w' && all_words[c+1][r] == 'e'){
				ist = true;
			}
			if (all_words[c][r] == 'w' && all_words[c+1][r-1] == 'e'){
				ist = true;
			}
			if (all_words[c][r] == 'w' && all_words[c+1][r+1] == 'e'){
				ist = true;
			}
			if (all_words[c][r] == 'w' && all_words[c][r+1] == 'e'){
				ist = true;
			}
			if (all_words[c][r] == 'u' && all_words[c+1][r] == 's'){
				ist = true;
			}
			if (all_words[c][r] == 'u' && all_words[c+1][r-1] == 's'){
				ist = true;
			}
			if (all_words[c][r] == 'u' && all_words[c+1][r+1] == 's'){
				ist = true;
			}
			if (all_words[c][r] == 'u' && all_words[c][r+1] == 's'){
				ist = true;
			}

			if (all_words[c][r] == 'e' && all_words[c-1][r] == 'w'){
				ist = true;
			}
			if (all_words[c][r] == 'e' && all_words[c-1][r+1] == 'w'){
				ist = true;
			}
			if (all_words[c][r] == 'e' && all_words[c-1][r-1] == 'w'){
				ist = true;
			}
			if (all_words[c][r] == 'e' && all_words[c][r-1] == 'w'){
				ist = true;
			}
			if (all_words[c][r] == 's' && all_words[c-1][r] == 'u'){
				ist = true;
			}
			if (all_words[c][r] == 's' && all_words[c-1][r+1] == 'u'){
				ist = true;
			}
			if (all_words[c][r] == 's' && all_words[c-1][r-1] == 'u'){
				ist = true;
			}
			if (all_words[c][r] == 's' && all_words[c][r-1] == 'u'){
				ist = true;
			}
			}
			catch(e){
				if (!ist)
					highlights[c][r] = false;
				continue;
			}
			if (!ist)
				highlights[c][r] = false;
		}
	}
}

function update_positives() {
	for (var c = 0; c < all_words.length; c++){
		for (var r = 0; r < all_words[c].length; r++){
			try{
			if (all_words[c][r] == 'w' && all_words[c+1][r] == 'e'){
				highlights[c][r] = true;
				highlights[c+1][r] = true;
			}
			if (all_words[c][r] == 'w' && all_words[c+1][r-1] == 'e'){
				highlights[c][r] = true;
				highlights[c+1][r-1] = true;
			}
			if (all_words[c][r] == 'w' && all_words[c+1][r+1] == 'e'){
				highlights[c][r] = true;
				highlights[c+1][r+1] = true;
			}
			if (all_words[c][r] == 'w' && all_words[c][r+1] == 'e'){
				highlights[c][r] = true;
				highlights[c][r+1] = true;
			}
			if (all_words[c][r] == 'u' && all_words[c+1][r] == 's'){
				highlights[c][r] = true;
				highlights[c+1][r] = true;
			}
			if (all_words[c][r] == 'u' && all_words[c+1][r-1] == 's'){
				highlights[c][r] = true;
				highlights[c+1][r-1] = true;
			}
			if (all_words[c][r] == 'u' && all_words[c+1][r+1] == 's'){
				highlights[c][r] = true;
				highlights[c+1][r+1] = true;
			}
			if (all_words[c][r] == 'u' && all_words[c][r+1] == 's'){
				highlights[c][r] = true;
				highlights[c][r+1] = true;	
			}
			}
			catch(e){
				continue;
			}
		}
	}
}

function draw() {
  background(50);
  num_frames++;
  if (num_frames % (50/speed) == 0)
  	update_positives();
  if (num_frames % mod_frames == 0){
  	//update_positives();
  	var index = int(Math.random()*cur_word.length);
  	new_letter = String.fromCharCode(97+Math.floor(Math.random()*26));
  	while (new_letter == cur_word[index]){
  		new_letter = String.fromCharCode(97+Math.floor(Math.random()*26));
  	}
  	cur_word[index] = new_letter;
  	cur_poss[index] -= width_factor;
  	if (new_letter == 'o')
  		os[index].unshift(true);
  	else
  		os[index].unshift(false);
  	highlights[index].unshift(false);
  	//if (new_letter == 'i')
  	//	color[index] = 255;
  	//else
  		color[index] = rand_color();
	all_words[index].unshift(cur_word[index]);
	all_colors[index].unshift(color[index]);
	update_negatives();
  }
  fill(255);
  textSize(40);
  textAlign(CENTER);
  var prevx=-1, prevy=-1;
  for (var i = 0; i < all_words.length; i++){
  	if (cur_poss[i] < 50)
  		cur_poss[i] += speed;
  	for (var j = 0; j < all_words[i].length; j++){

  		if (os[i][j]){
  			if (prevx >= 0){
  				stroke(150,220, 220);
  				//line(50+100*i, cur_poss[i]+100*j-10, prevx, prevy);
  			}
			prevx = width_factor/2+width_factor*i;
			prevy = cur_poss[i]+width_factor*j-10;
  		}
  		noStroke();

  		if (highlights[i][j]){
  			if (all_words[i][j] == 'w' || all_words[i][j] == 'e')
  				fill(255,40,125);
  			if (all_words[i][j] == 'u' || all_words[i][j] == 's')
  				fill(40,235,250);
  		}
  		else
  			fill(all_colors[i][j]);
  		text(all_words[i][j], width_factor/2+width_factor*i, cur_poss[i]+width_factor*j);

  		if (all_words[i].length > max_length){
		  	all_words[i].pop();
		  	all_colors[i].pop();
		  	os[i].pop();
		  	highlights[i].pop();
  		}
  }
  }
  
}