import { Client, Guild, GuildMember, TextChannel, User, Role } from 'discord.js'
import { serverId } from './config.json'

export const getUserV2 = (bot: Client, id: string): Promise<User> => {
    return bot.users.fetch(id)
}

export const getTextChannel = (bot: Client, id: string): TextChannel | undefined => {
    const channel = bot.channels.cache.get(id)
    if (channel === undefined || channel.type !== 'text') return undefined
    return channel as TextChannel
}

export const getGuild = (bot: Client): Guild | undefined => {
    const guild = bot.guilds.cache.get(serverId)
    if (guild === undefined) return undefined
    return guild
}

export const getMember = (bot: Client, id: string): GuildMember | undefined => {
    const guild = getGuild(bot)
    if (guild === undefined) return undefined
    const member = guild.members.cache.get(id)
    if (member === undefined) return undefined
    return member
}

export const getRole = (bot: Client, id: string): Role | undefined => {
    const guild = getGuild(bot)
    if (guild === undefined) return undefined
    const role = guild.roles.cache.get(id)
    if (role === undefined) return undefined
    return role
}

export const memberHasRole = (bot: Client, memberId: string, roleId: string): boolean => {
    const member = getMember(bot, memberId)
    if (member === undefined) return false
    return member.roles.cache.has(roleId)
}