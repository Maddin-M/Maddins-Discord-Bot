import { prefix } from './config/config.json'
import { Message } from 'discord.js'
import { Command } from './types'
import { defaultEmbed } from './embed'
import createchannel from './commands/createchannel'
import help from './commands/help'
import id from './commands/id'
import leader from './commands/leader'
import online from './commands/online'
import record from './commands/record'
import say from './commands/say'
import sum from './commands/sum'
import status from './commands/status'
import toggle from './commands/tracker'
import version from './commands/version'

export const commandList: Command[] = [
    {
        cmd: ['createchannel', 'cc'], handler: createchannel, adminOnly: false,
        help: { usage: [`${prefix}createchannel [Name]`, `${prefix}cc [Name]`], helpText: 'Erstellt einen temporären VoiceChannel' }
    },
    {
        cmd: ['help'], handler: help, adminOnly: false,
        help: { usage: [`${prefix}help`, `${prefix}help admin`], helpText: 'Wieso liest du dir das durch?' }
    },
    {
        cmd: ['id'], handler: id, adminOnly: true,
        help: { usage: [`${prefix}id [UserID]`], helpText: 'Zeigt den Benutzernamen der gegebenen UserID, wenn vorhanden' }
    },
    {
        cmd: ['leader'], handler: leader, adminOnly: false,
        help: { usage: [`${prefix}leader`, `${prefix}leader [Zahl]`], helpText: 'Zeigt eine Seite der Leute, die am meisten in VoiceChannels waren. Zahl für gewünschte Seite' }
    },
    {
        cmd: ['online'], handler: online, adminOnly: false,
        help: { usage: [`${prefix}online`, `${prefix}online [User]`], helpText: 'Zeigt an, wie lange du oder der von dir angegebene User in Voice Channels online waren' }
    },
    {
        cmd: ['record'], handler: record, adminOnly: false,
        help: { usage: [`${prefix}record`], helpText: 'Zeigt den derzeitigen Online-Rekord an' }
    },
    {
        cmd: ['say'], handler: say, adminOnly: true,
        help: { usage: [`${prefix}say [Message]`], helpText: 'Lässt den Bot lebendig werden' }
    },
    {
        cmd: ['status'], handler: status, adminOnly: false,
        help: { usage: [`${prefix}status`], helpText: 'Zeigt an, ob der VoiceTracker gerade aktiv ist' }
    },
    {
        cmd: ['sum'], handler: sum, adminOnly: false,
        help: { usage: [`${prefix}sum`], helpText: 'Zeigt die Summe der auf dem Server verbrachten Zeit im Voice' }
    },
    {
        cmd: ['tracker'], handler: toggle, adminOnly: true,
        help: { usage: [`${prefix}tracker [on/off]`], helpText: 'Schaltet den VoiceTracker ein und aus' }
    },
    {
        cmd: ['version'], handler: version, adminOnly: false,
        help: { usage: [`${prefix}version`], helpText: 'Zeigt die Version der App an' }
    }
]

export function commandNotFoundMessage(msg: Message): void {
    const embed = defaultEmbed(`Command existiert nicht  🤨`)
    embed.setDescription(`Schreibe \`${prefix}help\`, um eine Liste aller Befehle zu bekommen`)
    msg.channel.send(embed)
}