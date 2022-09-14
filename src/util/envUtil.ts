import { RewardRole } from "../types"

export const token: string = process.env.TOKEN ?? throwExpression("token-missing")

export const clientId: string = process.env.CLIENT_ID ?? throwExpression("cliend-id-missing")

export const serverId: string = process.env.SERVER_ID ?? throwExpression("server-id-missing")

export const adminRoleId: string = process.env.ADMIN_ROLE_ID ?? throwExpression("admin-role-id-missing")

export const everyoneRoleId: string = process.env.EVERYONE_ROLE_ID ?? throwExpression("everyone-role-id-missing")

export const announceChannelId: string = process.env.ANNOUNCE_CHANNEL_ID ?? throwExpression("announce-channel-id-missing")

export const customChannelCategoryId: string = process.env.CUSTOM_CHANNEL_CATEGORY_ID ?? throwExpression("custom-channel-category-missing")

export const ignoredChannelIds: string[] = process.env.IGNORED_CHANNEL_IDS?.split(',') ?? throwExpression("ignored-channel-ids-missing")

export const rewardRoles: RewardRole[] = JSON.parse(process.env.REWARD_ROLES ?? throwExpression("reward-roles-missing"))

export const postgresUsername: string = process.env.POSTGRES_USERNAME ?? throwExpression("postgres-username-missing")

export const postgresPassword: string = process.env.POSTGRES_PASSWORD ?? throwExpression("postgres-password-missing")

export const postgresHost: string = process.env.POSTGRES_HOST ?? throwExpression("postgres-host-missing")

export const postgresPort: number = +(process.env.POSTGRES_PORT ?? throwExpression("postgres-port-missing"))

export const postgresDatabase: string = process.env.POSTGRES_DATABASE ?? throwExpression("postgres-database-missing")

function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage)
}