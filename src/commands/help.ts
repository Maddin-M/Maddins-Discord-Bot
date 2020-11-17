import { Request } from '../types'
import { Client, Message } from 'discord.js'
import { commandList } from '../commandList'
import { defaultEmbed } from '../embed'

const help: Request = async (_bot: Client, _msg: Message, _args: string[]) => {

    const embed = defaultEmbed(`Help  🤔`)

    if (_args[0] === 'admin') {
        commandList.filter(cmd => cmd.adminOnly).forEach(command => {
            embed.addField(formatUsage(command.help.usage), command.help.helpText)
        })
    } else {
        commandList.filter(cmd => !cmd.adminOnly).forEach(command => {
            embed.addField(formatUsage(command.help.usage), command.help.helpText)
        })
    }

    return embed
}

function formatUsage(array: Array<string>): string {
    let result = ''
    for (const usage of array) {
        result = result.concat(`\`${usage}\`  `)
    }
    return result;
}

export default help