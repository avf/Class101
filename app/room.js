const DOOR_OPEN_LEFT    = 489;
const DOOR_OPEN_RIGHT   = 490;
const DOOR_CLOSED_LEFT  = 379;
const DOOR_CLOSED_RIGHT = 380;
const DOOR_LOCKED_LEFT  = 322;
const DOOR_LOCKED_RIGHT = 323;

class RobotRoom extends Phaser.Scene {
	constructor() {
		super('RobotRoom');
		this.enabled = false;

		this.port = 8000;
		this.socket_timeout = 1000;

		this.velocity = 50;
		this.direction = {x: 0, y: -100};
		this.energy = 0;

		this.interact_range = 64;
		this.doors = [];
	}

	update(time, dt) {
		if(this.energy > 0) {
			this.robot.body.setVelocityX(this.direction.x);
			this.robot.body.setVelocityY(this.direction.y);

			this.robot.anims.play('walking', true);

			this.energy -= (this.velocity * dt)/1000.0;

			if(this.energy <= 0.0) {
				this.robot.body.setVelocityX(0);
				this.robot.body.setVelocityY(0);
				this.robot.anims.pause();

				this.robot.x = Math.round(this.robot.x);
				this.robot.y = Math.round(this.robot.y);
			}
		}
	}

	start_socket() {
		let socket = new WebSocket("ws://localhost:" + this.port);

		socket.onopen = e => {
			this.socket_is_open = true;
		}

		socket.onmessage = e => {
			if(e.data == "CLOSE_CONNECTION")
				socket.close();
			else
				socket.send(this.process(e.data));
		};

		socket.onclose = () => {
			this.socket_is_open = false;

			if(this.enabled)
				setTimeout(() => this.start_socket(), 100);
		};

		setTimeout(() => {
			if(! this.socket_is_open)
				socket.close();
		}, this.socket_timeout);
	}

	load_room(room) {
		const map = this.make.tilemap({ key: room });
		const tileset = map.addTilesetImage('roguelike', 'roguelike');

		const ground  = map.createStaticLayer('Ground', tileset, 0, 0);
		const layer1  = map.createStaticLayer('Layer1', tileset, 0, 0);
		const layer2  = map.createDynamicLayer('Layer2', tileset, 0, 0);

		const spawn = map.findObject('Objects', object => object.name == 'spawn');

		this.doors = find_doors(layer2);

		this.robot = this.physics.add.sprite(spawn.x, spawn.y, 'robot');
		this.robot.setScale(0.5);

		layer1.setCollisionByProperty({ obstacle: true });
		this.physics.add.collider(this.robot, layer1);

		layer2.setCollisionByProperty({ obstacle: true });
		this.physics.add.collider(this.robot, layer2);

		this.anims.create({
			key: 'walking',
			frames: this.anims.generateFrameNumbers('robot', {start: 0, end: 4}),
			frameRate: 20,
			loop: true,
		});

		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.setZoom(4.0);
	}

	move(dx, dy) {
		let norm = Math.sqrt(dx*dx + dy*dy);

		this.direction = { x: this.velocity * dx / norm,
		                   y: this.velocity * dy / norm };
		this.energy = norm;
	}

	process(data) {
		let command = data.split(" ");
		let retval  = "COMMAND_EXECUTED"

		let closest_door = min(this.doors, door => dist(door, this.robot));
		switch(command[0])
		{
			case "move":
				let dx = parseInt(command[1]);
				let dy = parseInt(command[2]);
				this.move(dx, dy);
				break;

			case "get_position":
				retval = this.robot.x.toString() + " "
				       + this.robot.y.toString();
				break;

			case "open_door":
				if(closest_door.locked)
					retval = "(;_;) Can't open door: the door is locked.";
				else if(dist(closest_door, this.robot) > this.interact_range)
					retval = "(;_;) Can't open door: no door in range";
				else
					open_door(closest_door);

				break;

			case "close_door":
				if(dist(closest_door, this.robot) <= this.interact_range)
					close_door(closest_door);
				else
					retval = "(;_;) Can't close door: no door in range";

				break;
		}

		return retval;
	}

	on_enable() {
		this.enabled = true;
		this.start_socket();
	}

	on_disable() {
		this.enabled = false;
	}
}

function find_doors(mapLayer) {
	let doors = [];

	mapLayer.forEachTile(tile => {
		if(tile.properties.door && tile.properties.left) {
			let ldoor = tile;
			let rdoor = mapLayer.findTile(t => (t.properties.door && !t.properties.left),
										  {},
										  tile.x - 1, tile.y -1, 3, 3);

			doors.push({
				mapLayer: mapLayer,

				left: ldoor,
				right: rdoor,
				open: tile.properties.open,
				locked: tile.properties.locked,

				x: (ldoor.pixelX + rdoor.pixelX) / 2,
				y: (ldoor.pixelY + rdoor.pixelY) / 2,
			});
		}
	});

	return doors;
}

function open_door(door) {
	door.open = true;
	door.locked = false;

	door.left.properties.open = true;
	door.right.properties.open = false;

	door.left.properties.locked = true;
	door.right.properties.locked = false;

	door.left.properties.obstacle = false;
	door.right.properties.obstacle = false;

	door.left.index = DOOR_OPEN_LEFT;
	door.right.index = DOOR_OPEN_RIGHT;

	door.mapLayer.putTileAt(door.left, door.left.x, door.left.y);
	door.mapLayer.putTileAt(door.right, door.right.x, door.right.y);
}

function close_door(door) {
	door.open = false;
	door.locked = false;

	door.left.properties.open = false;
	door.right.properties.open = false;

	door.left.properties.locked = false;
	door.right.properties.locked = false;

	door.left.properties.obstacle = true;
	door.right.properties.obstacle = true;

	door.left.index = DOOR_CLOSED_LEFT;
	door.right.index = DOOR_CLOSED_RIGHT;

	door.mapLayer.putTileAt(door.left, door.left.x, door.left.y);
	door.mapLayer.putTileAt(door.right, door.right.x, door.right.y);
}

function lock_door(door) {
	door.open = false;
	door.locked = true;

	door.left.properties.open = false;
	door.right.properties.open = false;

	door.left.properties.locked = true;
	door.right.properties.locked = true;

	door.left.properties.obstacle = true;
	door.right.properties.obstacle = true;

	door.left.index = DOOR_LOCKED_LEFT;
	door.right.index = DOOR_LOCKED_RIGHT;

	door.mapLayer.putTileAt(door.left, door.left.x, door.left.y);
	door.mapLayer.putTileAt(door.right, door.right.x, door.right.y);
}

function dist(a, b) {
	return Math.sqrt( Math.pow(a.x - b.x, 2.0) + Math.pow(a.y - b.y, 2.0) );
}

function min(list, metric) {
	return list.reduce( (x, xmin) => metric(x) < metric(xmin) ? x : xmin );
}
