import { MessageEmbed } from "discord.js";

const random = (array: Array<string>): string => {
    return array[Math.floor(Math.random() * array.length)]
}

export const happyEmoji = random(["😍", "🥳", "🤩", "🤗", "🤑", "👍", "👏", "👌", "🍻", "🎉"])
export const lookingEmoji = random(["😏", "🧐", "🤓", "🤡", "👀"])
export const sadEmoji = random(["🤬", "😡", "😭", "🤢", "🤮", "🤥", "👿", "💩", "😱"])
export const leaderEmoji = random(["🏆", "🍻", "🏅", "🎖️", "🎯", "🎆", "🌠", "🆒"])
export const helpEmoji = random(["😵", "🤯", "🥵", "🥱", "🤔", "🥴"])
export const sumEmoji = random(["📈", "⏱️", "📏"])

export const defaultEmbed = (title: string): MessageEmbed => new MessageEmbed()
    .setTitle(title)
    .setColor("#7289da")