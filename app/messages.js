class Messages
{
	constructor(game) {
		this.game     = game;
		this.element  = document.getElementById('messages');
		this.canvas   = document.getElementsByTagName('canvas')[0];
		this.messages = [];
		this.running  = false;
		this.current_node = { text: [] };
	}

	add_messages(msg) {
		if(this.messages.length > 0) {
			this.messages = this.messages.concat(msg);
		} else {
			this.messages = msg;
			this.current_node = this.messages.shift();
			this.run();
		}
	}

	run() {
		this.running = true;

		if(this.current_node.text.length > 0) {
			let msg = document.createElement('div');

			if(typeof this.current_node.className !== 'undefined') {
				msg.className = this.current_node.className;
			} else {
				msg.className = 'character_message';
			}

			msg.innerHTML = this.current_node.text.shift();

			this.element.appendChild(msg);
			this.element.scrollTop = this.element.scrollHeight;

			this.element.onclick = () => {};

			if(this.current_node.text.length === 0 && typeof this.current_node.answers !== 'undefined') {
				let answers = this.current_node.answers;
				Object.keys(answers).forEach((answer) => {
					let answerElem = document.createElement('div');
					answerElem.id = answer;
					answerElem.className = 'answer';
					answerElem.innerHTML = answer;

					this.element.appendChild(answerElem);
					this.element.scrollTop = this.element.scrollHeight;

					answerElem.onclick = () => {
						this.messages = answers[answer].concat(this.messages);

						Object.keys(answers).forEach(
							(answer) => this.element.removeChild(document.getElementById(answer))
						);

						let element = document.createElement('div');
						element.className = 'user_message';
						element.innerHTML = answer;

						this.element.appendChild(element);
						this.element.scrollTop = this.element.scrollHeight;

						this.element.onclick = () => this.run();
					};
				});
			} else {
				this.element.onclick = () => this.run();
			}
		} else {
			if(this.messages.length === 0) {
				this.running = false;
				return;
			}

			this.current_node = this.messages.shift();

			if(typeof this.current_node.action !== 'undefined') {
				this.perform_action(this.current_node.action);
			}

			if(typeof this.current_node.character_frame !== 'undefined') {
				this.game.set_character_frame(character.frame[this.current_node.character_frame]);
			} else {
				this.game.set_character_frame(character.frame.idle_front);
			}

			this.run();
		}
	}

	perform_action(action) {
		switch(action[0]) {
			case "disable_canvas":
				this.canvas.style.display = 'none';
				break;

			case "enable_canvas":
				this.canvas.style.display = 'block';
				break;
		}
	}
}
