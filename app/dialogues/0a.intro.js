const DLG_INTRO = [
	{
		className: 'system_message',
		text: ["Incoming telechrone communication. Click to synchronise to next message."],
	},

	{
		text: ["Is this working? Hello? Can you hear me?"],

		answers: {
			"yes": [
				{ "text": ["Hah! I did it!"] }
			],

			"no": [
				{ text: ["Come on! What did I miss this time? Why won't it work?",
					"Wait a minute...",
					"Alright, you almost got me there, smartarse."] }
			]
		}
	},

	{
		text: ["Anyways, I need your help.",
			"I was visiting this underground lab, and I got stuck.",
			"Hang on, I'll show you the CCTV..."]
	},

	{
		action: [["enable_canvas"]],
		text: ["There we go!"],
	},

	{
		character_frame: 'waving',
		text: ["Hello!"],
	},

	{
		text:["So, I think I touched something I wasn't supposed to touch and the door just locked itself."],

		answers: {
			"Was it the lever? Can't you pull it back to its original position?": [
				{text: ["Yes it was, but now it's stuck. I can't move it."]}
			],

			"Well played...": [
				{text: ["Oi! Like <em>you</em> wouldn't pull a lever to see what it does!"]}
			]
		}
	},

	{
		text: ["So, I can't call for help because this lab's abandonned.",
			"But I had a robot with me, it should be in the room right next to me.",
			"I can't pilot it from here but you should be able to.",
			"So if you could open the door for me, that would be very much appreciated."],

		answers: {
			"You can't pilot the robot but I can?": []
		}
	},

	{
		text: ["Right. The walls don't allow electromagnetic waves through.",
			"The reason I can communicate with you is because I'm doing it from the future.",
			"So basically, I'm telling my communicator to send messages to you after I get out,",
			"and it has received your answers before I was in.",
			"The good news is, since it works, that means I will get out eventually.",
			"I mean, I will probably get out. Time travel's complicated."]
	},

	{
		character_frame: 'thinking',
		text:["Technically, it just means my <em>communicator</em> will get out, and even that's not certain."]
	},

	{
		text: ["Anyways, you'll have to program my robot from there. Or from <em>then</em>, I guess.",
			"We'll just have to find a programming language that existed in your time...",
			"Got it! Apparently Haskell is the only language that survived from your era."]
	},

	{
		character_frame: 'arms_up',
		text: ["Alright! I'm going to teach you Haskell!"]
	},

	{
		action: [['enable_notes']],
		text: ["I'll put notes down there for you to read if you forget something.",
		       "Let's get started!"],
	},

	{
		action: [['next_level']],
	},
]
