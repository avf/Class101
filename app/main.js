class App extends Phaser.Scene {
	constructor() {
		super('App');
		this.messages;
	}

	preload() {
	}

	create() {
		this.messages = new Messages(this)
		this.messages.add_messages(DLG_INTRO);

		this.scene.launch('LabRoom');
		// this.scene.get('LabRoom').set_dialogue(DLG_INTRO);
	}

	set_character_frame(frame) {
		this.scene.get('LabRoom').set_character_frame(frame);
	}
}

class LabRoom extends Phaser.Scene {
	constructor() {
		super('LabRoom');
	}

	preload() {
		this.load.spritesheet('character', "assets/img/character.png", {
			frameWidth: 18,
			frameHeight: 20,
		});

		this.load.tilemapTiledJSON('labMap', "assets/levels/labroom.json");
		this.load.image('labTiles', "assets/tiles/roguelike.png");
	}

	create() {
		const map = this.make.tilemap({ key: 'labMap' });
		const tileset = map.addTilesetImage('roguelike', 'labTiles');

		map.createStaticLayer('Ground', tileset, 0, 0);
		map.createStaticLayer('Furniture', tileset, 0, 0);
		map.createStaticLayer('Objects', tileset, 0, 0);
		// map.createStaticLayer('AboveGround', tileset, 0, 0);

		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.setZoom(4.0);

		this.character = this.add.sprite(character.spawn.x * 16 + 9,
			                             character.spawn.y * 16 + 10,
			                             'character');
		this.character.setFrame(character.frame.idle_front);
	}

	set_character_frame(frame) {
		this.character.setFrame(frame);
	}
}

let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 640,
	pixelArt: true,
	scene: [App, LabRoom],
};

let game = new Phaser.Game(config);
