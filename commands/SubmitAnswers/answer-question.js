/* eslint-disable brace-style */
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { getRunningID, triviaAnswered } = require('../../active-question');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('answer-question')
		.setDescription('Answer a trivia question.')
		.addIntegerOption(option =>
			option
				.setName('answer')
				.setRequired(true)
				.setDescription('The number for the answer to the trivia question.')),
	async execute(interaction) {
		const rawData = fs.readFileSync('./config.json');
		const jsonData = JSON.parse(rawData).trivia;

		const answer = interaction.options.getInteger('answer');
		for (const quiz of jsonData) {
			if (getRunningID() === quiz.id) {
				if (answer === quiz.correctOption) {
					await interaction.reply({ content: 'Correct answer!', ephemeral: true });
					triviaAnswered(interaction.user.id);
					return;
				} else {
					await interaction.reply({ content: 'Incorrect answer.', ephemeral: true });
					return;
				}
			}
		}
		await interaction.reply({ content: 'There is no active trivia question.', ephemeral: true });
	},
};