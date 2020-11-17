import { Pool } from 'pg'

const postgres = new Pool(
    {
        connectionString: process.env.DATABASE_URL, 
        ssl: { rejectUnauthorized: false }
    }
)

export default postgres