import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'

// gets set once, when deployed
const dateOfDeploy = '16.11.2020'
const appVersion = '1.1.0'

const version: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed(`Version`)
    embed.setDescription(`\`${appVersion}\``)
    embed.setFooter(`Veröffentlicht am ${dateOfDeploy}`)
    return embed
}

export default version