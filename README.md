# Discord Trivia Bot
 A simple trivia bot for Discord.
 This bot has parameters configured in a JSON file.

 ## About
 This is a Discord bot written with Discord.JS (with the help of [discordjs.guide](https://discordjs.guide/#before-you-begin)).

 This bot is fully configured in JSON files. There are 2 of these to note (config.json and data.json).

 ## Use this Bot
 You can get started with the bot by renaming example.config.json to config.json. You will then need to edit the options.
 You will need a bot token (you can create one of these by following [this tutorial](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)). You also need to get the bot's ID, which can be found in the OAuth2 settings for your bot (Client ID). Finally, add the bot to a server, which is detailed [here](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#creating-and-using-your-invite-link).

 Now, put the role ID for the role that you want to allow to start trivia games in the adminRoleId section (in quotation marks).
 Finally, for each trivia question, create a new section in the trivia section that has the same options as in the template.
 IMPORTANT: IF YOU DON'T USE A UNIQUE ID FOR EACH QUESTION, THE BOT WILL HAVE ERRORS. ALSO, ALL IDs MUST BE 1 OR GREATER.
