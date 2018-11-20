class Notes {
	constructor() {
		this.element = document.getElementById('notes');

		this.notes   = Array.from(this.element.children)
		                    .filter(element => element.tagName.toLowerCase() === 'div');
		this.enabled_notes = [];

		this.tabs = document.createElement('div');
		this.tabs.id = 'notes-tabs';
		this.element.appendChild(this.tabs);

		this.content = document.createElement('div');
		this.content.id = 'notes-content';
		this.element.appendChild(this.content);

		this.notes.forEach((note) => {
			this.content.appendChild(note);

			let tab = document.createElement('div');
			tab.innerHTML = note.id;
			tab.style.display = 'none';

			tab.onclick = () => {
				this.notes.forEach( (notei) => {
					if(notei.id === note.id) notei.className = 'shown';
					else                     notei.className = '';
				});

				Array.from(this.tabs.children).forEach(
					tab => tab.className = ''
				);

				tab.className = 'selected';
			};

			this.tabs.appendChild(tab);
		});

		this.terminology = document.getElementById('Terminology');
		Array.from(this.terminology.children).forEach((term) => {
			let title = document.createElement('h2');
			title.innerHTML = term.id;
			term.insertBefore(title, term.firstChild);
		});
	}

	enable_tab(note_name) {
		Array.from(this.tabs.children).forEach(tab => {
			if(tab.innerHTML == note_name)
				tab.style.display = 'block';
		});
	}

	enable_term(term_name) {
		Array.from(this.terminology.children).forEach((term) => {
			if(term.id === term_name) term.className = 'shown';
		});
	}
}
