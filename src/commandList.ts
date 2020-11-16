import { prefix } from './config.json'
import { Command } from './types'
import help from './commands/help'
import id from './commands/id'
import leader from './commands/leader'
import online from './commands/online'
import record from './commands/record'
import say from './commands/say'
import sum from './commands/sum'
import status from './commands/voiceTrackerStatus'
import toggle from './commands/voiceTrackerToggle'
import version from './commands/version'

const commandList: Command[] = [
    {
        cmd: 'help', handler: help, adminOnly: false,
        help: { usage: [`${prefix}help`, `${prefix}help admin`], helpText: 'Wieso liest du dir das durch?' }
    },
    {
        cmd: 'id', handler: id, adminOnly: true,
        help: { usage: [`${prefix}id [UserID]`], helpText: 'Zeigt den Benutzernamen der gegebenen UserID, wenn vorhanden' }
    },
    {
        cmd: 'leader', handler: leader, adminOnly: false,
        help: { usage: [`${prefix}leader`, `${prefix}leader [Zahl]`],helpText: 'Zeigt eine Seite der Leute, die am meisten in VoiceChannels waren. Zahl für gewünschte Seite' }
    },
    {
        cmd: 'online', handler: online, adminOnly: false,
        help: { usage: [`${prefix}online`, `${prefix}online [User]`], helpText: 'Zeigt an, wie lange du oder der von dir angegebene User in Voice Channels online waren' }
    },
    {
        cmd: 'record', handler: record, adminOnly: false,
        help: { usage: [`${prefix}record`], helpText: 'Zeigt den derzeitigen Online-Rekord an' }
    },
    {
        cmd: 'say', handler: say, adminOnly: true,
        help: { usage: [`${prefix}say [Message]`], helpText: 'Lässt den Bot lebendig werden' }
    },
    {
        cmd: 'sum', handler: sum, adminOnly: false,
        help: { usage: [`${prefix}sum`], helpText: 'Zeigt die Summe der auf dem Server verbrachten Zeit im Voice' }
    },
    {
        cmd: 'status', handler: status, adminOnly: false,
        help: { usage: [`${prefix}status`], helpText: 'Zeigt an, ob der VoiceTracker gerade aktiv ist' }
    },
    {
        cmd: 'tracker', handler: toggle, adminOnly: true,
        help: { usage: [`${prefix}tracker [on/off]`], helpText: 'Schaltet den VoiceTracker ein und aus' }
    },
    {
        cmd: 'version', handler: version, adminOnly: false,
        help: { usage: [`${prefix}version`], helpText: 'Zeigt die Version der App an' }
    }
]

export default commandList