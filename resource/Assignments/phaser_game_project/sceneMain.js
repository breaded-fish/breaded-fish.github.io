class sceneMain extends Phaser.Scene {
  constructor() {
      super('sceneMain');
  }
  preload()
  {
    //Loads our images and sounds
    this.load.image("background", "resource/Assignments/phaser_game_project/gameAssets/background.png");

    this.load.image("tiles", "resource/Assignments/phaser_game_project/gameAssets/tileset/tileset.png");
    


    this.load.tilemapTiledJSON("map", "resource/Assignments/phaser_game_project/gameAssets/tilemap/map1.json");

    this.load.atlas("walkSprite", "resource/Assignments/phaser_game_project/gameAssets/player/playerWalk.png", 
    "resource/Assignments/phaser_game_project/gameAssets/player/playerWalk.json");

    this.load.atlas("idleSprite", "resource/Assignments/phaser_game_project/gameAssets/player/playerIdle.png", 
    "resource/Assignments/phaser_game_project/gameAssets/player/playerIdle.json");

    this.load.atlas("coinSprite", "resource/Assignments/phaser_game_project/gameAssets/coin/coin.png", 
    "resource/Assignments/phaser_game_project/gameAssets/coin/coin.json");

    this.load.atlas("beeSprite", "resource/Assignments/phaser_game_project/gameAssets/enemy/bee.png", 
    "resource/Assignments/phaser_game_project/gameAssets/enemy/bee.json");

    this.load.audio("background_music", ["resource/Assignments/phaser_game_project/gameAssets/background_music.mp3"]);
    
    this.load.audio("coin_pickup", ["resource/Assignments/phaser_game_project/gameAssets/coin/coin_sound.mp3"]);
    this.load.audio("ow", ["resource/Assignments/phaser_game_project/gameAssets/player/ow.mp3"]);

    this.load.spritesheet("jumpSprite","resource/Assignments/phaser_game_project/gameAssets/player/playerJump.png",{
      frameHeight: 30,
      frameWidth: 40
      });
  
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
    this.add.image(0, 0,'background').setOrigin(0, 0);
    this.background_music = this.sound.add("background_music", { loop: true });
    
    this.background_music.play();
    
    //Tilemappings
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('platfrom_tileset', 'tiles');

    const platforms = map.createLayer('Platform', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);

    map.createLayer('Decoration', tileset, 0, 0);
    map.createLayer('Grass', tileset, 0, 0);


    //Coin code
    //Animations for Coins
    this.anims.create({
      key: 'coinMove',
      frames: this.anims.generateFrameNames('coinSprite', {start: 1, end: 6, zeroPad: 0, prefix: 'CoinMoving', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    });

    const coin = map.getObjectLayer('coins')['objects'];
    let coins = this.physics.add.staticGroup();
    coin.forEach(object => {
      let obj = coins.create(object.x + 15, object.y - 20, "coinSprite"); 
         obj.setScale(0.6);
         obj.setOrigin(0.80);
         obj.setBounceX(0.5);
         obj.body.width = object.width; 
         obj.body.height = object.height;
         obj.play('coinMove');
    });

    this.coin_sound = this.sound.add("coin_pickup", { loop: false });

    this.anims.create({
      key: 'beeMove',
      frames: this.anims.generateFrameNames('beeSprite', {start: 0, end: 3, zeroPad: 0, prefix: 'frame', suffix: '.gif'}),
      frameRate: 10,
      repeat: -1
    });

    //bee_right code
    const bee_right = map.getObjectLayer('enemies-right')['objects'];
    let direction = 20;
    this.bees_right = this.physics.add.group();
    bee_right.forEach(object => {
      let obj = this.bees_right.create(object.x + 20, object.y - 30, "beeSprite"); 
         obj.setScale(0.8);
         obj.setOrigin(0.80);
         obj.body.width = object.width; 
         obj.body.height = object.height;
         obj.play('beeMove');
         obj.setCollideWorldBounds(true);
         obj.setVelocityX(direction);
         obj.setFlipX(true);
         obj.body.onWorldBounds = true;
    });

    this.physics.add.collider(this.bees_right, platforms, function(){
      bees_right.setVelocityX(direction);
      bees_right.getChildren().forEach(object =>{
        object.setFlipX(true);
      });
    }, null, this);

    let bees_right = this.bees_right;
    
    this.physics.world.on('worldbounds', function(){
      if(direction > 0)
      {
        bees_right.setVelocityX(direction * -1);
        bees_right.getChildren().forEach(object =>{
          object.setFlipX(false);
        });
      }
    });


    //bee_left code
    const bee_left = map.getObjectLayer('enemies-left')['objects'];
    let direction2 = -20;
    this.bees_left = this.physics.add.group();
    bee_left.forEach(object => {
      let obj = this.bees_left.create(object.x + 20, object.y - 30, "beeSprite"); 
         obj.setScale(0.8);
         obj.setOrigin(0.80);
         obj.body.width = object.width; 
         obj.body.height = object.height;
         obj.play('beeMove');
         obj.setCollideWorldBounds(true);
         obj.setVelocityX(direction2);
         obj.body.onWorldBounds = true;
    });

    this.physics.add.collider(this.bees_left , platforms, function(){
      bees_left.setVelocityX(direction2);
      bees_left.getChildren().forEach(object =>{
        object.setFlipX(false);
      });
    }, null, this);

    let bees_left = this.bees_left;
    
    this.physics.world.on('worldbounds', function(){
      if(direction2 < 0)
      {
        bees_left.setVelocityX(direction2 * -1);
        bees_left.getChildren().forEach(object =>{
          object.setFlipX(true);
        });
      }
    });
    
    //Player physics
    this.player = this.physics.add.sprite(-10, 550, 'idleSprite');
    this.player.setCollideWorldBounds(true);
    this.player.setGravityY(800);
    this.player.setBounceY(0.1);
    this.player.setVelocityX(0);
    this.physics.add.collider(this.player, platforms);

    this.physics.add.overlap(this.player, coins, touchCoin, null, this);

    this.ow_sound = this.sound.add("ow", { loop: false });
    this.physics.add.overlap(this.player, this.bees_right, touchBee, null, this);
    this.physics.add.overlap(this.player, this.bees_left, touchBee, null, this);
  
    //Animations for player
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('walkSprite', {start: 0, end: 8, zeroPad: 3, prefix: 'tile', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('idleSprite', {start: 0, end: 3, zeroPad: 3, prefix: 'tile', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'jumpSprite'}],
      frameRate: 1,
    });

    //Score
    this.score = 0;
    this.scoreLabel = this.add.text(10, -150, "Score: " + this.score, {
      font: "25px Arial",
      fill: "black"
    });

    this.lives = 3;
    this.livesLabel = this.add.text(225, -150, "Lives: " + this.lives, {
      font: "25px Arial",
      fill: "black"
    });


    //Controls
    this.cursors = this.input.keyboard.createCursorKeys();

    this.wasd = this.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});

    this.help = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  }
  
  update() {
    // Control the player with left or right keys
    if (this.wasd.left.isDown || this.cursors.left.isDown) 
    {
      this.player.setVelocityX(-100);
      if (this.player.body.onFloor()) 
      {
       this.player.play('walk', true);
      }
    } 
    else if (this.wasd.right.isDown || this.cursors.right.isDown) 
    {
      this.player.setVelocityX(100);
      if (this.player.body.onFloor()) 
      {
        this.player.play('walk', true);
      }
    } 
    else 
    {
      this.player.setVelocityX(0);

      if (this.player.body.onFloor()) 
      {
        this.player.play('idle', true);
      }
    }

    if ((this.wasd.up.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.setVelocityY(-400);
      this.player.play('jump', true);
    }

    if (this.player.body.velocity.x > 0) 
    {
      this.player.setFlipX(false);
    } 
    else if (this.player.body.velocity.x < 0) 
    {
      this.player.setFlipX(true);
    }

    //Misc.
    if((this.help.isDown))
    {
      this.scene.pause();
      this.scene.launch('sceneHelp');
    }

    if((this.restart.isDown))
    {
      this.outro_music.stop();
      this.background_music.stop();
      this.scene.stop();
      this.scene.launch('sceneTitle');
    }

    if(this.score == 100)
    {
      this.scene.stop();
      this.background_music.stop();
      this.scene.launch('sceneWin');
    }
    //Game Over code
    else if(this.lives == 0)
    {
      this.background_music.stop();
      this.scene.stop();
      this.scene.launch('sceneLose');
    }
  }
}


/*function touchCoin
  -What happens when a player touches a coin*/
function touchCoin(player, coin)
{
  this.coin_sound.play();
  coin.destroy(coin.x, coin.y);

  this.score +=10;
  
  this.scoreLabel.text = "Score: " + this.score;

  return false;
}

function touchBee(player, bees)
{
  this.ow_sound.play();
  this.player.x = -10;
  this.player.y = 550;

  console.log("PAIN");
  this.lives -= 1;
  this.livesLabel.text = "Lives: " + this.lives;

  return false;
}


