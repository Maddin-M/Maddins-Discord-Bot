import { VoiceState } from 'discord.js'
import { customChannelCategoryId } from '../util/envUtil'

export const customChannelUpdate = async (_oldState: VoiceState, _newState: VoiceState) => {

    if (_oldState.channel?.parentId === customChannelCategoryId && _oldState.channel.members.size === 0) {
        _oldState.channel.delete()
    }
}