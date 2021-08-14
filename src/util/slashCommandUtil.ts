import { ApplicationCommand } from 'discord.js'
import { token, serverId, clientId /*prefix, adminRoleId*/ } from '../config/config.json'
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const rest = new REST({ version: '9' }).setToken(token)

export function updateSlashCommands(slashCommandJSONs: ApplicationCommand[]) {
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.')
    
            await rest.put(
                Routes.applicationGuildCommands(clientId, serverId),
                // für echten bot den command nutzen 
                // Routes.applicationCommands(clientId),
                { body: slashCommandJSONs },
            )
    
            console.log('Successfully reloaded application (/) commands.')
        } catch (error) {
            console.error(error)
        }
    })()
}