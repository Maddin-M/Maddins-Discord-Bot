import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { Client, Message } from 'discord.js'
import { getUserV2 } from '../cache'

const id: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed('ID')
    //const user = await getUserV2(_bot, _args[0])

    const user = await getUserV2(_bot, _args[0])
    .then((user) => {
        return user.username
    }).catch(() => {
        return 'User existiert nicht'
    })

    embed.setDescription(user)
    return embed
}

export default id