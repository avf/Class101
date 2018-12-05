const DLG_LEVEL1 = [
	{
		text: ["Right, let me show you the robot."],
	},

	{
		action: [["set_scene", "RobotRoom"]],
		text: ["Here's my robot. Isn't he cute?"],

		answers: {
			'He\'s kind of cute': [
				{text: ["I know right?"]},
			],

			'No.': [
				{text: ["Hey! You don't talk to my robot like that!",
				"It's okay Roberto, don't listen to them, they're stupid."]},
			],

			'I have arachnophobia...': [
				{text: ["What? But he only has six legs!"]},
			],
		},
	},

	{
		text: [
			"But that's not important. What's important is, you're going to pilot it.",
			"I'm going to send you a library of functions to pilot the robot.",
			"But first, you'll have to install another library that takes care of communications.",
			"Type the following command: <span class='code'>stack build websockets</span>",
			"Now download my library: <a href='assets/robocom.hs'>robocom.hs</a>",
		],

		answers: {
			"Done!": [
				{text: ["Perfect!"]},
			],

			"Wait, you can send me files? Why don't you send the solution directly?": [
				{ text: [
					"I could, but where would be the fun for you?",
					"Consider it my way of saying thanks: you help me and in exchange I teach you Haskell.",
				] },
			]
		}
	},

// 	{
// 		action: [["enable_note", "The Robot library"]],
// 	}
];
