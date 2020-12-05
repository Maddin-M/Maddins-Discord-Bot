import { Client, VoiceState } from 'discord.js'
import { customChannelCategoryId } from '../config/config.json'
import { leftChannel } from '../voicetracker/voiceTrackerUtil'

export const customChannelUpdate = async (_bot: Client, _oldState: VoiceState, _newState: VoiceState) => {

    if (leftChannel(_oldState, _newState)) {
        if (_oldState.channel?.parentID === customChannelCategoryId && _oldState.channel.members.size === 0) {
            _oldState.channel.delete()
        }
    }
}