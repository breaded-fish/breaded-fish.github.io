class sceneHelp extends Phaser.Scene {
  constructor() {
      super('sceneHelp');
  }
  preload(){
    this.load.image("wasd", "resource/Assignments/phaser_game_project/gameAssets/help/wasd.png");
    this.load.image("arrows", "resource/Assignments/phaser_game_project/gameAssets/help/arrows.png");
    this.load.image("nkey", "resource/Assignments/phaser_game_project/gameAssets/help/nkey.png");

  }
  create() {
    let helpScreen = this.add.graphics({
      fillStyle:{
        color: 0x000000,
        alpha: 0.7
      }
    });
    helpScreen.fillRect(0, 0, this.game.renderer.width,this.game.renderer.height);
    
    this.add.image(this.game.renderer.width/2, 100,'wasd').setOrigin(0, 0);
    this.add.image((this.game.renderer.width/8) + 5, 100,'arrows').setOrigin(0, 0);
    let nkey = this.add.image((this.game.renderer.width/8) + 7, 200,'nkey').setOrigin(0, 0);

    this.add.text(10, -150, "Controls:", {font: "25px Century Gothic",fill: "white"});

    this.add.text(10, 125, "Rules:", {font: "15px Century Gothic",fill: "white"});
    this.add.text(10, 150, "Collect all the gold coins to win!", {font: "15px Century Gothic",fill: "white"});
    this.add.text(10, 175, "Avoid the enemies!", {font: "15px Century Gothic",fill: "white"});
    
    this.add.text(nkey.x + 35, nkey.y - 120, "- To start a new game.", {font: "15px Century Gothic",fill: "white"});

    this.add.text(this.game.renderer.width/8, 300, "Press any key to continue", {font: "20px Century Gothic",fill: "white"});

    let scene = this.scene;

    this.input.keyboard.on('keydown', function(){
      scene.resume('sceneMain');
      scene.resume('sceneTitle');
      scene.stop()
    });
  }
}