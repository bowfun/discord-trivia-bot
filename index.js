/* eslint-disable brace-style */
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ReactionUserManager } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

try {
	const clues = JSON.parse(fs.readFileSync('config.json', 'utf8')).trivia;
	for (const clueData of clues) {
		if (clueData.id === 0) {
			console.error('One or more of your questions has an ID of 0. The bot will disable until this is fixed.');
			client.destroy;
			return;
		}
	}
} catch (err) {
	console.error('There was an error loading your config.json file. Bot will disable until this is fixed.');
	client.destroy;
	return;
}

client.login(token);