import { Request } from '../types'
import { Client, Message } from 'discord.js'
import postgres from '../postgres'
import { defaultEmbed } from '../embed'

const newdatabase: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    await postgres.query(`CREATE TABLE IF NOT EXISTS USERS (ID TEXT NOT NULL, TOTAL_ONLINE_SECONDS INTEGER NOT NULL, LAST_JOINED TIMESTAMP, PRIMARY KEY(ID))`)
    return defaultEmbed('Neue Datenbank erstellt')
}

export default newdatabase