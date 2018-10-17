var PORT_NUMBER = 8000;
var TIMEOUT     = 200;

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
var socket = null;
var socket_is_open = false;

var msgText;
var textAttempts;
var nattempts = 0;

function startSocket()
{
	socket = new WebSocket("ws://localhost:" + PORT_NUMBER);

	socket.onopen = function(e) {
		socket_is_open = true;
	}

	socket.onmessage = function(e) {
		if(e.data == "CLOSE_CONNECTION")
			socket.close();
		else
			msgText.setText("Message received: " + e.data);
	};

	socket.onclose = function() {
		socket_is_open = false;
		startSocket();

		nattempts ++;
		textAttempts.setText(nattempts);
	};

	setTimeout(function() {
		if(! socket_is_open)
			socket.close();
	}, TIMEOUT);
}

function preload()
{
	startSocket()
}

function create()
{
	msgText = this.add.text(16, 16, "", {fontSize: '32px', fill: '#fff'});
	textAttempts = this.add.text(16, 64, "0", {fontSize: '32px', fill: '#fff'});
}

function update()
{
}
