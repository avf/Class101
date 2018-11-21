class RobotRoom extends Phaser.Scene {
	constructor() {
		super('RobotRoom');
	}

	create() {
	}

	load_room(room) {
		const map = this.make.tilemap({ key: room.map });
		const tileset = map.addTilesetImage('roguelike', 'roguelike');

		map.createStaticLayer('Ground', tileset, 0, 0);
		map.createStaticLayer('Furniture', tileset, 0, 0);
		map.createStaticLayer('Objects', tileset, 0, 0);

		this.robot = this.add.sprite(room.spawn.x * 16 + 16,
			room.spawn.y * 16 + 16,
			'robot');
		this.robot.setScale(0.5);

		this.anims.create({
			key: 'walking',
			frames: this.anims.generateFrameNumbers('robot', {start: 0, end: 4}),
			frameRate: 10,
		});

		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.setZoom(4.0);
	}

	on_enable() {
		console.log("RobotRoom: enable");
	}

	on_disable() {
		console.log("RobotRoom: disable");
	}
}
