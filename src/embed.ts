import { MessageEmbed } from "discord.js"

export const defaultEmbed = (title?: string): MessageEmbed => {
    if (title) {
        return new MessageEmbed().setTitle(title).setColor("#62d0f6")
    } else {
        return new MessageEmbed().setColor("#62d0f6")
    }
}