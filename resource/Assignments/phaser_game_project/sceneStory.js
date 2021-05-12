class sceneStory extends Phaser.Scene {
  constructor() {
      super('sceneStory');
  }
  preload(){
    this.load.image("story1", "resource/Assignments/phaser_game_project/gameAssets/title_screen/story1.png");
    this.load.image("story2", "resource/Assignments/phaser_game_project/gameAssets/title_screen/story2.png");
    this.load.image("story3", "resource/Assignments/phaser_game_project/gameAssets/title_screen/story3.png");
  }
  create() {
    let storyScreen = this.add.graphics({
      fillStyle:{
        color: 0x000000,
        alpha: 0.7
      }
    });
    storyScreen.fillRect(0, 0, this.game.renderer.width,this.game.renderer.height);
    
    this.story1 = this.add.image(100, 100,'story1').setOrigin(0, 0);
    this.story1.setScale(0.5);
    this.story2 =this.add.image(0, 200,'story2').setOrigin(0, 0);
    this.story2.setScale(0.5);
    this.story3 = this.add.image(100, 300,'story3').setOrigin(0, 0);
    this.story3.setScale(0.5);

    this.add.text(this.game.renderer.width/8, 300, "Press any key to continue", {font: "20px Century Gothic",fill: "white"});

    let scene = this.scene;

    this.input.keyboard.on('keydown', function(){
      scene.resume('sceneMain');
      scene.resume('sceneTitle');
      scene.stop()
    });
  }
}