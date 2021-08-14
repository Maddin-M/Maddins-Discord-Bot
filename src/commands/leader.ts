const { SlashCommandBuilder } = require('@discordjs/builders')
import { CommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import { getUser } from '../util/discordUtil'
import { formatSeconds } from '../util/timeUtil'
import { countUsers, getLeaderboardPage } from '../util/sqlUtil'
import bot from '../app'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leader')
		.setDescription('Zeigt eine Seite der Leute, die am meisten in VoiceChannels waren. Zahl für gewünschte Seite')
        .addIntegerOption(option =>
            option
                .setName('page')
                .setDescription('Seite, die angezeigt werden soll')),
        
	async execute(interaction: CommandInteraction) {

        const enteredPage = interaction.options.getInteger('page')
        const embed = defaultEmbed(`Voice Channel Leaderboard  🏆`)
        embed.setFooter(`"/leader [Zahl]" eingeben, um weitere Seiten zu sehen`)

        const users = await countUsers()
        const maxPages = Math.ceil(users.rows[0].count / 5)
        embed.setDescription(`${enteredPage != null && enteredPage > 0 ? enteredPage : 1} / ${maxPages}`)

        const offset = enteredPage != null && enteredPage >= 1 ? (enteredPage - 1) * 5 : 0
        const leaderboardPage = await getLeaderboardPage(offset)

        if (leaderboardPage.rowCount === 0) {
            await interaction.reply({ embeds: [defaultEmbed(`Leaderboard ist leer oder Seite "${enteredPage}" existiert nicht!  😭`)] })
            return
        }

        for (let i = 0; i < leaderboardPage.rowCount; i++) {

            const user = await getUser(bot, leaderboardPage.rows[i].id)
            const username = user ? user.username : `Gelöschter User (${leaderboardPage.rows[i].id})`
    
            embed.addField(`${getLeaderPrefix(offset + i + 1)} ${username}`, formatSeconds(leaderboardPage.rows[i].total_online_seconds))
        }

		await interaction.reply({ embeds: [embed] })
	},
}

function getLeaderPrefix(place: number): string {
    switch (place) {
        case 1: return '🥇'
        case 2: return '🥈'
        case 3: return '🥉'
        default: return `\`${place}.\``
    }
}