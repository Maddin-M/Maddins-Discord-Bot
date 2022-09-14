import { Pool } from 'pg'
import { postgresUsername, postgresPassword, postgresHost, postgresPort, postgresDatabase } from './util/envUtil'

const postgres = new Pool({
    user: postgresUsername,
    password: postgresPassword,
    host: postgresHost,
    port: postgresPort,
    database: postgresDatabase,
})

export default postgres