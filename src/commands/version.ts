import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { toDateString, formatSeconds } from '../util/timeUtil'

const dateOfDeploy = new Date()
const appVersion = require('project-version');

const version: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed(`Version  📈`)
    embed.setDescription(`\`${appVersion}\``)
    embed.setFooter(`Veröffentlicht am ${toDateString(dateOfDeploy)} · Uptime: ${formatSeconds(process.uptime())}`)
    return embed
}

export default version