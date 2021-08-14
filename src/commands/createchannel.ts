const { SlashCommandBuilder } = require('@discordjs/builders')
import { CommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import { customChannelCategoryId, everyoneRoleId } from '../config/config.json'
import bot from '../app'
import { getCategoryChannel, getGuild } from '../util/discordUtil'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createchannel')
		.setDescription('Erstellt einen temporären VoiceChannel')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Name des Channels')
                .setRequired(true)),
        
	async execute(interaction: CommandInteraction) {

        const channelName = interaction.options.getString('name')!!
        const embed = defaultEmbed('ID')

        const category = await getCategoryChannel(bot, customChannelCategoryId)
        const customChannelLimit = 5

        if (category.children.filter(child => child.type === "GUILD_VOICE").size >= customChannelLimit) {
            embed.setDescription(`Das Limit von ${customChannelLimit} Custom Channels wurde erreicht, versuche es später nochmal!`)
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        if (channelName.length > 100) {
            embed.setDescription(`Der Name ist zu lang! (Max. 100 Zeichen)`)
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const guild = await getGuild(bot)
    
        const channel = await guild.channels.create(channelName, {
            type: "GUILD_VOICE",
            parent: customChannelCategoryId,
            permissionOverwrites: [{
                id: everyoneRoleId,
                allow: ['CONNECT']
            }]
        })

        // channel nach 30 sekunden löschen, wenn leer
        setTimeout(function () {
            if (channel.members.size === 0) {
                channel.delete()
            }
        }, 30_000);

        embed.setDescription(`Channel '${channelName}' erstellt!`)
		await interaction.reply({ embeds: [embed] })
	},
}