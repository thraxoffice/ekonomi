"use strict"
const { JSON } = require('odies.database');
const db = new JSON('database')
const { verify } = require('../Util.js');
const Discord = require('discord.js')
module.exports = {
  config: {
    names: ["ekonomi-zar", "zar", "ekonomizar"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "everyone"
  },
  run: async(client, message, args) => {

    const user = message.mentions.users.first()
    if(!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Bir kullanıcı etiketlemelisin!`).setColor(message.guild.me.displayColor))
    if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Oynanacak çip mikatı girmelisin!`).setColor(message.guild.me.displayColor))
    if(args[1] <= 0) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** 0 veya daha az çip miktarı giremezsin!`).setColor(message.guild.me.displayColor))
    let çip = parseInt(args[1]);
    let kullanıcı1 = await db.fetch(`çip_${message.guild.id}_${message.author.id}`)
    let kullanıcı2 = await db.fetch(`çip_${message.guild.id}_${user.id}`)

    if (çip > kullanıcı1) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Belirttiğin miktarda çipin yok!`).setColor(message.guild.me.displayColor));
    if (çip > kullanıcı2) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** <@${user.id}>'de belirttiğin miktarda çipi yok!`).setColor(message.guild.me.displayColor));

    this.fighting = new Set();
    let opponent = message.mentions.users.first()
    if (opponent.bot) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Botlar ile oynayamazsın!`).setColor(message.guild.me.displayColor));
    if (opponent.id === message.author.id) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Kendi kendine oynayamazsın!`).setColor(message.guild.me.displayColor));
    if (this.fighting.has(message.channel.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Her kanalda eşzamanlı tek oyun oynanabilir!`).setColor(message.guild.me.displayColor));
    this.fighting.add(message.channel.id);
    try {
      if (!opponent.bot) {
        await message.channel.send(new Discord.MessageEmbed().setColor(message.guild.me.displayColor).setDescription(`${opponent}, **${args[1]}** çipe zar oyunu oynamak istiyor musun.\nEn yüksek zarı atan kazanır.\n\`evet\` veya \`hayir\` olarak cevap veriniz.`));
        const verification = await verify(message.channel, opponent);
        if (!verification) {
          this.fighting.delete(message.channel.id);
          return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** İstek kabul edilmedi!`).setColor(message.guild.me.displayColor));
        }
      }

      let zar = Math.floor(Math.random() * 6) + 1
      let zar2 = Math.floor(Math.random() * 6) + 1

      if (zar === zar2) {
        zar = Math.floor(Math.random() * 6) + 1
        zar2 = Math.floor(Math.random() * 6) + 1
      } else if (zar > zar2) {
        message.channel.send(new Discord.MessageEmbed().setColor(message.guild.me.displayColor).setDescription(`<@${message.author.id}> Oyunu kazandı!\n\n<@${message.author.id}> attığı zar: **${zar}**\n<@${opponent.id}> attığı zar: **${zar2}**`))
        db.add(`çip_${message.guild.id}_${message.author.id}`, args[1] )
        db.subtract(`çip_${message.guild.id}_${opponent.id}`, args[1])
      } else if (zar < zar2){
        message.channel.send(new Discord.MessageEmbed().setColor(message.guild.me.displayColor).setDescription(`<@${opponent.id}> Oyunu kazandı!\n\n<@${message.author.id}> attığı zar: **${zar}**\n<@${opponent.id}> attığı zar: **${zar2}**`))
        db.subtract(`çip_${message.guild.id}_${message.author.id}`, args[1] )
        db.add(`çip_${message.guild.id}_${opponent.id}`, args[1])
      }

    }
    catch (err) {
      this.fighting.delete(message.channel.id);
      throw err;
    }
  }
}
