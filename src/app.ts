const { Client, Intents } = require('discord.js')
import { token } from './config/config.json'
import { voiceStateUpdate } from './voicetracker/voiceTrackerLogic'
import { customChannelUpdate } from './customchannel/customChannelLogic'
import { ApplicationCommand, Collection, Interaction, VoiceState } from 'discord.js'
import { updateSlashCommands } from './util/slashCommandUtil'
import { defaultEmbed } from './embed'
import path from 'path'
import fs from 'fs'

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] })
bot.commands = new Collection()
const slashCommandJSONs: ApplicationCommand[] = []
const commandFiles: String[] = fs.readdirSync(path.join(__dirname, './commands')).filter((file: string) => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(path.join(__dirname, `./commands/${file}`))
	bot.commands.set(command.data.name, command)
    slashCommandJSONs.push(command.data.toJSON())
}

bot.once('ready', () => {
    updateSlashCommands(slashCommandJSONs)
	if(bot.user) {
        console.log(`Logged in as ${bot.user.tag}!`)
        bot.user.setActivity(`${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}`)
    }
})

bot.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return
	if (!bot.commands.has(interaction.commandName)) return

	try {
		await bot.commands.get(interaction.commandName).execute(interaction)
	} catch (error) {
		console.error(error)
		return interaction.reply({ embeds: [defaultEmbed('Es gab einen Fehler beim Ausführen des Commands!')], ephemeral: true })
	}
})

bot.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => {
    await voiceStateUpdate(bot, oldState, newState)
    await customChannelUpdate(oldState, newState)
})

bot.login(token)
export default bot