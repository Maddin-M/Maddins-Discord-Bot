const { SlashCommandBuilder } = require('@discordjs/builders')
import { CommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import { formatSeconds, toDays, toYears, toHumanLifes } from '../util/timeUtil'
import { getSum } from '../util/sqlUtil'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sum')
		.setDescription('Zeigt die Summe der auf dem Server verbrachten Zeit im Voice'),
        
	async execute(interaction: CommandInteraction) {

        const sumResult = await getSum()
    
        const sum = sumResult.rows[0].sum
        const embed = defaultEmbed(`Summe der im Voice verbrachten Zeit  🗓️`)

        embed.setDescription(formatSeconds(sum))
        embed.addField('In `Tagen` sind das:', `${toDays(sum)} Tage`)
        embed.addField('In `Jahren` sind das:', `${toYears(sum)} Jahre`)
        embed.addField('In `Durchschnittlicher Lebenszeit eines Menschen` sind das:', `${toHumanLifes(sum)} Menschenleben`)

		await interaction.reply({ embeds: [embed] })
	},
}