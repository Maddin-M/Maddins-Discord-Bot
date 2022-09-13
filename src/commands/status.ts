const { SlashCommandBuilder } = require('@discordjs/builders')
import { ChatInputCommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import { voiceTrackerOnline } from '../voicetracker/voiceTrackerUtil'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Zeigt an, ob der VoiceTracker gerade aktiv ist'),
        
	async execute(interaction: ChatInputCommandInteraction) {

        const embed = defaultEmbed('VoiceTracker Status  ⚙️')

        if (voiceTrackerOnline) {
            embed.setDescription('VoiceTracker ist eingeschaltet  ✅')
        } else {
            embed.setDescription('VoiceTracker ist ausgeschaltet  ❌')
        }

		await interaction.reply({ embeds: [embed] })
	},
}