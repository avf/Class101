var portNumber = 8000;

var config = {
	type: Phaser.AUTO,
	width:  800,
	height: 600,

	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

var msgText;

function preload()
{
}

function create()
{
	msgText = this.add.text(16, 16, "", {fontSize: '32px', fill: '#fff'});

	var socket = new WebSocket("ws://localhost:" + portNumber);
	socket.onopen = function() {
		console.log("Connected.");
	};
	socket.onmessage = function(e) {
		msgText.setText("Message received: " + e.data);
	};
	socket.onclose = function() {
		console.log("End connexion");
	};
}

function update()
{
}
