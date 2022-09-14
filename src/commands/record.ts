const { SlashCommandBuilder } = require('@discordjs/builders')
import { ChatInputCommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import bot from '../app'
import { getUser } from '../util/discordUtil'
import { getOnlineRecord } from '../util/sqlUtil'
import { formatSeconds, toDateString } from '../util/timeUtil'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('record')
		.setDescription('Zeigt den derzeitigen Online-Rekord an'),
        
	async execute(interaction: ChatInputCommandInteraction) {

        const recordResult = await getOnlineRecord()
    
        if (recordResult.rowCount !== 0) {
            const user = await getUser(bot, recordResult.rows[0].user_id)
            const embed = defaultEmbed(`Onlinezeit-Rekordhalter  🏆`)
            embed.addFields({ name: `${user.username}`, value: `\`${formatSeconds(recordResult.rows[0].record_seconds)}\`` })
            embed.setFooter({ text: `Aufgestellt am ${toDateString(recordResult.rows[0].record_date)}`})
            await interaction.reply({ embeds: [embed] })
            return
        }

		await interaction.reply({ embeds: [defaultEmbed('Bisher wurde kein Rekord aufgestellt!  😭')] })
	},
}