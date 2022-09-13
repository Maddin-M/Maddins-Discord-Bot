const { SlashCommandBuilder } = require('@discordjs/builders')
import { ApplicationCommand, ChatInputCommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import bot from '../app'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Zeigt eine List aller Commands'),
        
	async execute(interaction: ChatInputCommandInteraction) {

        const embed = defaultEmbed(`Help  🤔`)

        const commands = await bot.application.commands.fetch()
		commands.forEach((command: ApplicationCommand) => {
			embed.addFields({ name: `\`/${command.name}\``, value: command.description })
		})

	    await interaction.reply({ embeds: [embed] })
	},
}