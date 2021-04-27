//Global variable that can be called
var game;

//Detects if the button has been pressed.
const gameButton = document.getElementById('startGameButton');
gameButton.onclick = function() {

  
  var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    parent: 'phaser-game',
    scene: [SceneMain],
    physics: {
      default: 'arcade',
      arcade: {debug:false}
    }
  };

    //Loads the config of Phaser
    game = new Phaser.Game(config);

    //Disables the button
	  gameButton.disabled = "disabled";
}