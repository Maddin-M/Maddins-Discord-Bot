import { Client, Message } from 'discord.js'
import { Request } from '../types'
import { defaultEmbed } from '../embed'
import { announceChannelId } from '../config.json'
import { enableVoiceTracker, disableVoiceTracker, voiceTrackerOnline, startTracking, endTracking } from '../voicetracker/voiceTrackerUtil'
import { getAllMemberIdsInVoiceChannels, getGuild, getTextChannel } from '../util/discordUtil'

const tracker: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed('Hinweis  ⚠️')

    if (_args.length === 0) {
        embed.setDescription(`Parameter 'on' oder 'off' fehlen!`)
        return embed
    }

    const guild = await getGuild(_bot)
    const announceChannel = await getTextChannel(_bot, announceChannelId)

    if (_args[0] === 'on') {
        if (voiceTrackerOnline === true) {
            embed.setDescription(`VoiceTracker ist bereits aktiviert!`)
            return embed
        } else {
            enableVoiceTracker()
            getAllMemberIdsInVoiceChannels(guild).forEach(memberId => {
                startTracking(memberId, announceChannel)
            })
            embed.setDescription(`VoiceTracker wurde eingeschaltet!`)
            return embed
        }
    }

    if (_args[0] === 'off') {
        if (voiceTrackerOnline === false) {
            embed.setDescription(`VoiceTracker ist bereits deaktiviert!`)
            return embed
        } else {
            disableVoiceTracker()
            getAllMemberIdsInVoiceChannels(guild).forEach(memberId => {
                endTracking(memberId, announceChannel, guild)
            })
            embed.setDescription(`VoiceTracker wurde ausgeschaltet!`)
            return embed
        }
    }

    embed.setDescription(`Nur die Parameter 'on' und 'off' sind gültig!`)
    return embed
}

export default tracker