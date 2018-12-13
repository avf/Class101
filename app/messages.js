class Messages
{
	constructor(game) {
		this.game     = game;
		this.element  = document.getElementById('messages');
		this.messages = [];
		this.current_node = {};
	}

	add_messages(msgs) {
		if(this.messages.length > 0) {
			this.messages = this.messages.concat(msgs);
		} else {
			this.messages = msgs;
			this.current_node = this.messages.shift();
			this.run();
		}
	}

	run() {
		if(typeof this.current_node.text !== 'undefined' && this.current_node.text.length > 0) {
			let msg = document.createElement('div');

			if(typeof this.current_node.className !== 'undefined') {
				msg.className = this.current_node.className;
			} else {
				msg.className = 'character_message';
			}

			msg.innerHTML = this.current_node.text.shift();

			this.element.appendChild(msg);
			this.element.scrollTop = this.element.scrollHeight;

			this.element.onclick = function(){};

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
				return;
			}

			this.current_node = this.messages.shift();

			if(typeof this.current_node.action !== 'undefined') {
				this.current_node.action.forEach(
					action => this.perform_action(action)
				);
			}

			if(typeof this.current_node.character_frame !== 'undefined') {
				this.game.set_character_frame(CHARACTER.frame[this.current_node.character_frame]);
			} else {
				this.game.set_character_frame(CHARACTER.frame.idle_front);
			}

			if(typeof this.current_node.wait_cond !== 'undefined') {
				this.element.onclick = function() {};
				this.game.wait_cond(this.current_node.wait_cond, () => {
					this.run();
					this.element.onclick = () => this.run();
				});
			} else {
				this.run();
			}
		}
	}

	perform_action(action) {
		switch(action[0]) {
			case "enable_canvas": {
				let canvas   = document.getElementsByTagName('canvas')[0];
				canvas.style.display = 'block';
				break;
			}

			case "enable_notes": {
				document.getElementById('notes').style.visibility = 'visible';
				break;
			}

			case "enable_note": {
				this.game.enable_note(action[1]);
				break;
			}

			case "enable_term": {
				this.game.enable_term(action[1]);
				break;
			}

			case "next_level": {
				this.game.next_level();
				break;
			}

			case "set_scene": {
				this.game.set_scene(action[1]);
				break;
			}
		}
	}

	clear() {
		this.element.innerHTML = "";
		this.messages = [];
		this.current_node = {};
	}
}
