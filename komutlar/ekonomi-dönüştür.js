"use strict"
const Discord = require('discord.js')
const { JSON } = require('odies.database');
const db = new JSON('database')
module.exports = {
  config: {
    names: ["ekonomi-dönüştür", "dönüştür", "ekonomidönüştür"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "everyone"
  },
  run: async(client, message, args) => {

    if(args[0] === 'çip') {
      let member = db.fetch(`altın_${message.guild.id}_${message.author.id}`)


      if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Çipe dönüştürülecek altın miktarını belirtmelisin!`).setColor(message.guild.me.displayColor));

      if (member < args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Belirttiğin miktarda altının yok!`).setColor(message.guild.me.displayColor));

      let embed3 = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayColor)
          .setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Negatif sayıda altın dönüştüremezsin!`);

      if (args[1].includes('-')) {
        return message.channel.send(embed3)
      }

      if(isNaN(args[1])) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Geçerli bir sayı belirtmelisin!`).setColor(message.guild.me.displayColor));

      if(args[2]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Sayıyı boşluk bırakmadan veya araya noktalama işaretleri koymadan yazmalısın!`).setColor(message.guild.me.displayColor));

      db.subtract(`altın_${message.guild.id}_${message.author.id}`, args[1])
      db.add(`çip_${message.guild.id}_${message.author.id}`, args[1])
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** ${args[1]} altın, ${args[1]} çipe dönüştürüldü!`).setColor(message.guild.me.displayColor));


    }

    else if (args[0] === 'altın') {
      let member = db.fetch(`çip_${message.guild.id}_${message.author.id}`)


      if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Altına dönüştürülecek çip miktarını belirtmelisin!`).setColor(message.guild.me.displayColor));

      if (member < args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Belirttiğin miktarda çipin yok!`).setColor(message.guild.me.displayColor));

      let embed3 = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayColor)
          .setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Negatif sayıda çip dönüştüremezsin!`);

      if (args[1].includes('-')) {
        return message.channel.send(embed3)
      }

      if(isNaN(args[1]) ||args[1].includes('.') || args[1].includes(',')) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Geçerli bir sayı belirtmelisin!`).setColor(message.guild.me.displayColor));

      if(args[2]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Sayıyı boşluk bırakmadan veya araya noktalama işaretleri koymadan yazmalısın!`).setColor(message.guild.me.displayColor));

      let altinMiktar = args[1] - (args[1] / 4)
      db.subtract(`çip_${message.guild.id}_${message.author.id}`, args[1])
      db.add(`altın_${message.guild.id}_${message.author.id}`, altinMiktar)
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** ${args[1]} çip, ${altinMiktar} altına dönüştürüldü!`).setColor(message.guild.me.displayColor));
    } else {
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Altını çipe dönüştürmek için \`!dönüştür çip <miktar>\`\n Çipi Altına dönüştürmek için \`!dönüştür altın <miktar>\``).setColor(message.guild.me.displayColor));

    }
  }
}
