const { SlashCommandBuilder } = require('@discordjs/builders')
import { CommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import { voiceTrackerOnline, startGlobalTracking, stopGlobalTracking } from '../voicetracker/voiceTrackerUtil'
import { adminRoleId } from '../config/config.json'
import bot from '../app'
import { memberHasRole } from '../util/discordUtil'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tracker')
		.setDescription('Schaltet den VoiceTracker ein und aus')
        .addStringOption(option =>
            option
                .setName('newtrackerstatus')
                .setDescription('Wähle aus, ob der Tracker an-, ausgeschaltet oder aktualisiert werden soll')
                .setRequired(true)
                .addChoice('on', 'on')
                .addChoice('off', 'off')
                .addChoice('update', 'update')),
        
	async execute(interaction: CommandInteraction) {

        const hasAdminRole = await memberHasRole(bot, interaction.user.id, adminRoleId)
        if (!hasAdminRole) {
            await interaction.reply({ embeds: [defaultEmbed('Dieser Command ist nur für Admins nutzbar!  🚨')], ephemeral: true })
            return
        }

        const newTrackerStatus = interaction.options.getString('newtrackerstatus')
        const embed = defaultEmbed()

        if (newTrackerStatus === 'on') {
            if (voiceTrackerOnline) {
                embed.setTitle('Hinweis  ⚠️')
                embed.setDescription(`VoiceTracker ist bereits aktiviert!`)
                await interaction.reply({ embeds: [embed], ephemeral: true })
            } else {
                await startGlobalTracking(bot)
                embed.setTitle('Erfolg  ✅')
                embed.setDescription(`VoiceTracker wurde eingeschaltet!`)
                await interaction.reply({ embeds: [embed] })
            }
            return
        }

        if (newTrackerStatus === 'off') {
            if (voiceTrackerOnline) {
                await stopGlobalTracking(bot)
                embed.setTitle('Erfolg  ✅')
                embed.setDescription(`VoiceTracker wurde ausgeschaltet!`)
                await interaction.reply({ embeds: [embed] })
            } else {
                embed.setTitle('Hinweis  ⚠️')
                embed.setDescription(`VoiceTracker ist bereits deaktiviert!`)
                await interaction.reply({ embeds: [embed], ephemeral: true })
            }
            return
        }

        if (newTrackerStatus === 'update') {
            if (voiceTrackerOnline) {
                await stopGlobalTracking(bot)
                await startGlobalTracking(bot)
                embed.setTitle('Erfolg  ✅')
                embed.setDescription(`VoiceTracker wurde aktualisiert!`)
                await interaction.reply({ embeds: [embed] })
            } else {
                embed.setTitle('Hinweis  ⚠️')
                embed.setDescription(`VoiceTracker ist deaktiviert, kann nur eingeschalteten VoiceTracker aktualisieren!`)
                await interaction.reply({ embeds: [embed], ephemeral: true })
            }
        }
	},
}