/* eslint-disable brace-style */
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { getRunningID, startQuiz, endQuiz } = require('../../active-question');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start-trivia')
		.setDescription('Start a trivia question.')
		.addIntegerOption(option =>
			option
				.setName('trivia-id')
				.setDescription('The ID of the trivia question you are starting.')
				.setRequired(true))
		.addIntegerOption(option =>
			option
				.setName('max-winners')
				.setRequired(true)
				.setDescription('The maximum amount of winners in a game (after which the game ends).'))
		.addBooleanOption(option =>
			option
				.setName('override')
				.setRequired(false)
				.setDescription('Stop the active question (if there is one) and start this one.')),
	async execute(interaction) {
		const rawData = fs.readFileSync('./config.json');
		const jsonData = JSON.parse(rawData).trivia;

		const triviaID = interaction.options.getInteger('trivia-id');
		const maxWinners = interaction.options.getInteger('max-winners');
		const override = interaction.options.getBoolean('override');

		for (const question of jsonData) {
			if (triviaID === question.id) {
				if (getRunningID !== 0 && !override) {
					interaction.reply({ content: 'There is already a question running. Use the override option to cancel the previous question and create this one.', ephemeral: true });
					return;
				}
				if (override) {
					endQuiz();
				}
				if (maxWinners <= 0) {
					interaction.reply({ content: 'Max winners must be 1 or more.', ephemeral: true });
					return;
				}
				startQuiz(question.id, maxWinners);
				interaction.reply({ content: 'Quiz started successfully.', ephemeral: true });
				return;
			}
		}
		await interaction.reply({ content: 'This is an invalid trivia question ID.', ephemeral: true });
	},
};