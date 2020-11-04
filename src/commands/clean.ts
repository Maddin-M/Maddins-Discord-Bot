import { Client, Message } from 'discord.js'
import { Request } from '../types'
import postgres from '../postgres'
import { defaultEmbed } from '../embed'
import { getUserV2 } from '../cache'

const clean: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const res = await postgres.query('SELECT ID FROM USERS')

    for (const row of res.rows) {

        let user = await getUserV2(_bot, row.id)
        .then((user) => {
            return user
        }).catch(() => {
            return null
        })

        if (user) {
            await postgres.query('DELETE FROM USERS WHERE ID = $1', [row.id])
        }
    }

    return defaultEmbed('Leaderboard gereinigt!')
}

export default clean