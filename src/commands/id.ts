import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { getUser } from '../util/discordUtil'

const id: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed('ID')
    const user = await getUser(_bot, _args[0])

    if (user) {
        embed.setDescription(user.username)
    } else {
        embed.setDescription('User existiert nicht')
    }

    return embed
}

export default id