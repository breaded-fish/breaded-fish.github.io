const canvas_animation = document.getElementById('canvas_animation');
const ctx_animation = canvas_animation .getContext('2d');

//Images
let planeSprite = new Image();
planeSprite.src = './resource/Assignments/planeanim/plane-spritesheet.png';

let smokeSprite = new Image();
smokeSprite.src = './resource/Assignments/planeanim/new_smokesprite.png';

let plane_img = new Image();
plane_img.src = './resource/Assignments/planeanim/plane.png';

let cloud_img = new Image();
cloud_img.src = './resource/Assignments/planeanim/cloud.png';

let speechBubble_img = new Image();
speechBubble_img.src = './resource/Assignments/planeanim/speechbubble.png';

//JSON Arrays
var plane_spritesheet = {
	"frames": [
		{
			"frame": {
				"x": 1,
				"y": 1,
				"w": 300,
				"h": 300
			},
			"sourceSize": {
				"w": 300,
				"h": 300
			}
		},
		{
			"frame": {
				"x": 1,
				"y": 303,
				"w": 300,
				"h": 300
			},
			"sourceSize": {
				"w": 300,
				"h": 300
			}
		},
		{
			"frame": {
				"x": 1,
				"y": 605,
				"w": 300,
				"h": 300
			},
			"sourceSize": {
				"w": 300,
				"h": 300
			}
		},
		{
			"frame": {
				"x": 1,
				"y": 907,
				"w": 300,
				"h": 300
			},
			"sourceSize": {
				"w": 300,
				"h": 300
			}
		},
		{
			"frame": {
				"x": 1,
				"y": 1209,
				"w": 300,
				"h": 300
			},
			"sourceSize": {
				"w": 300,
				"h": 300
			}
		}
	]
}

var smoke_spritesheet = {
	"frames": [
		{
			"frame": {
				"x": 1,
				"y": 1,
				"w": 240,
				"h": 240
			},
			"sourceSize": {
				"w": 240,
				"h": 240
			}
		},
		{
			"frame": {
				"x": 243,
				"y": 1,
				"w": 240,
				"h": 240
			},
			"sourceSize": {
				"w": 240,
				"h": 240
			}
		},
		{
			"frame": {
				"x": 485,
				"y": 1,
				"w": 240,
				"h": 240
			},
			"sourceSize": {
				"w": 240,
				"h": 240
			}
		},
		{
			"frame": {
				"x": 1,
				"y": 243,
				"w": 240,
				"h": 240
			},
			"sourceSize": {
				"w": 240,
				"h": 240
			}
		},
		{
			"frame": {
				"x": 243,
				"y": 243,
				"w": 240,
				"h": 240
			},
			"sourceSize": {
				"w": 240,
				"h": 240
			}
		},
		{
			"frame": {
				"x": 485,
				"y": 243,
				"w": 240,
				"h": 240
			},
			"sourceSize": {
				"w": 240,
				"h": 240
			}
		},
		{
			"frame": {
				"x": 1,
				"y": 485,
				"w": 240,
				"h": 240
			},
			"sourceSize": {
				"w": 240,
				"h": 240
			}
		},
		{
			"frame": {
				"x": 243,
				"y": 485,
				"w": 240,
				"h": 240
			},
			"sourceSize": {
				"w": 240,
				"h": 240
			}
		},
		{
			"frame": {
				"x": 485,
				"y": 485,
				"w": 240,
				"h": 240
			},
			"sourceSize": {
				"w": 240,
				"h": 240
			}
		}
	]
}

//Onload funct
planeSprite.onload = function(){
	animatePlane()
	animateSmoke();
}

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
  ctx_animation.font = font;
	ctx_animation.fillStyle= color;
	ctx_animation.textAlign = "center";
  ctx_animation.fillText(text, x, y);
}

/*Function drawPlane
	Reads from a JSON array and finds specific x and y coordinates on a sprite sheet.
	Arguments:
	i = index of animination loop*/
function drawPlane(i){

	ctx_animation.drawImage(plane_img,i+76.5,i+266);
	ctx_animation.drawImage(cloud_img,500,175);
	ctx_animation.drawImage(cloud_img,-300,175);
	ctx_animation.drawImage(cloud_img,0,-100);

  ctx_animation.drawImage(planeSprite, plane_spritesheet.frames[i].frame.x,
      plane_spritesheet.frames[i].frame.y,
      plane_spritesheet.frames[i].frame.w,
      plane_spritesheet.frames[i].frame.h, 250, 300,
			plane_spritesheet.frames[i].sourceSize.w,
			plane_spritesheet.frames[i].sourceSize.h);

	ctx_animation.drawImage(speechBubble_img,450,150,239,239);
	drawtext('MAYDAY,MAYDAY!','18px Century Gothic','black',570,250);
}
/*Function drawSmoke
	Reads from a JSON array and finds specific x and y coordinates on a sprite sheet.
	Arguments:
	i = index of animination loop*/
function drawSmoke(i){
	ctx_animation.drawImage(smokeSprite, smoke_spritesheet.frames[i].frame.x,
			smoke_spritesheet.frames[i].frame.y,
			smoke_spritesheet.frames[i].frame.w,
			smoke_spritesheet.frames[i].frame.h, 125, 250,
			smoke_spritesheet.frames[i].sourceSize.w,
			smoke_spritesheet.frames[i].sourceSize.h);
}

/*Special Function animatePlane()
This function contains the animation loop.
*Recursive function 
*/

//Plane settings
const cycleLoop = [0,1,1,2,2,3,3,0];
let currentLoopIndex = 0;
let delay = 30;//delay determines the time between calling the next frame

function animatePlane() {

  //console.log(currentLoopIndex);

	if (currentLoopIndex > cycleLoop.length - 1) {
		currentLoopIndex = 0;
	}
	else
	{
		ctx_animation.clearRect(0, 0, canvas_animation.width, canvas_animation.height);
		drawPlane(cycleLoop[currentLoopIndex]);
	}
	currentLoopIndex++;
	setTimeout(animatePlane, delay);
}

/*Special Function animateSmoke()
This function contains the animation loop.
*Recursive function 
*/

//Smoke settings
const smoke_cycleLoop = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8];
let smoke_currentLoopIndex = 0;
let smoke_delay = 30;//delay determines the time between calling the next frame

function animateSmoke() {

  //console.log(smoke_currentLoopIndex);

	if (smoke_currentLoopIndex > smoke_cycleLoop.length - 1) {
		smoke_currentLoopIndex = 0;
	}
	else
	{
		drawSmoke(smoke_cycleLoop[smoke_currentLoopIndex]);
	}
	smoke_currentLoopIndex++;
	setTimeout(animateSmoke, smoke_delay);
}