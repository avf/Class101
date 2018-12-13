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
			"This is how you install libraries with stack.",
			"Now download my library: <a href='assets/robocom.hs'>robocom.hs</a>",
		],

		answers: {
			"Done!": [
				{text: ["Excellent!"]},
			],

			"Wait, you can send me files? Why don't you send the solution directly?": [
				{ text: [
					"I could, but how would that be fun for you?",
					"Consider it my way of saying thanks: you help me and in exchange I teach you Haskell.",
				] },
			]
		}
	},

	{
		text: [
			"Alright, let me see where the robot is...",

			"OK. Here's the program you should write:",

			  "<div class='code'>"
			+ "import Robocom<br>"
			+ "main = robot_do (robot_move 50 (-50))"
			+ "</div>",

			"I'll assume you saved it into <span class='code'>main.hs</span>.",
			"To compile it, run <span class='code'>stack ghc -- main.hs robocom.hs</span>",
			"Try and run it, I'll wait!",
		],
	},

	{
		action: [['enable_note', 'Piloting the robot']],

		wait_cond: robot => {
			console.log("cond!", robot.x, robot.y);
			return (robot.x != 32) || (robot.y != 112);
		},

		text: [
			"Great, you've done it!",
			"So, let's explain that code.",
			"The first line imports my Robocom library I just sent you.",
			"It makes the robot-piloting functions available to use in your code.",
			"Then, we declare the main action.",
			"First, let's explain the <span class='code'>robot_do</span> function.",
			"This is a function that takes one argument, which is a robot action, and returns an IO action.",
			"So it converts the robot action into an IO action.",
			"That's because main has to be an IO action; robot actions have a different type.",
			"The one argument of <span class='code'>robot_do</span> is what's inside the parentheses.",
			"We put parentheses around to make it clear to Haskell that it's only one argument.",
			"If the parentheses weren't there, it would interpret it as giving three parameters to"
			+ "<span class='code'>robot_do</span>: the function <span class='code'>robot_move</span>, 50 and (-50).",
			"You can try removing the parenthesis to see the error the compiler gives you.",
			"It's a bit dense, but it should say somewhere that <span class='code'>robot_do</span> was applied to three arguments instead of one.",
			"Now, let's see what we have inside the parenthesis.",
			"<span class='code'>robot_move</span> is a function that takes two Int values and returns a robot command.",
			"It's this return value that we pass on to <span class='code'>robot_do</span>",
			"The two ints are respectively the displacement to the right, and the downward displacement.",
			"Note that there are parenthesis around -50: the operator (-) normally takes two arguments, so we have to isolate it to make sure it's the unary operator that's used.",
			"There is another, in my opinion cleaner way of writing this program. Here it is:",

			  "<div class='code'>"
			+ "import Robocom<br>"
			+ "main = robot_do $ robot_move 50 (-50)"
			+ "</div>",

			"The $ operator is the 'apply' operator. It takes two argument: a function and a value, and it applies the function to the value.",
			"It has the lowest priority, so everything on its left and right is calculated before the applying takes place.",
			"This helps clear parenthesis away.",
			"Now let's have a little exercise. The robot command <span class='code'>robot_printPosition</span> prints the current position of the robot.",
			"I want you to move the robot to the position x = 42, y = 42.",
		],

		answers: {
			"OK, I'm doing it.": [
				{text: []},
			],

			"Could you give me a hint?": [
				{
					text: ["You'll have to make two programs: one program to get the current position, then one to move from that position to the one I gave you."],
					answers: {
						"OK, I'm doing it.": [
							{text: []},
						],

						"I still don't think I can do it. What do I do?": [
							{
								text: [
									"OK, here's what your main should look like for the first program:",
									"<span class='code'>main = robot_do robot_printPosition</span>",
									"The second program should be like the one I gave you, but with different numbers, so that it goes to x=42, y=42.",
								]
							},
						],
					}
				},
			],
		},
	},

	{
		wait_cond: robot => (robot.x == 42) && (robot.y == 42),

		text: [
			"Hah! You solved my little riddle! Now let's go to the next level",
		],
	},

	{
		action: [['next_level']],
	},
];
