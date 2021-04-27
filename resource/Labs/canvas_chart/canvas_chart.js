const canvas_chart = document.getElementById('canvas_chart');
const ctx_chart = canvas_chart.getContext('2d');

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
  ctx_chart.beginPath();
  ctx_chart.arc(x, y, radius, 0, Math.PI*2);
  ctx_chart.fillStyle = color;
  ctx_chart.fill();
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
  ctx_chart.fillStyle = color;
  ctx_chart.fillRect(x, y, length, width);
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

  ctx_chart.font = font;
  ctx_chart.fillStyle= color;
  ctx_chart.textAlign = "center";
  ctx_chart.fillText(text, x, y);
  
}
/*
  Special function drawgrid
    -draws a grid for ease of mapping
    -circle = 100 units;

*/
function drawgrid(boolean){
  var w = (canvas_chart.width/100);
  var h = (canvas_chart.height/100);

  if(boolean === true)
  {
    for(var a = 1; a < w ; a++)
    {
      var x = a*100;
      for (var b= 1; b < h ; b++)
      {
        var y = b*100;
        drawcircle(x, y, 5, 'black');
      }
    }
  }
}

drawgrid(false);//I created a boolean for the later uses, maybe let the user turn on the grid?



//Array of Fruits
var fruits = {

  "name":["Apple","Orange", "Banana", "Kiwi", "Blueberry", "Grapes"],
  "quantity":[20,10,15,3,5,8],
  "color":['red','orange','yellow','green','skyblue','purple']
  
};

/*Special function findchartfit

  This function specifically finds the number required for fitting the bar on to the canvas.

  Math:
  The first for loop will look into the fruits.quantity and find the largest number.

  In this case it will be: 20.

  With the biggest number we will divide the canvas height (600) with the biggest number which will get us: 30.

  Then with that number we will convert it into a negative number and return it to the drawrect*/
function findchartfit(){
  var fit = 0;
  for (var i in fruits.quantity) {
   if(fruits.quantity[i] > fit){
     fit = fruits.quantity[i];
   }
    var chartfit = -(canvas_chart.height/fit);
   return chartfit;
  }
}


var fitnum = findchartfit();
for(var f = 0; f < canvas_chart.height/100; f++)
  {
    drawrect(f*100, 600, 100, (fruits.quantity[f])*fitnum, fruits.color[f]);
    drawtext(fruits.name[f],'18px Century Gothic','black',(f*100)+50,550);
    drawtext(fruits.quantity[f],'20px Century Gothic','black',((f*100) + 50),575);
  }
