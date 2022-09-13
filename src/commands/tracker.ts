const { SlashCommandBuilder } = require('@discordjs/builders')
import { ChatInputCommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import { voiceTrackerOnline, startGlobalTracking, stopGlobalTracking } from '../voicetracker/voiceTrackerUtil'
import { adminRoleId } from '../util/envUtil'
import bot from '../app'
import { memberHasRole } from '../util/discordUtil'
import { SlashCommandStringOption } from '@discordjs/builders'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tracker')
		.setDescription('Schaltet den VoiceTracker ein und aus')
        .addStringOption((option: SlashCommandStringOption) =>
            option
                .setName('newtrackerstatus')
                .setDescription('Wähle aus, ob der Tracker an-, ausgeschaltet oder aktualisiert werden soll')
                .setRequired(true)
                .addChoices(
                    { name: 'on', value: 'on' },
                    { name: 'off', value: 'off' },
                    { name: 'update', value: 'update' },
                )),
        
	async execute(interaction: ChatInputCommandInteraction) {

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