import { Request } from '../types'
import { Client, Message } from 'discord.js'
import { getUser } from '../util/discordUtil'
import { defaultEmbed, sadEmoji, lookingEmoji } from '../embed'
import { formatSeconds } from '../util/timeUtil'
import { getUserOnline } from '../util/sqlUtil'

const online: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const mention = _msg.mentions.users.first(1)
    const userId = mention.length !== 0 && mention[0].bot === false ? mention[0].id : _msg.author.id

    const onlineResult = await getUserOnline(userId)

    const user = await getUser(_bot, userId)
    let username

    if (user) {
        username = user.username
    } else {
        username = `Gelöschter User (${userId})`
    }

    if (onlineResult.rowCount === 0) return `${username} war noch nie in einem Voice Channel!  ${sadEmoji}`
    
    const seconds = onlineResult.rows[0].total_online_seconds
    const place = onlineResult.rows[0].place

    const embed = defaultEmbed(`Zeit, die ${username} im Voice verbracht hat  ${lookingEmoji}`)
    embed.addField(formatSeconds(seconds), `Damit ist ${username} auf dem \`${place}.\` Platz im Leaderboard!`)

    return embed
}

export default online