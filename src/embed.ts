import { EmbedBuilder } from "discord.js"

export const defaultEmbed = (title?: string): EmbedBuilder => {
    if (title) {
        return new EmbedBuilder().setTitle(title).setColor("#62d0f6")
    } else {
        return new EmbedBuilder().setColor("#62d0f6")
    }
}