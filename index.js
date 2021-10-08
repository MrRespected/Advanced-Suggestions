const aoijs = require('aoi.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new aoijs.Bot({
	token:'ODc2MDc0OTAzODczMzg4NTY0.YReyVQ.U9u2QpfRE6fVx4hZC4sPo2Sxq_U',
	prefix: ['suggestions', '$getservervar[prefix]']
});
bot.loadCommands(`./Commands/`);
bot.onMessage();
bot.status({
	text: ' to development in progress!',
	type: 'LISTENING',
	time: 12
});
bot.status({
	text: ' to $getvar[s] sent suggestions in $servercount servers!',
	type: 'LISTENING',
	time: 12
});
bot.variables({
	prefix: '?',
	comments: '', //Comments of users
	users: '', //Commented by
	timestamps: '', //Timestamp of user reply
	schannel: '', //Channel where suggestions are sent
	suggester: '', //Person who sent that message
	suggestion: '', //Suggestion that is to be posted
	upvotes: '0', //No.of upvotes in a suggestion
	downvotes: '0', //No.of downvotes in a suggestion
	maybe: '0', //No.of maybe in a suggestion
	voted: '', //User has voted for the suggestion or not
  scount: '',//No.of suggestions
  rmid: '',//Review MessageID
  vr: '',//View reason for a suggestion
  page: '1',//Current page for comments
  sstamp: '',//Timestamp of suggestion sent
  staff_roles: '',//Staff roles for suggestions
  logs: '',//Suggestion logs
  cooldown: '10s',//Cooldown for suggestions
  scomments: 'true',//Comments allowed or not
  dm: 'true',//DM the users after suggestion replied to
  blacklist: 'false',//User blacklisted from suggesting or not
  server: '',//Server in which they are commenting on a suggestion
  attachment: '',//Attachment for that suggestion
  s: '0',//No.of suggestions sent overall
});
bot.onInteractionCreate();
