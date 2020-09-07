import { Request } from '../types'
import commandList from '../commandList'
import { defaultEmbed, helpEmoji } from '../embed'

const help: Request = async () => {

    const embed = defaultEmbed(`Help  ${helpEmoji}`)

    commandList.forEach(command => {
        if (command.help) {
            embed.addField(formatUsage(command.help.usage), command.help.helpText)
        }
    })

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