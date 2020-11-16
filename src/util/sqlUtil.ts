import { QueryResult } from "pg"
import postgres from '../postgres'

export const getUser = async (userId: string): Promise<QueryResult<any>> => {
    return await postgres.query('SELECT ID FROM USERS WHERE ID = $1', [userId])
}

export const addUser = async (userId: string): Promise<void> => {
    await postgres.query('INSERT INTO USERS(ID, TOTAL_ONLINE_SECONDS, LAST_JOINED) VALUES($1, 0, $2) ON CONFLICT DO NOTHING', [userId, new Date()])
}

export const getUserTimeData = async (userId: string): Promise<QueryResult<any>> => {
    return await postgres.query('SELECT LAST_JOINED, TOTAL_ONLINE_SECONDS FROM USERS WHERE ID = $1', [userId])
}

export const updateLastJoined = async (userId: string): Promise<void> => {
    await postgres.query('UPDATE USERS SET LAST_JOINED = $1 WHERE ID = $2', [new Date(), userId])
}

export const updateOnlineSeconds = async (userId: string, totalSeconds: number): Promise<void> => {
    await postgres.query('UPDATE USERS SET TOTAL_ONLINE_SECONDS = $1 WHERE ID = $2', [totalSeconds, userId])
}

export const getOnlineRecord = async (): Promise<QueryResult<any>> => {
    return await postgres.query('SELECT * FROM ONLINE_RECORD')
}

export const insertIntoOnlineRecord = async (newRecord: number, userId: string): Promise<void> => {
    await postgres.query('INSERT INTO ONLINE_RECORD(RECORD_SECONDS, USER_ID, RECORD_DATE) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [newRecord, userId, new Date()])
}

export const updateOnlineRecord = async (newRecord: number, userId: string, oldRecordUserId: string): Promise<void> => {
    await postgres.query('UPDATE ONLINE_RECORD SET RECORD_SECONDS = $1, USER_ID = $2, RECORD_DATE = $3 WHERE USER_ID = $4', [newRecord, userId, new Date(), oldRecordUserId])
}