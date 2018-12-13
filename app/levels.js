const LEVELS = [
	{
		dialogue: DLG_INTRO,
		canvasVisible: false,
		notesVisible: false,
		notes: [],
		terms: [],
	},

	{
		dialogue: DLG_SETUP,
		canvasVisible: true,
		notesVisible: true,
		notes: [],
		terms: [],
	},

	{
		dialogue: DLG_LEVEL1,
		canvasVisible: true,
		notesVisible: true,
		notes: ['Setting up Haskell', 'Compiling Haskell', 'Haskell expressions', 'Terminology'],
		terms: ['Referential transparency'],
		room: "level1",
	},

	{
		dialogue: DLG_LEVEL2,
		canvasVisible: true,
		notesVisible: true,
		notes: ['Setting up Haskell', 'Compiling Haskell', 'Haskell expressions', 'Terminology', 'Piloting the robot'],
		terms: ['Referential transparency'],
	},
];
