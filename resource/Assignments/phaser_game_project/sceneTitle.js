class sceneTitle extends Phaser.Scene {
  constructor() {
      super('sceneTitle');
  }
  preload()
  {
    this.load.audio("intro_music", ["resource/Assignments/phaser_game_project/gameAssets/intro_music.mp3"]);

    this.load.image("background", "resource/Assignments/phaser_game_project/gameAssets/background.png");
    this.load.image("titleCard", "resource/Assignments/phaser_game_project/gameAssets/title_screen/title.png");
    this.load.image("playButton", "resource/Assignments/phaser_game_project/gameAssets/title_screen/playButton.png");
    this.load.image("storyButton", "resource/Assignments/phaser_game_project/gameAssets/title_screen/storyButton.png");
    
    this.load.image("go-back", "resource/Assignments/phaser_game_project/gameAssets/title_screen/go-back.png");



    this.load.tilemapTiledJSON("title", "resource/Assignments/phaser_game_project/gameAssets/tilemap/title.json");
    this.load.image("tiles", "resource/Assignments/phaser_game_project/gameAssets/tileset/tileset.png");

    this.load.atlas("walkSprite", "resource/Assignments/phaser_game_project/gameAssets/player/playerWalk.png", 
    "resource/Assignments/phaser_game_project/gameAssets/player/playerWalk.json");

    this.load.atlas("coinSprite", "resource/Assignments/phaser_game_project/gameAssets/coin/coin.png", 
    "resource/Assignments/phaser_game_project/gameAssets/coin/coin.json");

    let loadingBar = this.add.graphics({
      fillStyle:{
        color: 0xffffff
      }
    });

    this.load.on("progress", (percent)=>{
      loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width*percent, 50);
    });

  }
  create() {
    this.background = this.add.tileSprite(game.renderer.width/2, game.renderer.height/2, game.renderer.width, game.renderer.height, "background");
    this.background_music = this.sound.add("intro_music", { loop: true });
    this.background_music.play();

    this.add.image((this.game.renderer.width/4), 100,'titleCard').setOrigin(0, 0);
    

    const map = this.make.tilemap({ key: 'title' });
    const tileset = map.addTilesetImage('platformTileset', 'tiles');

    this.player = this.add.sprite(this.game.renderer.width/2, 360, 'walkSprite');
    map.createLayer('floor', tileset, 0, 0);


    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('walkSprite', {start: 0, end: 8, zeroPad: 3, prefix: 'tile', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'coinMove',
      frames: this.anims.generateFrameNames('coinSprite', {start: 1, end: 6, zeroPad: 0, prefix: 'CoinMoving', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    });

    this.player.play('walk');


    //Play Button
    let playButton = this.add.image((this.game.renderer.width/4)+25, 400,'playButton').setOrigin(0, 0);
    playButton.setInteractive();

    playButton.on("pointerover",()=>{

      coin.setVisible(true);
      coin.x = playButton.x - 25
      coin.y = playButton.y + 25;
    });

    playButton.on("pointerout",()=>{
      coin.setVisible(false);
    });

    playButton.on("pointerup",()=>{
      this.scene.stop();
      this.background_music.stop();
      this.scene.start('sceneMain');
    });


    //Story Button
    let storyButton = this.add.image((this.game.renderer.width/2)-45, 500,'storyButton').setOrigin(0, 0);
    storyButton.setInteractive();

    let storyScreen = this.add.graphics({
      fillStyle:{
        color: 0x000000,
        alpha: 0.7
      }
    });

    //Story Screen
    storyScreen.fillRect(0, 0, this.game.renderer.width,this.game.renderer.height);
    storyScreen.setVisible(false);



    storyButton.on("pointerover",()=>{
      coin.setVisible(true);
      coin.x = storyButton.x - 20
      coin.y = storyButton.y + 20;
    });

    storyButton.on("pointerout",()=>{
      coin.setVisible(false);
    });

    storyButton.on("pointerup",()=>{
      this.scene.pause();
      this.scene.launch('sceneStory');
    });


    let coin = this.add.sprite(this.game.renderer.width/2, 360, 'coinSprite');
    coin.play('coinMove');
    coin.setVisible(false);

    this.help = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    
  }
  

  update() {
    this.background.tilePositionX -= 0.1;
    this.player.x += 0.1;

    if(this.player.x > game.renderer.width)
    {
      this.player.x = 0;
    }

    if((this.help.isDown))
    {
      this.scene.pause();
      this.scene.launch('sceneHelp');
    }
    
  }
}
