import { Request } from '../types'
import { Client, Message } from 'discord.js'
import postgres from '../postgres'
import { getUserV2 } from '../cache'
import { defaultEmbed, sadEmoji, lookingEmoji } from '../embed'
import { formatSeconds } from '../timeUtil'

const online: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const mention = _msg.mentions.users.first(1)
    const id = mention.length !== 0 && mention[0].bot === false ? mention[0].id : _msg.author.id

    const res = await postgres.query('SELECT * FROM (SELECT ROW_NUMBER() OVER (ORDER BY TOTAL_ONLINE_SECONDS DESC) PLACE, ' +
                                     'TOTAL_ONLINE_SECONDS, ID FROM USERS) U WHERE ID = $1', [id])

    const username = await getUserV2(_bot, id)
        .then((user) => {
            return user.username
        }).catch(() => {
            return `Gelöschter User (${id})`
        })

    if (res.rowCount === 0) return `${username} war noch nie in einem Voice Channel! ${sadEmoji}`
    
    const seconds = res.rows[0].total_online_seconds
    const place = res.rows[0].place

    const embed = defaultEmbed(`Zeit, die ${username} im Voice verbracht hat  ${lookingEmoji}`)
    embed.addField(formatSeconds(seconds), `Damit ist ${username} auf dem \`${place}.\` Platz im Leaderboard!`)

    return embed
}

export default online