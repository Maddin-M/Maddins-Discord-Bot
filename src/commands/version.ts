const { SlashCommandBuilder } = require('@discordjs/builders')
const appVersion = require('project-version');
import { CommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription('Zeigt die Version der App an'),
        
	async execute(interaction: CommandInteraction) {

        const embed = defaultEmbed(`Version  📈`)
        embed.setDescription(`\`${appVersion}\``)
        await interaction.reply({ embeds: [embed] })
	},
}