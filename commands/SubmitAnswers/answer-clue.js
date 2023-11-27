const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('answer-clue')
		.setDescription('Answer a clue.')
		.addIntegerOption(option =>
			option
				.setName('clue-number')
				.setDescription('The number of the clue you are answering.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('answer')
				.setRequired(true)
				.setDescription('The answer to the clue.')),
	async execute(interaction) {
		// Read the JSON file
		const rawData = await fs.readFileSync('./config.json');
		const jsonData = JSON.parse(rawData).clues;
		console.log(jsonData);

		const clueID = interaction.options.getInteger('clue-number');
		const answer = interaction.options.getString('answer');
		if (clueID === 1) {
			if (answer === '7') {
				await interaction.reply({ content: 'Correct answer! You recieved the Clue 1 Solved role.', ephemeral: true });
				const role = interaction.guild.roles.cache.get('1151892711008370728');
				await interaction.member.roles.add(role);
			}
			else {
				await interaction.reply({ content: 'Incorrect answer for clue ' + clueID + '.', ephemeral: true });
			}
		}
		else if (clueID === 2) {
			if (answer === '5.49') {
				await interaction.reply({ content: 'Correct answer! You recieved the Clue 2 Solved role.', ephemeral: true });
				const role = interaction.guild.roles.cache.get('1151892783511126067');
				await interaction.member.roles.add(role);
			}
			else {
				await interaction.reply({ content: 'Incorrect answer for clue ' + clueID + '.', ephemeral: true });
			}
		}
		else if (clueID === 3) {
			if (answer === '1569') {
				await interaction.reply({ content: 'Correct answer! You recieved the Clue 3 Solved role.', ephemeral: true });
				const role = interaction.guild.roles.cache.get('1151892849755967610');
				await interaction.member.roles.add(role);
			}
			else {
				await interaction.reply({ content: 'Incorrect answer for clue ' + clueID + '.', ephemeral: true });
			}
		}
		else if (clueID === 4) {
			if (answer === 'INTHEDEPTHS') {
				await interaction.reply({ content: 'Correct answer! You recieved the Clue 4 Solved role.', ephemeral: true });
				const role = interaction.guild.roles.cache.get('1151892888762974209');
				await interaction.member.roles.add(role);
			}
			else {
				await interaction.reply({ content: 'Incorrect answer for clue ' + clueID + '.', ephemeral: true });
			}
		}
		else {
			await interaction.reply({ content: 'Clue could not be found.', ephemeral: true });
		}
	},
};