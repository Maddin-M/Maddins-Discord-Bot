import { Client, VoiceState } from "discord.js"
import { getTextChannel, getGuild, enteredChannel, leftChannel } from '../util/discordUtil'
import { announceChannelId } from '../util/envUtil'
import { voiceTrackerOnline, startTracking, endTracking } from './voiceTrackerUtil'

export const voiceStateUpdate = async (_bot: Client, _oldState: VoiceState, _newState: VoiceState) => {

    if (!voiceTrackerOnline) return
    if (_oldState.member?.user.bot) return

    const announceChannel = await getTextChannel(_bot, announceChannelId)
    const guild = await getGuild(_bot)
    const userId = _oldState.id

    if (enteredChannel(_oldState, _newState)) {
        await startTracking(userId, announceChannel)

    } else if (leftChannel(_oldState, _newState)) {
        await endTracking(userId, announceChannel, guild)
    }
}