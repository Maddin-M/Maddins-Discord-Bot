import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed, leaderEmoji } from '../embed'
import postgres from '../postgres'
import { getUserV2 } from '../util/discordUtil'
import { formatSeconds } from '../util/timeUtil'
import { prefix } from '../config.json'

const leader: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed(`Voice Channel Leaderboard  ${leaderEmoji}`)
    embed.setFooter(`"${prefix}leader [Zahl]" eingeben, um weitere Seiten zu sehen`)

    const curentPage = isValidPage(_args) ? `Seite ${_args[0]}` : 'Seite 1'
    const users = await postgres.query('SELECT COUNT(*) FROM USERS')
    const maxPages = Math.ceil(users.rows[0].count / 5)
    embed.setDescription(`${curentPage} / ${maxPages}`)

    const offset = isValidPage(_args) ? (Number(_args[0]) - 1) * 5 : 0

    const res = await postgres.query('SELECT ID, TOTAL_ONLINE_SECONDS FROM USERS ORDER BY TOTAL_ONLINE_SECONDS DESC LIMIT 5 OFFSET $1', [offset])

    if (res.rowCount === 0) return 'Leaderboard ist leer oder Seite existiert nicht!'

    for (let i = 0; i < res.rowCount; i++) {

        const user = await getUserV2(_bot, res.rows[i].id)
        let username

        if (user) {
            username = user.username
        } else {
            username = `Gelöschter User (${res.rows[i].id})`
        }

        embed.addField(`${getLeaderPrefix(offset + i + 1)} ${username}`, formatSeconds(res.rows[i].total_online_seconds))
    }

    return embed
}

function isValidPage(args: string[]): boolean {
    return args.length > 0 && !isNaN(Number(args[0])) && Number(args[0]) >= 1
}

function getLeaderPrefix(place: number): string {
    switch (place) {
        case 1: return '🥇'
        case 2: return '🥈'
        case 3: return '🥉'
        default: return `\`${place}.\``
    }
}

export default leader