import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { voiceTrackerOnline, startGlobalTracking, endGlobalTracking } from '../voicetracker/voiceTrackerUtil'

const tracker: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed()

    if (_args.length === 0) {
        embed.setTitle('Hinweis  ⚠️')
        embed.setDescription(`Parameter 'on' oder 'off' fehlen!`)
        return embed
    }

    if (_args[0] === 'on') {
        if (voiceTrackerOnline) {
            embed.setTitle('Hinweis  ⚠️')
            embed.setDescription(`VoiceTracker ist bereits aktiviert!`)
            return embed
        } else {
            await startGlobalTracking(_bot)
            embed.setTitle('Erfolg  ✅')
            embed.setDescription(`VoiceTracker wurde eingeschaltet!`)
            return embed
        }
    }

    if (_args[0] === 'off') {
        if (!voiceTrackerOnline) {
            embed.setTitle('Hinweis  ⚠️')
            embed.setDescription(`VoiceTracker ist bereits deaktiviert!`)
            return embed
        } else {
            await endGlobalTracking(_bot)
            embed.setTitle('Erfolg  ✅')
            embed.setDescription(`VoiceTracker wurde ausgeschaltet!`)
            return embed
        }
    }

    embed.setTitle('Hinweis  ⚠️')
    embed.setDescription(`Nur die Parameter 'on' und 'off' sind gültig!`)
    return embed
}

export default tracker