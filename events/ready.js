const { Events } = require('discord.js');
const DeployCommands = require('../deploy-commands');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const Guilds = client.guilds.cache.map(guild => guild.id);
		for (const guildData of Guilds) {
			DeployCommands(guildData);
		}
	},
};