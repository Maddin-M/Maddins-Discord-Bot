import { MessageEmbed, Message, Client } from "discord.js"

export type Response = MessageEmbed | string
export type Request = (bot: Client, msg: Message, args: string[]) => Promise<Response>

export type Command = {
    cmd: string,
    handler: Request,
    adminOnly: boolean,
    help: {
        usage: string[]
        helpText: string,
    }
}

export type UserSeconds = {
    oldSeconds: number,
    newSeconds: number,
    totalSeconds: number
}