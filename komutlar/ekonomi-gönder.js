"use strict"
const { JSON } = require('odies.database');
const db = new JSON('database')
const Discord = require('discord.js')
module.exports = {
  config: {
    names: ["gönder", "ekonomi-gönder","ekonomigönder"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "owner"
  },
  run: async(client, message, args) => {
    if(args[0] === 'çip') {
      let user = message.mentions.members.first()

      let member = db.fetch(`çip_${message.guild.id}_${message.author.id}`)

      let embed1 = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayColor)
          .setDescription(` Çip göndereceğin kişiyi etiketle!`);

      if (!user) {
        return message.channel.send(embed1)
      }

      if (!args[2]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Ödenecek çip miktarını belirtmelisin!`).setColor(message.guild.me.displayColor));




      if (member < args[2]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Belirttiğin miktarda çipin yok!`).setColor(message.guild.me.displayColor));

      let embed3 = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayColor)
          .setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Negatif sayı yazamazsın!`);

      if (args[2].includes('-')) {
        return message.channel.send(embed3)
      }

      if(isNaN(args[2])) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Geçerli bir sayı belirtmelisin!`).setColor(message.guild.me.displayColor));

      if(args[3]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Sayıyı boşluk bırakmadan veya araya noktalama işaretleri koymadan yazmalısın!`).setColor(message.guild.me.displayColor));

      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** ${user.user.username} adlı kişiye ${args[2]} çip gönderildi!`).setColor(message.guild.me.displayColor));
      db.add(`çip_${message.guild.id}_${user.id}`, args[2])
      db.subtract(`çip_${message.guild.id}_${message.author.id}`, args[2])

    } else if(args[0] === 'altın') {

      let user = message.mentions.members.first()

      let member = db.fetch(`altın_${message.guild.id}_${message.author.id}`)

      let embed1 = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayColor)
          .setDescription(` Altın göndereceğin kişiyi etiketle!`);

      if (!user) {
        return message.channel.send(embed1)
      }

      if (!args[2]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Ödenecek altın miktarını belirtmelisin!`).setColor(message.guild.me.displayColor));




      if (member < args[2]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Belirttiğin miktarda altının yok!`).setColor(message.guild.me.displayColor));

      let embed3 = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayColor)
          .setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Negatif sayı yazamazsın!`);

      if (args[2].includes('-')) {
        return message.channel.send(embed3)
      }

      if(isNaN(args[2])) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Geçerli bir sayı belirtmelisin!`).setColor(message.guild.me.displayColor));

      if(args[3]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Sayıyı boşluk bırakmadan veya araya noktalama işaretleri koymadan yazmalısın!`).setColor(message.guild.me.displayColor));

      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** ${user.user.username} adlı kişiye ${args[2]} altın gönderildi!`).setColor(message.guild.me.displayColor));
      await db.subtract(`altın_${message.guild.id}_${message.author.id}`, args[2])
      db.add(`altın_${message.guild.id}_${user.id}`, args[2])
    } else {
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Hangi birimi göndermek istediğinizi belirtmelisiniz.\n\nÖrn:\n !gönder altın @kullanıcı miktar\n!gönder çip @kullanıcı miktar`).setColor(message.guild.me.displayColor));
    }

  }
}
