import { Client, Message } from 'discord.js'
import { Request } from '../types'

const say: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    _msg.delete()
    return _args.join(' ')
}

export default say