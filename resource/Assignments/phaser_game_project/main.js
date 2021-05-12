//Global variable that can be called
var game;

//Detects if the button has been pressed.
const gameButton = document.getElementById('startGameButton1');
gameButton.onclick = function() {

  var config = {
    type: Phaser.AUTO,
    width: 320,
    height: 640,
    parent: 'phaser-game-project',
    scene: [sceneTitle,sceneMain, sceneHelp, sceneStory, sceneWin, sceneLose],
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