import { Client, VoiceState } from "discord.js";
import { getTextChannel, getGuild } from '../util/discordUtil'
import { announceChannelId } from '../config/config.json'
import { voiceTrackerOnline, enteredChannel, leftChannel, startTracking, endTracking } from './voiceTrackerUtil'

const voiceStateUpdate = async (_bot: Client, _oldState: VoiceState, _newState: VoiceState) => {

    if (!voiceTrackerOnline) return

    const announceChannel = await getTextChannel(_bot, announceChannelId)
    const guild = await getGuild(_bot)
    const userId = _oldState.id

    if (enteredChannel(_oldState, _newState)) {
        await startTracking(userId, announceChannel)

    } else if (leftChannel(_oldState, _newState)) {
        await endTracking(userId, announceChannel, guild)
    }
}

export default voiceStateUpdate