class App extends Phaser.Scene {
	constructor() {
		super('App');
		this.level = 0;
	}

	preload() {
		this.load.image('roguelike', "assets/tiles/roguelike.png");

		this.load.spritesheet('character', "assets/img/character.png", {
			frameWidth: 18,
			frameHeight: 20,
		});

		this.load.spritesheet('robot', "assets/img/robot.png", {
			frameWidth: 32,
			frameHeight: 32,
		});

		this.load.tilemapTiledJSON('labMap', "assets/levels/labroom.json");
		this.load.tilemapTiledJSON('level1', "assets/levels/level1.json");
	}

	create() {
		this.messages = new Messages(this)
		this.notes = new Notes();

		this.load_level(this.level);

		this.scene.launch('LabRoom');
		this.currentScene = this.scene.get('LabRoom');
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

		if(typeof LEVELS[level].room !== "undefined") {
			this.scene.launch('RobotRoom');
			this.scene.get('RobotRoom').load_room(LEVELS[level].room);
			this.scene.setVisible(false, this.scene.get('RobotRoom'));
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

	set_scene(scene) {
		this.currentScene.on_disable();
		this.scene.setVisible(false, this.currentScene);

		this.currentScene = this.scene.get(scene);

		this.scene.setVisible(true, this.currentScene);
		this.currentScene.on_enable();
	}
}

let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 640,
	pixelArt: true,
	parent: 'game',
	scene: [App, RobotRoom, LabRoom],
};

let game = new Phaser.Game(config);
