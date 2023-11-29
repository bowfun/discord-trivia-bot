/* eslint-disable brace-style */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
				const triviaEmbed = new EmbedBuilder()
					.setColor(0x0099FF)
					.setTitle('New trivia question!')
					.setDescription(`A new trivia game is starting! Answer the question with /answer (The number for the answer).\nQuestion: ${question.question}`)
					.addFields(
						question.options.map((option, index) => {
							return {
								name: `Option ${index + 1}`,
								value: option,
							};
						}),
					)
					.setFooter({ text: `Trivia question ID ${question.id} | Max winners: ${maxWinners}` });
				interaction.channel.send({ embeds: [triviaEmbed] });
				return;
			}
		}
		await interaction.reply({ content: 'This is an invalid trivia question ID.', ephemeral: true });
	},
};