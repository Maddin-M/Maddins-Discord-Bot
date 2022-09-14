const { SlashCommandBuilder } = require('@discordjs/builders')
import { ChatInputCommandInteraction } from 'discord.js'
import { defaultEmbed } from '../embed'
import { customChannelCategoryId, everyoneRoleId } from '../util/envUtil'
import bot from '../app'
import { getCategoryChannel, getGuild } from '../util/discordUtil'
import { SlashCommandStringOption } from '@discordjs/builders'
import { ChannelType, PermissionFlagsBits } from 'discord-api-types/v10'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createchannel')
		.setDescription('Erstellt einen temporären VoiceChannel')
        .addStringOption((option: SlashCommandStringOption) =>
            option
                .setName('name')
                .setDescription('Name des Channels')
                .setRequired(true)),
        
	async execute(interaction: ChatInputCommandInteraction) {

        const channelName = interaction.options.getString('name')!!
        const embed = defaultEmbed('Custom Channel  💬')

        const category = await getCategoryChannel(bot, customChannelCategoryId)
        const customChannelLimit = 5

        if (category.children.cache.filter(child => child.type === ChannelType.GuildVoice).size >= customChannelLimit) {
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
    
        const channel = await guild.channels.create({
            name: channelName,
            type: ChannelType.GuildVoice,
            parent: customChannelCategoryId,
            permissionOverwrites: [{
                id: everyoneRoleId,
                allow: [PermissionFlagsBits.Connect]
            }]
        })

        // channel nach 30 sekunden löschen, wenn leer
        setTimeout(function () {
            if (channel.members.size === 0) {
                channel.delete()
            }
        }, 30_000)

        embed.setDescription(`Channel '${channelName}' erstellt!`)
		await interaction.reply({ embeds: [embed] })
	},
}