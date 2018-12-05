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
		text: ["blah"],
	},
];
