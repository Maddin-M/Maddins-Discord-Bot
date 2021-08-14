const { SlashCommandBuilder } = require('@discordjs/builders')
import { CommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import { formatSeconds } from '../util/timeUtil'
import { getUserOnline } from '../util/sqlUtil'
import { SlashCommandUserOption } from '@discordjs/builders'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('online')
		.setDescription('Zeigt an, wie lange du oder der von dir angegebene User in Voice Channels online waren')
        .addUserOption((option: SlashCommandUserOption) =>
            option
                .setName('user')
                .setDescription('User, der geprüft werden soll')),
        
	async execute(interaction: CommandInteraction) {

        var user = interaction.options.getUser('user')
        if (user == null) {
            user = interaction.user
        }
        const onlineResult = await getUserOnline(user.id)
        const username = user ? user.username : `Gelöschter User`

        if (onlineResult.rowCount === 0) {
            await interaction.reply({ embeds: [defaultEmbed(`${username} war noch nie in einem Voice Channel!  😭`)] })
            return
        }
        
        const seconds = onlineResult.rows[0].total_online_seconds
        const place = onlineResult.rows[0].place

        const embed = defaultEmbed(`Zeit, die ${username} im Voice verbracht hat  🤓`)
        embed.addField(formatSeconds(seconds), `Damit ist ${username} auf dem \`${place}.\` Platz im Leaderboard!`)

		await interaction.reply({ embeds: [embed] })
	},
}