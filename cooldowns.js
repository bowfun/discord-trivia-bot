/* eslint-disable brace-style */
const cooldowns = {};

const fs = require('fs');

// Function to start cooldown for a user with duration read from config.json
function startCooldown(userId) {
	// Read config.json file to get cooldown duration
	try {
		const configData = fs.readFileSync('./config.json', 'utf8');
		const config = JSON.parse(configData);

		// Get cooldown duration from the config file in seconds and convert to milliseconds
		const cooldownDurationInSeconds = config.cooldownDuration || 5;
		const expirationTime = Date.now() + cooldownDurationInSeconds * 1000;

		// Set the expiration time for the user's cooldown
		cooldowns[userId] = expirationTime;
	} catch (error) {
		console.error('Error reading or parsing config.json:', error);
	}
}

// Function to check if a user is on cooldown
function isOnCooldown(userId) {
	const now = Date.now();

	// Check if user exists in cooldowns and if the cooldown period has passed
	if (cooldowns[userId] && now < cooldowns[userId]) {
		return true;
	} else {
		// User is not on cooldown, remove them from the cooldowns
		delete cooldowns[userId];
		return false;
	}
}

module.exports = { startCooldown, isOnCooldown };