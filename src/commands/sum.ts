const { SlashCommandBuilder } = require('@discordjs/builders')
import { ChatInputCommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import { formatSeconds, toDays, toYears, toHumanLifes } from '../util/timeUtil'
import { getSum } from '../util/sqlUtil'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sum')
		.setDescription('Zeigt die Summe der auf dem Server verbrachten Zeit im Voice'),
        
	async execute(interaction: ChatInputCommandInteraction) {

        const sumResult = await getSum()
    
        const sum = sumResult.rows[0].sum
        const embed = defaultEmbed(`Summe der im Voice verbrachten Zeit  🗓️`)

        embed.setDescription(formatSeconds(sum))
        embed.addFields(
            { name: 'In `Tagen` sind das:', value: `${toDays(sum)} Tage` },
            { name: 'In `Jahren` sind das:', value: `${toYears(sum)} Jahre` },
            { name: 'In `Durchschnittlicher Lebenszeit eines Menschen` sind das:', value: `${toHumanLifes(sum)} Menschenleben` },
        )

		await interaction.reply({ embeds: [embed] })
	},
}