import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { voiceTrackerOnline } from '../voicetracker/voiceTrackerUtil'

const status: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed('VoiceTracker Status  ⚙️')

    if (voiceTrackerOnline) {
        embed.setDescription('VoiceTracker ist eingeschaltet  ✅')

    } else {
        embed.setDescription('VoiceTracker ist ausgeschaltet  ❌')
    }

    return embed
}

export default status