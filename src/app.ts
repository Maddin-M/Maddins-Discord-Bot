import { token, prefix, adminRole } from './config.json'
import commandList from './commandList'
import { Client } from 'discord.js'
import voiceStateUpdate from './voiceStateUpdate'
import { memberHasRole } from './cache'

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
    if (msg.content.indexOf(prefix) === 0) return

    const args = msg.content.split(' ')
    const command = args.shift()
    if (!command) return

    const resolver = commandList.find(resolver => resolver.cmd === command.substr(prefix.length) && (!resolver.adminOnly || memberHasRole(bot, msg.author.id, adminRole)))
    if (!resolver) return

    const result = await resolver.handler(bot, msg, args)
    msg.channel.send(result)
})

bot.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.member?.user.bot) return

    voiceStateUpdate(bot, oldState, newState)
})