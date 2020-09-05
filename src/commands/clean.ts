import { Client, Message } from 'discord.js'
import { Request } from '../types'
import postgres from '../postgres'
import { defaultEmbed } from '../embed'
import { getUser } from '../cache'

const clean: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const res = await postgres.query('SELECT ID FROM USERS')

    for (const row of res.rows) {
        if (!getUser(_bot, row.id)) await postgres.query('DELETE FROM USERS WHERE ID = $1', [row.id])
    }

    return defaultEmbed('Leaderboard gereinigt!')
}

export default clean