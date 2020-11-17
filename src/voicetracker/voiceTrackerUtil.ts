import { VoiceState, TextChannel, Guild } from "discord.js";
import { getMember, getRole } from '../util/discordUtil'
import { rewardRoles, ignoredChannels } from '../config/config.json'
import { addUser, updateLastJoined, updateOnlineSeconds, getUserTimeData, getUser, getOnlineRecord, insertIntoOnlineRecord, updateOnlineRecord } from '../util/sqlUtil'
import { toHoursNumber, formatSeconds, toDateString } from '../util/timeUtil'
import { UserSeconds } from '../types'

// voice tracking is disabled after deploying, has to be activated by hand
let voiceTrackerOnline = false

export async function startTracking(userId: string, announceChannel: TextChannel): Promise<void> {

    const userResult = await getUser(userId)

    if (userResult.rowCount === 0) {
        await addUser(userId)
        announceChannel.send(`<@${userId}> ist das erste Mal in einen Voicechannel gegangen!`)
        
    } else {
        const userId = userResult.rows[0].id
        await updateLastJoined(userId)
    }
}

export async function endTracking(userId: string, announceChannel: TextChannel, guild: Guild) {

    const userResult = await getUser(userId)
    if (userResult.rowCount === 0) return

    const userSeconds = await updateLeaderboard(userId)
    await updateRecord(userId, userSeconds, announceChannel)
    await updateRoles(userId, userSeconds, announceChannel, guild)
}

async function updateLeaderboard(userId: string): Promise<UserSeconds> {
    const userTimeDataResult = await getUserTimeData(userId)
    const currentTime = new Date()
    const lastJoined = userTimeDataResult.rows[0].last_joined
    const difference = currentTime.getTime() - lastJoined.getTime()
    const newSeconds = ~~(difference / 1000)
    const oldSeconds = userTimeDataResult.rows[0].total_online_seconds
    const totalSeconds = oldSeconds + newSeconds
    await updateOnlineSeconds(userId, totalSeconds)
    return {
        oldSeconds: oldSeconds,
        newSeconds: newSeconds,
        totalSeconds: totalSeconds
    }
}

async function updateRecord(userId: string, userSeconds: UserSeconds, announceChannel: TextChannel): Promise<void> {
    const recordResult = await getOnlineRecord()
    if (recordResult.rowCount === 0) {
        announceChannel.send(`**Neuer Rekord!**  🏆  <@${userId}> hat einen neuen Online-Rekord aufgestellt! \`${formatSeconds(userSeconds.newSeconds)}\``)
        insertIntoOnlineRecord(userSeconds.newSeconds, userId)

    } else if (recordResult.rows[0].record_seconds < userSeconds.newSeconds) {
        const oldRecord = recordResult.rows[0].record_seconds
        const oldRecordUser = recordResult.rows[0].user_id
        const oldRecordDate = toDateString(recordResult.rows[0].record_date)
        announceChannel.send(`**Neuer Rekord!**  🏆  <@${userId}> hat einen neuen Online-Rekord aufgestellt! \`${formatSeconds(userSeconds.newSeconds)}\`
(Alter Rekord: \`${formatSeconds(oldRecord)}\` aufgestellt am \`${oldRecordDate}\` von <@${oldRecordUser}>)`)
        updateOnlineRecord(userSeconds.newSeconds, userId, oldRecordUser)
    }
}

async function updateRoles(userId: string, userSeconds: UserSeconds, announceChannel: TextChannel, guild: Guild): Promise<void> {
    const member = await getMember(guild, userId)
    rewardRoles
        .sort((role1, role2) => role1.seconds - role2.seconds)
        .forEach(async _role => {
            if (userSeconds.oldSeconds < _role.seconds && userSeconds.totalSeconds >= _role.seconds) {

                const role = await getRole(guild, _role.roleId)
                if (role && member) {
                    announceChannel.send(`<@${userId}> ist insgesamt mehr als ${toHoursNumber(_role.seconds)} Stunden im Voice gewesen und hat die "${role.name}"-Rolle erhalten  🎉`)
                    member.roles.add(_role.roleId)
                }
            }
        })
}

export function enableVoiceTracker() {
    voiceTrackerOnline = true
}

export function disableVoiceTracker() {
    voiceTrackerOnline = false
}

export function enteredChannel(oldState: VoiceState, newState: VoiceState): boolean {
    return (oldState.channelID === null || oldState.channelID === undefined || ignoredChannels.includes(oldState.channelID)) && 
            newState.channelID !== null && newState.channelID !== undefined && !ignoredChannels.includes(newState.channelID)
}

export function leftChannel(oldState: VoiceState, newState: VoiceState): boolean {
    return (newState.channelID === null || newState.channelID === undefined || ignoredChannels.includes(newState.channelID)) && 
            oldState.channelID !== null && oldState.channelID !== undefined && !ignoredChannels.includes(oldState.channelID)
}

export { voiceTrackerOnline }