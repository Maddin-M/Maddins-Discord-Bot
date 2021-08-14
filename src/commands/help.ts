const { SlashCommandBuilder } = require('@discordjs/builders')
import { CommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import bot from '../app'
import { clientId, serverId } from '../config/config.json'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Zeigt eine List aller Commands'),
        
	async execute(interaction: CommandInteraction) {

        const embed = defaultEmbed(`Help  🤔`)

        const commands = await bot.api.applications(clientId).guilds(serverId).commands.get()
        for (const command of commands) {
            embed.addField(`\`/${command.name}\``, command.description)
        }

	    await interaction.reply({ embeds: [embed] })
	},
}