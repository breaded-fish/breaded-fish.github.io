const canvas_speech_objects = document.getElementById('canvas_speech_objects');
const ctx_speech = canvas_speech_objects.getContext('2d');
const speech_button = document.getElementById('startSpeechButton');

var apple_img = new Image();
var banana_img = new Image();
var mango_img = new Image();
var watermelon_img = new Image();
var orange_img = new Image();
var error_img = new Image();
var help_img = new Image();
var about_img = new Image();

apple_img.src = 'resource/Assignments/speech_recognition/apple.png';
banana_img.src = 'resource/Assignments/speech_recognition/banana.png';
mango_img.src = 'resource/Assignments/speech_recognition/mango.png';
watermelon_img.src = 'resource/Assignments/speech_recognition/watermelon.png';
orange_img.src = 'resource/Assignments/speech_recognition/orange.png';
error_img.src = 'resource/Assignments/speech_recognition/xmark.png';
help_img.src = 'resource/Assignments/speech_recognition/help.png';
about_img.src = 'resource/Assignments/speech_recognition/copyright.png';

//Below are line reducing functions for the sake of efficency
/*
function drawtext:
    draws text
  -arguements:
    -text
    -font type
    -color
    -x and y positions
*/
function drawtext(text, font, color, x, y){
  ctx_speech.font = font;
  ctx_speech.fillStyle= color;
  ctx_speech.fillText(text, x, y);

}


/*
function drawDefault"
  draws text of avaiable fruits*/
function drawDefault()
{ 
  ctx_speech.clearRect(0, 0, canvas_speech_objects.width, canvas_speech_objects.width);
  drawtext('Apple','30px Century Gothic','black',100, 100);
  drawtext('Mango','30px Century Gothic','black',100, 130);
  drawtext('Banana','30px Century Gothic','black',100, 160);
  drawtext('Watermelon','30px Century Gothic','black',100, 190);
  drawtext('Orange','30px Century Gothic','black',100, 220);
}


/*function speak
  Courtuesy Stephen Walther, code is being used for education purposed.

  Arguments:
  -text
  -callback (additional command)
*/
function speak(text, callback) {
  var u = new SpeechSynthesisUtterance();
  u.text = text;
  u.lang = 'en-US';

  u.onend = function () {
      if (callback) {
          callback();
      }
  };

  u.onerror = function (e) {
      if (callback) {
          callback(e);
      }
  };

  speechSynthesis.speak(u);
}

/*Function findFruit
  finds a fruit within the transcript and displays it
  
  Arguments
  -text/transcript
*/
function findFruit(text)
{
  if(text.includes('apple'))
  {
    ctx_speech.clearRect(0, 0, canvas_speech_objects.width, canvas_speech_objects.width);
    console.log("Apple confirmed.");
    ctx_speech.drawImage(apple_img, 25, 50);
    drawtext('Apple','30px Century Gothic','black',100, 275);
  }
  else if(text.includes('mango'))
  {
    ctx_speech.clearRect(0, 0, canvas_speech_objects.width, canvas_speech_objects.width);
    console.log("Mango confirmed.");
    ctx_speech.drawImage(mango_img, 55, 50);
    drawtext('Mango','30px Century Gothic','black',100, 275);
  }
  else if(text.includes('banana'))
  {
    ctx_speech.clearRect(0, 0, canvas_speech_objects.width, canvas_speech_objects.width);
    console.log("Banana confirmed.")
    ctx_speech.drawImage(banana_img, 25, 75);
    drawtext('Banana','30px Century Gothic','black',100, 275);
  }
  else if(text.includes('watermelon'))
  {
    ctx_speech.clearRect(0, 0, canvas_speech_objects.width, canvas_speech_objects.width);
    console.log("Watermelon confirmed.")
    ctx_speech.drawImage(watermelon_img, 50, 50);
    drawtext('Watermelon','30px Century Gothic','black',70, 280);
  }
  else if(text.includes('orange'))
  {
    ctx_speech.clearRect(0, 0, canvas_speech_objects.width, canvas_speech_objects.width);
    console.log("Orange confirmed.");
    ctx_speech.drawImage(orange_img, 50, 40);
    drawtext('Orange','30px Century Gothic','black',90, 275);
  }
  else if(text.includes('help'))
  {
    ctx_speech.clearRect(0, 0, canvas_speech_objects.width, canvas_speech_objects.width);
    console.log("Help confirmed.")
    ctx_speech.drawImage(help_img, 50, 40);
    drawtext('Help','30px Century Gothic','black',115, 275);
    speak('Say a name of the object on the screen. Say about, to hear about my day');
  }
  else if(text.includes('about'))
  {
    ctx_speech.clearRect(0, 0, canvas_speech_objects.width, canvas_speech_objects.width);
    console.log("About confirmed.")
    ctx_speech.drawImage(about_img, 50, 40);
    drawtext('About','30px Century Gothic','black',100, 275);
    speak('Written by Ving Hei Fung 2021. There is no copyright because I have no money. Since you want to know about my day, I spent about 7 hours writing this program. I am pretty exhausted and I still have about 3 other projects to finish.');
  }
  else
  {
    ctx_speech.clearRect(0, 0, canvas_speech_objects.width, canvas_speech_objects.width);
    console.log("Unknown confirmed.")
    ctx_speech.drawImage(error_img, 50, 40);
    drawtext('Unknown','30px Century Gothic','black',90, 275);
  }
}

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.getElementById('page_transcript');

drawDefault();

speech_button.onclick = function(){

  if(speech_button.innerText === 'Speak')
  {
    drawDefault();
    let phrase ='';
    console.clear();
    speech_button.innerText = 'Stop';
	
    recognition.lang = 'en';
    recognition.start();

    recognition.addEventListener('result', e=>{ 
      const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    
      phrase = transcript.toLowerCase();
      p.textContent = phrase;
      console.log(phrase);
    });
  }
  else if(speech_button.innerText === 'Stop')
  {
    speech_button.innerText = 'Speak';
    recognition.abort();
  }
};

recognition.addEventListener('end', e=>{
  speech_button.innerText = 'Speak'; 
  speak(p.textContent);
  findFruit(p.textContent);
  recognition.abort();
});


