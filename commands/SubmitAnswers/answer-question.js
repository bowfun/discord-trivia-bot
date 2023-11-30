/* eslint-disable brace-style */
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { getRunningID, triviaAnswered } = require('../../active-question');
const { isOnCooldown, startCooldown, getCooldownTime } = require('../../cooldowns');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('answer')
		.setDescription('Answer a trivia question.')
		.addIntegerOption(option =>
			option
				.setName('answer')
				.setRequired(true)
				.setDescription('The number for the answer to the trivia question.')),
	async execute(interaction) {
		const rawData = fs.readFileSync('./config.json');
		const jsonData = JSON.parse(rawData).trivia;

		if (isOnCooldown(interaction.user.id)) {
			// A quirk of text formatting
			await interaction.reply({ content: `You are on cooldown! This cooldown will end <t:${Math.round(getCooldownTime(interaction.user.id) / 1000)}:R>`, ephemeral: true });
			return;
		}

		const answer = interaction.options.getInteger('answer');
		for (const quiz of jsonData) {
			if (getRunningID() === quiz.id) {
				if (answer === quiz.correctOption) {
					await interaction.reply({ content: 'Correct answer!', ephemeral: true });
					triviaAnswered(interaction.user.id);
					startCooldown(interaction.user.id);
					return;
				} else {
					await interaction.reply({ content: 'Incorrect answer.', ephemeral: true });
					startCooldown(interaction.user.id);
					return;
				}
			}
		}
		await interaction.reply({ content: 'There is no active trivia question.', ephemeral: true });
	},
};