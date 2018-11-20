class App extends Phaser.Scene {
	constructor() {
		super('App');
		this.messages;
		this.notes;
		this.level = 0;
	}

	preload() {
	}

	create() {
		this.scene.launch('LabRoom');

		this.messages = new Messages(this)
		this.notes = new Notes();

		this.load_level(this.level);
	}

	next_level() {
		this.level++;
		this.load_level(this.level);
	}

	load_level(level) {
		this.level = level;

		this.messages.clear();
		this.messages.add_messages(LEVELS[level].dialogue);

		LEVELS[level].notes.forEach(note => this.enable_note(note));
		LEVELS[level].terms.forEach(term => this.enable_term(term));

		if(LEVELS[level].canvasVisible) {
			document.getElementsByTagName('canvas')[0].style.display = 'block';
		}

		if(LEVELS[level].notesVisible) {
			document.getElementById('notes').style.visibility = 'visible';
		}
	}

	set_character_frame(frame) {
		this.scene.get('LabRoom').set_character_frame(frame);
	}

	enable_note(note_name) {
		this.notes.enable_tab(note_name);
	}

	enable_term(term_name) {
		this.notes.enable_term(term_name);
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
	parent: 'game',
	scene: [App, LabRoom],
};

let game = new Phaser.Game(config);
