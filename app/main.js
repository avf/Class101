var config = {
	type: Phaser.AUTO,
	width:  800,
	height: 600,
	pixelArt: true, // no aliasing

	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},

	scene: {
		preload: preload,
		create: create,
		update: update
	},
};

const game = new Phaser.Game(config);
let controls;
let robot;
let cursors;
const speed = 200;

function preload()
{
	this.load.image('tiles', "asset/roguelike.png");
	this.load.tilemapTiledJSON('map', "asset/map.json");
	this.load.spritesheet('robot',
		"asset/robot.png",
        {frameWidth: 32, frameHeight: 32, endFrame: 2});
}

function create()
{
	const map     = this.make.tilemap({ key: 'map' });
	const tileset = map.addTilesetImage('roguelike', 'tiles');

	const ground_layer         = map.createStaticLayer('Ground', tileset, 0, 0);
	const objects_layer        = map.createStaticLayer('Objects', tileset, 0, 0);
	const above_ground_layer   = map.createStaticLayer('AboveGround', tileset, 0, 0);
	above_ground_layer.setDepth(10);

	objects_layer.setCollisionByProperty({ obstacle: true });

	robot = this.physics.add.sprite(38, 38, 'robot');

	this.physics.add.collider(robot, objects_layer);

	this.anims.create({ key: 'walking',
		                frames: this.anims.generateFrameNumbers('robot', {start: 0, end: 2}),
		                frameRate: 20 });

	camera = this.cameras.main;
	camera.startFollow(robot);
	camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	camera.setZoom(2.0);

	cursors = this.input.keyboard.createCursorKeys();
}

function update(time, dt)
{
	robot.body.setVelocity(0);

	if(cursors.left.isDown)
		robot.body.setVelocityX(-100);
	else if(cursors.right.isDown)
		robot.body.setVelocityX( 100);

	if(cursors.up.isDown)
		robot.body.setVelocityY(-100);
	else if(cursors.down.isDown)
		robot.body.setVelocityY( 100);

	robot.body.velocity.normalize().scale(speed);

	if(robot.body.velocity.length() == 0.0)
		robot.anims.stop();
	else
		robot.anims.play('walking', true);
}
