/* eslint-disable brace-style */
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { startQuiz, endQuiz } = require('../../active-question');

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
				.setDescription('The maximum amount of winners in a game (after which the game ends).')),
	async execute(interaction) {
		const rawData = fs.readFileSync('./config.json');
		const jsonData = JSON.parse(rawData).trivia;

		const triviaID = interaction.options.getInteger('trivia-id');
		const maxWinners = interaction.options.getInteger('max-winners');

		for (const question of jsonData) {
			if (triviaID === question.id) {
				endQuiz();
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