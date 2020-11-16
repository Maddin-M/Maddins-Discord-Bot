import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed, sumEmoji } from '../embed'
import postgres from '../postgres'
import { formatSeconds, toDays, toYears, toHumanLifes } from '../util/timeUtil'

const sum: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const res = await postgres.query('SELECT SUM(TOTAL_ONLINE_SECONDS) FROM USERS')
    
    const sum = res.rows[0].sum
    const embed = defaultEmbed(`Summe der im Voice verbrachten Zeit  ${sumEmoji}`)

    embed.setDescription(formatSeconds(sum))
    embed.addField('In `Tagen` sind das:', `${toDays(sum)} Tage`)
    embed.addField('In `Jahren` sind das:', `${toYears(sum)} Jahre`)
    embed.addField('In `Durchschnittlicher Lebenszeit eines Menschen` sind das:', `${toHumanLifes(sum)} Menschenleben`)

    return embed
}

export default sum