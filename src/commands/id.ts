import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { Client, Message } from 'discord.js'
import { getUser } from '../cache'

const id: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed('ID')
    const user = getUser(_bot, _args[0])

    if (user) {
        embed.setDescription(user.username)
    } else {
        embed.setDescription('User existiert nicht')
    }

    return embed
}

export default id