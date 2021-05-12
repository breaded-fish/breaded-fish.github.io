class sceneLose extends Phaser.Scene {
  constructor() {
      super('sceneLose');
  }
  preload(){
    this.load.image("background", "resource/Assignments/phaser_game_project/gameAssets/background.png");
    this.load.image("nkey", "resource/Assignments/phaser_game_project/gameAssets/help/nkey.png");
    this.load.image("game-over", "resource/Assignments/phaser_game_project/gameAssets/game-over/game-over.png");

    this.load.tilemapTiledJSON("title", "resource/Assignments/phaser_game_project/gameAssets/tilemap/title.json");
    this.load.image("tiles", "resource/Assignments/phaser_game_project/gameAssets/tileset/tileset.png");

    this.load.audio("outro_music", ["resource/Assignments/phaser_game_project/gameAssets/game-over/game_over_music.mp3"]);
    
  }
  create() {
    this.background = this.add.tileSprite(game.renderer.width/2, game.renderer.height/2, game.renderer.width, game.renderer.height, "background");
    this.outro_music = this.sound.add("outro_music", { loop: true });
    this.outro_music.play();

    this.add.image(5, 100,'game-over').setOrigin(0, 0);

    const map = this.make.tilemap({ key: 'title' });
    const tileset = map.addTilesetImage('platformTileset', 'tiles');

    map.createLayer('floor', tileset, 0, 0);

    let nkey = this.add.image((this.game.renderer.width/8) - 15, 425,'nkey').setOrigin(0, 0);
    this.add.text(nkey.x + 35, nkey.y - 120, "- To go back to the main menu.", {font: "15px Century Gothic",fill: "white"});
    this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  }
  

  update() 
  {
    this.background.tilePositionX -= 0.1;

    if(this.restart.isDown)
    {
      this.outro_music.stop();
      this.scene.stop();
      this.scene.launch('sceneTitle');
    }
  }
}