const DLG_SETUP = [
	{
		text: ["To begin with, let's install Haskell.",
			"First you need to <a href='https://docs.haskellstack.org/en/stable/install_and_upgrade'>install stack</a>.",
			"Just follow the instructions on Stack's website.",
			"Once it is installed, run the command <span class='code'>stack setup</span>.",
			"It will install ghc, which is Haskell's compiler." ],
	},

	{
		action: [['enable_note', 'Setting up Haskell']],
		text: [ "Here's a note with more detailed instructions.",
			"When it's installed, run <span class='code'>stack ghci</span>.",
			"It might take some time to launch the first time, don't worry about it.",
			"GHCi is an interpreter that will evaluate Haskell expressions and show you their value",
			"For instance, you can try typing <span class='code'>2 + 2</span>.",
			"Now, let's write an actual program. With a text editor, create a new file with .hs extension.",
			"In it, write the following code:",
			"<span class='code'>main = putStrLn \"Hello world!\"</span>",
			"You can compile it with <span class='code'>stack ghc -- filename.hs</span>.",
			"You should get an executable that prints ‘Hello world’ to the console.",
		],
	},

	{
		action: [['enable_note', 'Compiling Haskell']],
		text: [ "Right, we're almost ready to start driving the robot.",
			"(which I'm sure you're eager to)",
			"We just have a bit more explaining to do. Please return to GHCi.",
			"So, Haskell is all about functions. Because it's a functional programming language.",
			"To call a function, you just type the function name and then its arguments.",
			"So for example, you can type <span class='code'>div 10 3</span>.",
			"(div is the integer division)",
			"That also works for operators: you can also call operators like this:",
			"<span class='code'>(+) 3 2</span>",
			"And similarly, you can use the infix notation for functions with backquotes:",
			"<span class='code'>10 `div` 3</span>",
			"Finally you can give a name to an expression like this:",
			"<span class='code'>name = 32</span>",
			"An expression is anything that has a value in Haskell. Since functions <em>are</em> values, you can even do stuff like that:",
			"<span class='code'>plus = (+)</span>",
			"Once you've given a name to an expression, you can interchangeably use the name instead of the expression in any expression without changing its value.",
		]
	},

	{
		action: [['enable_note', 'Terminology'],
			['enable_term', 'Referential transparency']],

		text: [ "This is called <strong>referential transparency</strong> by the way.",
			"So basically, that's what a haskell program does, it defines expressions.",
			"The expression that has the name ‘main’ should contain a value that corresponds to the action performed by the Haskell program.",
		]
	},

	{
		action: [['enable_note', 'Haskell expressions']],

		text: [ "Anyway, here's a note about expressions.",
			"Read it and play with GHCi for a while, then call me when you're ready to move on to the next part.",
			"You'll finally be able to play with the robot!",
		],

		answers: {
			"OK, I'm ready": [],
		},
	},

	{
		action: [['next_level']],
	},
];
