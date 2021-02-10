"use strict"
const { JSON } = require('odies.database');
const db = new JSON('database')
const Discord = require('discord.js')
module.exports = {
  config: {
    names: ["ekonomi-para-ekle", "para-ekle", "ekonomiparaekle"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "everyone"
  },
  run: async(client, message, args) => {
    const veri = await db.fetch(`altın_${message.guild.id}_${user.id}`)
    const veri2 = await db.fetch(`çip_${message.guild.id}_${user.id}`)
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Bu komutu kullanabilmen için Üyeleri Yasakla yetkisine sahip olmalısın!`).setColor(message.guild.me.displayColor));
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Bir seçenek belirtmelisin. [altın / çip]`).setColor(message.guild.me.displayColor));
    if(args[0] !== 'altın' || args[0] !== 'çip') return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Yanlış kullanım!\n!para-ekle [altın / çip] @para-eklenecek-üye [gönderilecek miktar]`).setColor(message.guild.me.displayColor));
    if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** ${args[0]} göndereceğin üyeyi etiketlemelisin!`).setColor(message.guild.me.displayColor));
    if(!args[1].includes('@')) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Bir kullanıcı etiketlemelisin!`).setColor(message.guild.me.displayColor));
    if(isNaN(args[2])) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Geçerli bir sayı girmelisin!`).setColor(message.guild.me.displayColor));
    if(args[3]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Geçerli bir sayı girmelisin!`).setColor(message.guild.me.displayColor));

    if(args[0] === 'altın') {
      if(veri == null) {
        await db.set(`altın_${message.guild.id}_${user.id}`, args[2])
        message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** ${args[1]} adlı kullanıcıya ${args[2]} miktar altın gönderildi!`).setColor(message.guild.me.displayColor));
      } else {
        await db.add(`altın_${message.guild.id}_${user.id}`, args[2])
        message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** ${args[1]} adlı kullanıcıya ${args[2]} miktar altın gönderildi!`).setColor(message.guild.me.displayColor));
      }
    }

    if(args[0] === 'çip') {
      if(vari2 == null) {
        await db.set(`çip_${message.guild.id}_${user.id}`, args[2])
        message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** ${args[1]} adlı kullanıcıya ${args[2]} miktar çip gönderildi!`).setColor(message.guild.me.displayColor));

      } else {
        await db.add(`çip_${message.guild.id}_${user.id}`, args[2])
        message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** ${args[1]} adlı kullanıcıya ${args[2]} miktar çip gönderildi!`).setColor(message.guild.me.displayColor));
      }

    }


  }
}
