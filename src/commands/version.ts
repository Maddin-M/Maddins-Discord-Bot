import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { formatSeconds, currentSeconds } from '../util/timeUtil'

const appVersion = require('project-version');

const version: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed(`Version  📈`)
    embed.setDescription(`\`${appVersion}\``)
    const deployTimestamp = process.env.DEPLOY_TIMESTAMP
    const deployDate = process.env.DEPLOY_DATE

    if (deployTimestamp !== undefined && deployDate !== undefined) {
        const deployAsInt = parseInt(deployTimestamp)
        embed.setFooter(`Veröffentlicht am ${deployDate} · Uptime: ${formatSeconds(currentSeconds() - deployAsInt)}`)
        return embed

    } else {
        embed.setFooter(`Es gab einen Fehler beim Berechnen der Uptime...`)
        return embed
    }
}

export default version