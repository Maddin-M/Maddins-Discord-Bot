import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { getUser } from '../util/discordUtil'
import { getOnlineRecord } from '../util/sqlUtil'
import { formatSeconds, toDateString } from '../util/timeUtil'

const record: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const recordResult = await getOnlineRecord()
    
    if (recordResult.rowCount !== 0) {
        const user = await getUser(_bot, recordResult.rows[0].user_id)
        const embed = defaultEmbed(`Onlinezeit-Rekordhalter  🏆`)
        embed.addField(`${user.username}`, `\`${formatSeconds(recordResult.rows[0].record_seconds)}\``)
        embed.setFooter(`Aufgestellt am ${toDateString(recordResult.rows[0].record_date)}`)
        return embed

    } else {
        return 'Bisher wurde kein Rekord aufgestellt!  😭'
    }
}

export default record