import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { formatSeconds, toDays, toYears, toHumanLifes } from '../util/timeUtil'
import { getSum } from '../util/sqlUtil'

const sum: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const sumResult = await getSum()
    
    const sum = sumResult.rows[0].sum
    const embed = defaultEmbed(`Summe der im Voice verbrachten Zeit  🗓️`)

    embed.setDescription(formatSeconds(sum))
    embed.addField('In `Tagen` sind das:', `${toDays(sum)} Tage`)
    embed.addField('In `Jahren` sind das:', `${toYears(sum)} Jahre`)
    embed.addField('In `Durchschnittlicher Lebenszeit eines Menschen` sind das:', `${toHumanLifes(sum)} Menschenleben`)

    return embed
}

export default sum