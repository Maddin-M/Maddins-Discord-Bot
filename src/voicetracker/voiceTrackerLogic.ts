import { Client, VoiceState } from "discord.js";
import { getTextChannelV2, getGuildV2 } from '../util/discordUtil'
import { announceChannelId } from '../config.json'
import { voiceTrackerOnline, enteredChannel, leftChannel, startTracking, endTracking } from './voiceTrackerUtil'

const voiceStateUpdate = async (_bot: Client, _oldState: VoiceState, _newState: VoiceState) => {

    if (!voiceTrackerOnline) return

    const announceChannel = await getTextChannelV2(_bot, announceChannelId)
    const guild = await getGuildV2(_bot)
    const userId = _oldState.id

    if (enteredChannel(_oldState, _newState)) {
        await startTracking(userId, announceChannel)

    } else if (leftChannel(_oldState, _newState)) {
        await endTracking(userId, announceChannel, guild)
    }
}

export default voiceStateUpdate