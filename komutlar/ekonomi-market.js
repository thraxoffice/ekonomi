"use strict"
const Discord = require('discord.js')
module.exports = {
  config: {
    names: ["ekonomi-market", "market", "ekonomimarket"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "everyone"
  },
  run: async(client, message, args) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Market")
        .addField("Araba", "100.000 Para\n!satın-al araba")
        .addField("Ev", "400.000 Para\n!satın-al ev")
        .addField("Saray","100.000.000 Para\n!satın-al saray")
        .addField("Normal PC","3.500 Para\n!satın-al pc")
        .addField("Gamer PC","12.500 Para\n!satın-al gamer-pc")
        .addField("Telefon","10.000 Para\n!satın-al telefon")
        .setColor(message.guild.me.displayColor)
    message.channel.send(embed)
  }
}
