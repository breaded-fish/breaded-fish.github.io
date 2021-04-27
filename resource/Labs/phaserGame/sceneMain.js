class SceneMain extends Phaser.Scene {
  constructor() {
      super('SceneMain');
  }
  preload()
  {
    //Loads our images and sounds
    this.load.image("sky", "resource/Labs/phaserGame/gameAssets/sky.png");
    this.load.image("cloud", "resource/Labs/phaserGame/gameAssets/cloud.png");
    this.load.image("ground", "resource/Labs/phaserGame/gameAssets/ground.png")
    this.load.image("diamond", "resource/Labs/phaserGame/gameAssets/diamond.png");
    this.load.image("mushroom", "resource/Labs/phaserGame/gameAssets/mushroom.png");
    this.load.image("block", "resource/Labs/phaserGame/gameAssets/block.png")
  }
  create() {

    //Adds images into the scene.
      this.sky = this.add.image(300,400, "sky");
      this.cloud = this.add.image(150,200, "cloud");
      this.cloud2 = this.add.image(400,250, "cloud");
      this.cloud2.setScale(0.75);
      this.cloud3 = this.add.image(300,100, "cloud");
      this.cloud3.setScale(0.8);

      //Ground
      let ground = this.physics.add.sprite(game.config.width/2,game.config.height*.95,"ground");
      ground.displayWidth = game.config.width;
      ground.setImmovable();

      //Mushroom
      let mushroom = this.physics.add.sprite(150, 750, "mushroom");
      mushroom.setScale(.3);
      mushroom.setInteractive();
      mushroom.setCollideWorldBounds(true);

      //Diamond
      let diamond = this.physics.add.sprite(300,750, "diamond");
      diamond.setScale(2.75);
      diamond.setInteractive();
      diamond.setCollideWorldBounds(true);

      //Block
      let block = this.physics.add.sprite(450, 750, "block");
      block.setScale(.2);
      block.setInteractive();
      block.setCollideWorldBounds(true);
      

      //Physics
      this.physics.add.collider(diamond, ground);
      this.physics.add.collider(mushroom, ground);
      this.physics.add.collider(block, ground);

      this.physics.add.collider(block, mushroom);
      this.physics.add.collider(diamond, mushroom);
      this.physics.add.collider(diamond, block);


      //Listeners
      this.input.on('pointerdown', this.startDrag, this);
  }
  

  /*Function startDrag
    Arguments:
    The pointer and targets
    
    Initiates dragging of the specifed objects*/
  startDrag(pointer, targets)
  {
    this.input.off('pointerdown', this.startDrag, this);
    this.dragObj = targets[0];
    this.input.on('pointermove', this.doDrag, this);
    this.input.on('pointerup', this.stopDrag, this);
    targets[0].setGravityY(400);
    targets[0].setBounce(0.2,0.2);
  }

  /*Function doDrag
    Arguments:
    The pointer 
    
    Determines position of the object of the specifed objects*/
  doDrag(pointer)
  {
    if (typeof this.dragObj != "undefined")
    {
      this.dragObj.x = pointer.x;
      this.dragObj.y = pointer.y;
    }
  }

    /*Function startDrag
    Arguments:
    None
    
    Stop dragging of the specifed objects*/
  stopDrag()
  {
    this.input.on('pointerdown', this.startDrag, this);
    this.input.off('pointermove', this.doDrag, this);
    this.input.off('pointerup', this.stopDrag, this);
  }

  update() {}
}