const { Client, Intents } = require('discord.js');
const bot = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES
  ] 
});

const token = process.env['token']
const guildId = process.env['guildId']
//const { SlashCommandBuilder } = require('@discordjs/builders');
bot.on('ready', () => {
  console.log(bot.user.username + " is online.")
  const guild = bot.guilds.cache.get(guildId)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = bot.application?.commands
  }

  commands?.create({
    name: 'ping',
    description: 'Replies with pong',
  })

  commands?.create({
    name: 'help',
    description: 'Displays help for usage of the bot',
  })
})

bot.on('interactionCreate', async (interaction) =>{
    if (!interaction.isCommand()) {
      return
    }

    const { commandName, options } = interaction

    if (commandName === 'ping'){
      interaction.reply({
        content: 'pong',
        ephemeral: true,
      })
    }
    if (commandName === 'help'){
      interaction.reply({
        content: 'ayuda',
        ephemeral: true,
      })
    }
  })

bot.login(token);
