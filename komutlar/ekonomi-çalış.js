"use strict"
const { JSON } = require('odies.database');
const db = new JSON('database')
const Discord = require('discord.js')
const ms = require("parse-ms");
module.exports = {
  config: {
    names: ["ekonomi-çalış", "çalış", "ekonomiçalış"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "everyone"
  },
  run: async(client, message, args) => {

    let user = message.author;
    let author = await db.fetch(`iş_${message.guild.id}_${user.id}`)
    let timeout = 86400000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      let timeEmbed = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayColor)
          .setDescription(`Yakın zaman içinde çalıştın!\n\n  ${time.hours} Saat  ${time.minutes} Dakika ${time.seconds} Saniye sonra tekrar çalışabilirsin! `);
      message.channel.send(timeEmbed)
    } else {
      await db.set(`iş_${message.guild.id}_${user.id}`, Date.now())
      let sonucc = ['Yazılımcı','Amele','Garson','Şöför','Aşçı','Mühendis']

      let sss = Math.floor((Math.random() * sonucc.length));
      let mik = Math.floor(Math.random() * 100) + 200;
      let embed1 = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayColor)
          .setDescription(` ${sonucc[sss]} Olarak çalıştın ve  ${mik} altın kazandın`);
      message.channel.send(embed1)

      db.add(`altin_${message.guild.id}_${user.id}`, mik)

    };

  }
}
