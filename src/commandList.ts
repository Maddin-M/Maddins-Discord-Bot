import { prefix } from './config.json'
import { Command } from './types'
import help from './commands/help'
import id from './commands/id'
import leader from './commands/leader'
import online from './commands/online'
import sum from './commands/sum'
import newdatabase from './commands/newDatabase'
import clean from './commands/clean'
import say from './commands/say'

const commandList: Command[] = [
    {
        cmd: 'leader', 
        handler: leader,
        adminOnly: false,
        help: {
            usage: [`${prefix}leader`, `${prefix}leader [Zahl]`],
            helpText: 'Zeigt die Top 5, der Leute, die am meisten in Voice Channels waren. Zahl für gewünschte Seite'
        }
    },
    {
        cmd: 'online', 
        handler: online,
        adminOnly: false,
        help: {
            usage: [`${prefix}online`, `${prefix}online [User]`],
            helpText: 'Zeigt an, wie lange du oder der von dir angegebene User in Voice Channels online waren'
        }
    },
    {
        cmd: 'sum',
        handler: sum,
        adminOnly: false,
        help: {
            usage: [`${prefix}sum`],
            helpText: 'Zeigt die Summe der auf dem Server verbrachten Zeit im Voice'
        }
    },
    {
        cmd: 'help', 
        handler: help,
        adminOnly: false
    },
    {
        cmd: 'id', 
        handler: id,
        adminOnly: true
    },
    {
        cmd: 'newdatabase',
        handler: newdatabase,
        adminOnly: true
    },
    {
        cmd: 'clean',
        handler: clean,
        adminOnly: true
    },
    {
        cmd: 'say',
        handler: say,
        adminOnly: true
    }
]

export default commandList