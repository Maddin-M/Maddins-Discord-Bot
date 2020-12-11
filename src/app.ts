import { token, prefix, adminRoleId } from './config/config.json'
import { commandList, commandNotFoundMessage } from './commandList'
import { Client } from 'discord.js'
import { memberHasRole } from './util/discordUtil'
import { voiceStateUpdate } from './voicetracker/voiceTrackerLogic'
import { customChannelUpdate } from './customchannel/customChannelLogic'

const bot = new Client()

bot.login(token)

bot.on('ready', () => {
    if(bot.user) {
        console.log(`Logged in as ${bot.user.tag}!`)
        bot.user.setActivity(`${prefix}help`)
    }
})

bot.on('message', async (msg) => {
    if (msg.author.bot) return
    if (msg.channel.type === 'dm') return
    if (msg.content.indexOf(prefix) !== 0) return
    
    const args = msg.content.split(' ')
    const command = args.shift()
    if (!command) return

    const hasAdminRole = await memberHasRole(bot, msg.author.id, adminRoleId)
    const resolver = commandList.find(resolver => resolver.cmd.indexOf(command.substr(prefix.length)) > -1 && (!resolver.adminOnly || hasAdminRole))
    if (!resolver) {
        commandNotFoundMessage(msg)
        return
    }

    const result = await resolver.handler(bot, msg, args)
    msg.channel.send(result)
})

bot.on('voiceStateUpdate', async (oldState, newState) => {
    await voiceStateUpdate(bot, oldState, newState)
    await customChannelUpdate(bot, oldState, newState)
})