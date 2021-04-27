var fart = new Audio("resource/Labs/sound_lab/fart_sound.mp3");
var bell = new Audio("resource/Labs/sound_lab/bell.mp3");
var morse = new Audio("resource/Labs/sound_lab/morse_code.mp3")
var dial = new Audio("resource/Labs/sound_lab/dial_tone.mp3")
var horn = new Audio("resource/Labs/sound_lab/dixie-horn.mp3")

var slider = document.getElementById("volume");
var output = document.getElementById("volumeValue");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

function playSound(x)
{
  var volume = document.getElementById('volume').value;

  console.log(x + " sound is playing...");
  console.log("The volume is: " + volume*0.01);

  x.volume = volume*0.01;
  x.currentTime=0;
  x.play();
}

const fartButton = document.getElementById('fartButton');
fartButton.onclick = function() {
  playSound(fart);
}

const bellButton = document.getElementById('bellButton');
bellButton.onclick = function() {
  playSound(bell);
}

const morseButton = document.getElementById('morseButton');
morseButton.onclick = function() {
  playSound(morse);
}

const dialButton = document.getElementById('dialButton');
dialButton.onclick = function() {
  playSound(dial);
}

const hornButton = document.getElementById('hornButton');
hornButton.onclick = function() {
  playSound(horn);
}

