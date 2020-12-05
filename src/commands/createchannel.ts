import { Client, Message } from 'discord.js'
import { prefix, customChannelCategoryId } from '../config/config.json'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { getCategoryChannel, getGuild } from '../util/discordUtil'

const createchannel: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed('Custom Channel  💬')

    if (!_args[0]) {
        embed.setDescription(`Channel brauch einen Namen, verwende \`${prefix}createchannel [Name]\``)
        return embed
    }

    const category = await getCategoryChannel(_bot, customChannelCategoryId)
    const customChannelLimit = 5

    if (category.children.size >= customChannelLimit) {
        embed.setDescription(`Das Limit von ${customChannelLimit} Custom Channels wurde erreicht, versuche es später nochmal!`)
        return embed
    }

    const channelName = _args.join(' ')

    if (channelName.length > 100) {
        embed.setDescription(`Der Name ist zu lang! (Max. 100 Zeichen)`)
        return embed
    }

    const guild = await getGuild(_bot)
    
    const channel = await guild.channels.create(channelName, {
        type: 'voice',
        parent: customChannelCategoryId
    })
 
    // channel nach 30 sekunden löschen, wenn leer
    setTimeout(function () {
        if (channel.members.size === 0) {
            channel.delete()
        }
    }, 30000);

    embed.setDescription(`Channel '${channelName}' erstellt!`)
    return embed
}

export default createchannel