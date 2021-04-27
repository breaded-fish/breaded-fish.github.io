const canvas = document.getElementById('canvas_cartoon');
const ctx = canvas.getContext('2d');

//Below are line reducing functions for the sake of efficency
/*
function drawcircle:
     draws a circle
 -arguements:
    -x and y cordinates of the canvas
    -radius
    -color
*/
function drawcircle(x, y, radius, color){
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
}

/*
function drawrect:
     draws a rectangle
 -arguements:
    -x and y cordinates of the canvas
    -length
    -width
    -color
*/
function drawrect(x, y, length, width, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, width);
}

/*
function drawtriangle:
    draws a triangle
 -arguements:
    -x1 and x2 starting position
    -x3 and x4 secondary position
    -x5 and x6 tertiary postion 
    -color
*/
function drawtriangle(x1, x2, x3,x4, x5, x6, color){
  ctx.beginPath();
  ctx.moveTo(x1,x2);
  ctx.lineTo(x3,x4);
  ctx.lineTo(x5,x6);
  ctx.fillStyle = color;
  ctx.fill();
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
  ctx.font = font;
  ctx.fillStyle= color;
  ctx.fillText(text, x, y);

}
/*
Special function drawgrid
    -draws a grid for ease of mapping
    -circle = 100 units
 */
function drawgrid(boolean){
  if(boolean === true)
  {
    for(var a = 1; a < canvas.width/100 ; a++)
    {
      var x = a*100;
      for (var b= 1; b < canvas.height/100 ; b++)
      {
        var y = b*100;
        drawcircle(x, y, 5, 'black');
      }
    }
  }
}

drawgrid(false);//I created a boolean for the later uses, maybe let the user turn on the grid?

//ground
drawrect(0, 500, 800, 100, 'brown');

//grass
drawrect(0, 500, 800, 25, 'green');

//sun
drawcircle(700, 100, 75, 'yellow');

//clouds
drawcircle(200, 100, 50,'white');
drawcircle(250, 95, 60,'white');
drawcircle(300, 100, 50, 'white');

//mountain
drawtriangle(200, 500, 400, 300, 600, 500,'gray');

//house
drawrect(350, 400, 100, 100,'blue');
//roof
drawtriangle(350,400,400,350,450,400,'red');
//windows
drawrect(360, 435, 20, 20, 'lightblue');
drawrect(420, 435, 20, 20, 'lightblue');
//door
drawrect(388, 460, 25, 40, 'black');

//right tree
drawrect(500, 400, 30, 100, 'saddlebrown');
drawcircle(515, 400, 50, 'olive');

//left tree
drawrect(275, 400, 30, 100, 'saddlebrown');
drawcircle(290, 400, 50, 'olive');

//fence
for(var f = 2; f < 7; f++){
  var e = f * 100;
  drawrect(e - 5, 470, 15, 30, 'DarkGoldenRod');
}
drawrect(200, 470, 400, 5, 'DarkGoldenRod');

//words
drawtext('Pain is relative!','30px Century Gothic','black',300, 200);
