/* eslint-disable brace-style */
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('answer-question')
		.setDescription('Answer a trivia question.')
		.addIntegerOption(option =>
			option
				.setName('clue-id')
				.setDescription('The ID of the trivia question you are answering.')
				.setRequired(true))
		.addIntegerOption(option =>
			option
				.setName('answer')
				.setRequired(true)
				.setDescription('The number for the answer to the trivia question.')),
	async execute(interaction) {
		const rawData = fs.readFileSync('./config.json');
		const jsonData = JSON.parse(rawData).clues;

		const clueID = interaction.options.getInteger('clue-id');
		const answer = interaction.options.getInteger('answer');
		for (const quiz of jsonData) {
			if (clueID === quiz.id) {
				if (answer === quiz.correctOption) {
					await interaction.reply({ content: 'Correct answer!', ephemeral: true });
					return;
				} else {
					await interaction.reply({ content: 'Incorrect answer.', ephemeral: true });
					return;
				}
			}
		}
		await interaction.reply({ content: 'Invalid question ID.', ephemeral: true });
	},
};