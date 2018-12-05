class RobotRoom extends Phaser.Scene {
	constructor() {
		super('RobotRoom');
		this.enabled = false;

		this.port = 8000;
		this.socket_timeout = 500;

		this.velocity = 50;
		this.direction = {x: 0, y: -100};
		this.energy = 0;
	}

	update() {
		if(this.energy > 0) {
			this.robot.body.setVelocityX(this.direction.x);
			this.robot.body.setVelocityY(this.direction.y);

			this.robot.anims.play('walking', true);

			this.energy -= 1;

			console.log("-- ", this.energy);
		} else {
			this.robot.body.setVelocityX(0);
			this.robot.body.setVelocityY(0);
			this.robot.anims.pause();
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
				this.start_socket();
		};

		setTimeout(() => {
			if(! this.socket_is_open)
				socket.close();
		}, this.socket_timeout);
	}

	load_room(room) {
		const map = this.make.tilemap({ key: room.map });
		const tileset = map.addTilesetImage('roguelike', 'roguelike');

		const ground    = map.createStaticLayer('Ground', tileset, 0, 0);
		const furniture = map.createStaticLayer('Furniture', tileset, 0, 0);
		const objects   = map.createStaticLayer('Objects', tileset, 0, 0);

		furniture.setCollisionByProperty({ obstacle: true });
		
		this.target = { x: room.spawn.x,
		                y: room.spawn.y };

		this.robot = this.physics.add.sprite(this.target.x, this.target.y, 'robot');
		this.robot.setScale(0.5);

		this.physics.add.collider(this.robot, furniture);

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

		console.log("Moving :");
		console.log("\tEnergy: ", this.energy);
		console.log("\tDirection: ", this.direction.x, this.direction.y);
	}

	process(data) {
		let command = data.split(" ");
		let retval  = "COMMAND_EXECUTED"

		switch(command[0])
		{
			case "move":
				let dx = parseInt(command[1]);
				let dy = parseInt(command[2]);
				this.move(dx, dy);
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

function startSocket()
{
}
