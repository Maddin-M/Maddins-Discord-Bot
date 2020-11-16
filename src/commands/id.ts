import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { getUserV2 } from '../util/discordUtil'

const id: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed('ID')
    const user = await getUserV2(_bot, _args[0])

    if (user) {
        embed.setDescription(user.username)
    } else {
        embed.setDescription('User existiert nicht')
    }

    return embed
}

export default id