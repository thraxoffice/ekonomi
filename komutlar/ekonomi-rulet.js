"use strict"
const { JSON } = require('odies.database');
const db = new JSON('database')
const Discord = require('discord.js')
module.exports = {
  config: {
    names: ["ekonomi-rulet", "rulet", "ekonomirulet"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "everyone"
  },
  run: async(client, message, args) => {

    let user = message.author;
    let colour = args[0];
    let money = parseInt(args[1]);
    let moneydb = await db.fetch(`çip_${message.guild.id}_${user.id}`)

    let greenSans = Math.floor(Math.random()* 10)
    let redSans = Math.floor(Math.random()* 5)
    let blackSans = Math.floor(Math.random()* 7)


    if (!colour)  return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Bir renk belirtmelisin! | Red [1.5x] Black [2x] Green [5x]`).setColor(message.guild.me.displayColor));
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Oynamak için bir sayı belirtmelisin! | !rulet <renk> <sayı>`).setColor(message.guild.me.displayColor));

    if (money > moneydb) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Belirttiğin miktarda çipin yok!`).setColor(message.guild.me.displayColor));


    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Bir renk belirtmelisin! | Red [1.5x] Black [2x] Green [5x]`).setColor(message.guild.me.displayColor));


    if (greenSans === 4 && colour == 2) { // Green
      moneyx = parseInt(money * 5)
      db.add(`çip_${message.guild.id}_${user.id}`, moneyx)
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **KAZANDIN:** ${moneyx} çip kazandın!`).setColor(message.guild.me.displayColor));

    } else if (redSans === 4 && colour == 1) { // Red
      moneyx = parseInt(money * 1.5)
      db.add(`çip_${message.guild.id}_${user.id}`, moneyx)
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **KAZANDIN:** ${moneyx} çip kazandın!`).setColor(message.guild.me.displayColor));

    } else if (blackSans === 4 && colour == 0) { // Black
      moneyx = parseInt(money * 2)
      db.add(`çip_${message.guild.id}_${user.id}`, moneyx)
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **KAZANDIN:** ${moneyx} çip kazandın!`).setColor(message.guild.me.displayColor));

    } else { // Wrong
      db.subtract(`çip_${message.guild.id}_${user.id}`, money)
      return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **KAYBETTİN:** ${money} çip kaybettin!`).setColor(message.guild.me.displayColor));
    }
  }
}
