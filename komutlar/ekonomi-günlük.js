"use strict"
const { JSON } = require('odies.database');
const db = new JSON('database')
const Discord = require('discord.js')
const ms = require("parse-ms");
module.exports = {
  config: {
    names: ["ekonomi-günlük", "günlük", "ekonomigünlük"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "everyone"
  },
  run: async(client, message, args) => {

    let user = message.author;

    let zaman = 86400000;
    let miktar = 100;

    let gunluk = await db.fetch(`günlük_${message.guild.id}_${user.id}`);

    if (gunluk !== null && zaman - (Date.now() - gunluk) > 0) {
      let time = ms(zaman - (Date.now() - gunluk));
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Günlük ödülünü alabilmen için ${time.hours} Saat ${time.minutes} Dakika ${time.seconds} Saniye beklemelisin!`).setColor(message.guild.me.displayColor));
    } else {
      await db.set(`günlük_${message.guild.id}_${user.id}`, Date.now())
      const veri = await db.fetch(`şirket_${message.guild.id}`)
      db.add(`altın_${message.guild.id}_${user.id}`, veri * miktar + miktar)
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** ${miktar} altın kazandın!`).setColor(message.guild.me.displayColor));
    }
  }
}
