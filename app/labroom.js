class LabRoom extends Phaser.Scene {
	constructor() {
		super('LabRoom');
	}

	preload() {
	}

	create() {
		const map = this.make.tilemap({ key: 'labMap' });
		const tileset = map.addTilesetImage('roguelike', 'roguelike');

		map.createStaticLayer('Ground', tileset, 0, 0);
		map.createStaticLayer('Furniture', tileset, 0, 0);
		map.createStaticLayer('Objects', tileset, 0, 0);

		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.setZoom(4.0);

		this.character = this.add.sprite(CHARACTER.spawn.x * 16 + 9,
			                             CHARACTER.spawn.y * 16 + 10,
			                             'character');
		this.character.setFrame(CHARACTER.frame.idle_front);
	}

	set_character_frame(frame) {
		this.character.setFrame(frame);
	}

	on_enable() {
		console.log("LabRoom: enable");
	}

	on_disable() {
		console.log("LabRoom: disable");
	}
}
