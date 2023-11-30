/* eslint-disable brace-style */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const { startQuiz, endQuiz } = require('../../active-question');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start-random-trivia')
		.setDescription('Start a trivia question at random.')
		.addIntegerOption(option =>
			option
				.setName('max-winners')
				.setRequired(true)
				.setDescription('The maximum amount of winners for a question (after which the trivia game ends).')),
	async execute(interaction) {
		const rawData = fs.readFileSync('./config.json');
		const jsonData = JSON.parse(rawData).trivia;

		const maxWinners = interaction.options.getInteger('max-winners');

		if (interaction.member.roles.cache.has(JSON.parse(rawData).adminRoleId) === false) {
			interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
			return;
		}

		const randomIndex = Math.floor(Math.random() * jsonData.length);
		const triviaID = jsonData[randomIndex].id;

		endQuiz();
		if (maxWinners <= 0) {
			interaction.reply({ content: 'Maximum winners must be 1 or more.', ephemeral: true });
			return;
		}
		startQuiz(triviaID, maxWinners);
		interaction.reply({ content: 'Quiz started successfully.', ephemeral: true });
		const triviaEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('New trivia question!')
			.setDescription(`A new trivia game is starting! Answer the question with /answer (The number for the answer).\nQuestion: ${jsonData[randomIndex].question}`)
			.addFields(
				jsonData[randomIndex].options.map((option, index) => {
					return {
						name: `Option ${index + 1}`,
						value: option,
					};
				}),
			)
			.setFooter({ text: `Trivia question ID ${triviaID} | Max winners: ${maxWinners}` });
		await interaction.channel.send({ embeds: [triviaEmbed] });
		return;

	},
};