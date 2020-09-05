import { Client, VoiceState } from "discord.js";
import { ignoredChannels, announceChannel, rewardRoles } from './config.json'
import postgres from './postgres'
import { getTextChannel, getUsername, getUser, getMember, getRole } from './cache'
import { happyEmoji } from './embed'
import { toHoursNumber } from './timeUtil'

const voiceStateUpdate = async (_bot: Client, _oldState: VoiceState, _newState: VoiceState) => {

    if (enteredChannel(_oldState, _newState)) {

        const id = _oldState.id
        const res = await postgres.query('SELECT ID FROM USERS WHERE ID = $1', [id])
        if (res.rowCount === 0) {
            await postgres.query('INSERT INTO USERS(ID, TOTAL_ONLINE_SECONDS, LAST_JOINED) VALUES($1, 0, $2) ON CONFLICT DO NOTHING', [id, new Date()])
            getTextChannel(_bot, announceChannel).send(`${getUsername(_bot, id)} ist das erste Mal in einen Voicechannel gegangen! ${happyEmoji}`)

        } else {
            await postgres.query('UPDATE USERS SET LAST_JOINED = $1 WHERE ID = $2', [new Date(), id])
        }

    } else if (leftChannel(_oldState, _newState)) {

        const id = _oldState.id
        const res = await postgres.query('SELECT ID FROM USERS WHERE ID = $1', [id])
        if (res.rowCount === 0) return

        const res2 = await postgres.query('SELECT LAST_JOINED, TOTAL_ONLINE_SECONDS FROM USERS WHERE ID = $1', [id])
        const currentTime = new Date()
        const joinTime = res2.rows[0].last_joined
        const difference = currentTime.getTime() - joinTime.getTime()
        const newSeconds = ~~(difference / 1000)
        const oldSeconds = res2.rows[0].total_online_seconds
        const totalSeconds = oldSeconds + newSeconds

        await postgres.query('UPDATE USERS SET TOTAL_ONLINE_SECONDS = $1 WHERE ID = $2', [totalSeconds, id])
        
        rewardRoles
            .sort((role1, role2) => role1.seconds - role2.seconds)
            .forEach(role => {
                if (oldSeconds < role.seconds && totalSeconds >= role.seconds) {
                    getTextChannel(_bot, announceChannel).send(`${getUser(_bot, id)} ist mehr als ${toHoursNumber(role.seconds)} Stunden im Voice gewesen und hat die "${getRole(_bot, role.roleId).name}"-Rolle erhalten ${happyEmoji}`)
                    getMember(_bot, id).roles.add(role.roleId)
                }
            })
    }
}

function enteredChannel(oldState: VoiceState, newState: VoiceState): boolean {
    return (oldState.channelID === null || oldState.channelID === undefined || ignoredChannels.includes(oldState.channelID)) && 
            newState.channelID !== null && newState.channelID !== undefined && !ignoredChannels.includes(newState.channelID)
}

function leftChannel(oldState: VoiceState, newState: VoiceState): boolean {
    return (newState.channelID === null || newState.channelID === undefined || ignoredChannels.includes(newState.channelID)) && 
            oldState.channelID !== null && oldState.channelID !== undefined && !ignoredChannels.includes(oldState.channelID)
}

export default voiceStateUpdate