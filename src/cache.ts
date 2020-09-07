import { Client, Guild, GuildMember, TextChannel, User, Role } from 'discord.js'
import { serverId } from './config.json'

export const getUser = (bot: Client, id: string): User | undefined => {
    const user = bot.users.cache.get(id)
    if (user === undefined) return undefined
    return user
}

export const getUsername = (bot: Client, id: string): string => {
    const user = getUser(bot, id)
    return user === undefined ? `Gelöschter User (${id})` : user.username
}

export const getTextChannel = (bot: Client, id: string): TextChannel => {
    const channel = bot.channels.cache.get(id)
    if (channel === undefined) throw 'Channel not found!'
    if (channel.type !== 'text') throw 'Channel is not a text channel!'
    return channel as TextChannel
}

export const getGuild = (bot: Client): Guild => {
    const guild = bot.guilds.cache.get(serverId)
    if (guild === undefined) throw 'Server not found!'
    return guild
}

export const getMember = (bot: Client, id: string): GuildMember => {
    const member = getGuild(bot).members.cache.get(id)
    if (member === undefined) throw 'Member not found!'
    return member
}

export const getRole = (bot: Client, id: string): Role => {
    const role = getGuild(bot).roles.cache.get(id)
    if (role === undefined) throw 'Role not found!'
    return role
}

export const memberHasRole = (bot: Client, memberId: string, roleId: string): boolean => {
    return getMember(bot, memberId).roles.cache.has(roleId)
}