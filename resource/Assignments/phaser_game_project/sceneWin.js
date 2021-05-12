class sceneWin extends Phaser.Scene {
  constructor() {
      super('sceneWin');
  }
  preload(){
    this.load.image("background", "resource/Assignments/phaser_game_project/gameAssets/background.png");
    this.load.image("nkey", "resource/Assignments/phaser_game_project/gameAssets/help/nkey.png");
    this.load.image("win", "resource/Assignments/phaser_game_project/gameAssets/win-screen/You-win.png");

    this.load.tilemapTiledJSON("title", "resource/Assignments/phaser_game_project/gameAssets/tilemap/title.json");
    this.load.image("tiles", "resource/Assignments/phaser_game_project/gameAssets/tileset/tileset.png");

    this.load.atlas("idleSprite", "resource/Assignments/phaser_game_project/gameAssets/player/playerIdle.png", 
    "resource/Assignments/phaser_game_project/gameAssets/player/playerIdle.json");

    this.load.audio("win_music", ["resource/Assignments/phaser_game_project/gameAssets/win-screen/win_music.mp3"])
    
  }
  create() {
    this.background = this.add.tileSprite(game.renderer.width/2, game.renderer.height/2, game.renderer.width, game.renderer.height, "background");
    this.win_music = this.sound.add("win_music", { loop: false });
    this.win_music.play();

    this.add.image((this.game.renderer.width/4 - 40), 100,'win').setOrigin(0, 0);

    const map = this.make.tilemap({ key: 'title' });
    const tileset = map.addTilesetImage('platformTileset', 'tiles');

    map.createLayer('floor', tileset, 0, 0);
    this.player = this.add.sprite(this.game.renderer.width/2, 360, 'idleSprite');

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('idleSprite', {start: 0, end: 3, zeroPad: 3, prefix: 'tile', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    });

    this.player.play('idle');

    let nkey = this.add.image((this.game.renderer.width/8) - 15, 425,'nkey').setOrigin(0, 0);
    this.add.text(nkey.x + 35, nkey.y - 120, "- To go back to the main menu.", {font: "15px Century Gothic",fill: "white"});
    this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

  }
  

  update() 
  {
    this.background.tilePositionX -= 0.1;

    if(this.restart.isDown)
    {
      this.win_music.stop();
      this.scene.stop();
      this.scene.launch('sceneTitle');
    }

  }
}