var config = {
	type: Phaser.AUTO,
	width:  800,
	height: 600,

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
let player;
let cursors;
const speed = 200;

function preload()
{
	this.load.image('tiles', "asset/roguelike.png");
	this.load.tilemapTiledJSON('map', "asset/map.json");
	this.load.spritesheet('player',
		"asset/robot.png",
        {frameWidth: 16, frameHeight: 16, endFrame: 0});
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

	player = this.physics.add.sprite(38, 38, 'player').setScale(1.5);
	this.physics.add.collider(player, objects_layer);

	camera = this.cameras.main;
	camera.startFollow(player);
	camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	camera.setZoom(2.0);

	cursors = this.input.keyboard.createCursorKeys();

	this.add.text(16, 16, "Hello world", {
					  font: '18px monospace',
					  fill: '#ffffff',
					  padding: {x: 20, y: 10},
				  })
	    .setScrollFactor(0.5);
}

function update(time, dt)
{
	player.body.setVelocity(0);

	if(cursors.left.isDown)
		player.body.setVelocityX(-100);
	else if(cursors.right.isDown)
		player.body.setVelocityX( 100);

	if(cursors.up.isDown)
		player.body.setVelocityY(-100);
	else if(cursors.down.isDown)
		player.body.setVelocityY( 100);

	player.body.velocity.normalize().scale(speed);
}
