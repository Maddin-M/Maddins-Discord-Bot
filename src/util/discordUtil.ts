import { Client, Guild, GuildMember, TextChannel, VoiceChannel, CategoryChannel, User, Role, VoiceState } from 'discord.js'
import { serverId, ignoredChannelIds } from '../config/config.json'

export const getUser = (bot: Client, id: string): Promise<User> => {
    return bot.users.fetch(id)
}

export const getTextChannel = (bot: Client, id: string): Promise<TextChannel> => {
    const channel = bot.channels.fetch(id)
    return channel as Promise<TextChannel>
}

export const getCategoryChannel = (bot: Client, id: string): Promise<CategoryChannel> => {
    const channel = bot.channels.fetch(id)
    return channel as Promise<CategoryChannel>
}

export const getGuild = (bot: Client): Promise<Guild> => {
    return bot.guilds.fetch(serverId)
}

export const getMember = (guild: Guild, userId: string): Promise<GuildMember> => {
    return guild.members.fetch(userId)
}

export const getRole = (guild: Guild, id: string): Promise<Role | null> => {
    return guild.roles.fetch(id)
}

export const memberHasRole = async (bot: Client, memberId: string, roleId: string): Promise<boolean> => {
    const guild = await getGuild(bot)
    const member = await getMember(guild, memberId)
    return member.roles.cache.has(roleId)
}

export const getAllMemberIdsInVoiceChannels = (guild: Guild): string[] => {
    let memberIds: string[] = []
    const channels = guild.channels.cache
        .filter(channel => !ignoredChannelIds.includes(channel.id) && channel.type === "GUILD_VOICE")
        .map(channel => channel as VoiceChannel)

    channels.forEach(channel => {
        memberIds = memberIds.concat(channel.members.map(member => member.id))
    })
    return memberIds
}

export function enteredChannel(oldState: VoiceState, newState: VoiceState): boolean {
    return (oldState.channelId === null || oldState.channelId === undefined || ignoredChannelIds.includes(oldState.channelId)) && 
            newState.channelId !== null && newState.channelId !== undefined && !ignoredChannelIds.includes(newState.channelId)
}

export function leftChannel(oldState: VoiceState, newState: VoiceState): boolean {
    return (newState.channelId === null || newState.channelId === undefined || ignoredChannelIds.includes(newState.channelId)) && 
            oldState.channelId !== null && oldState.channelId !== undefined && !ignoredChannelIds.includes(oldState.channelId)
}