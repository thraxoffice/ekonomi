"use strict"
const { JSON } = require('odies.database');
const db = new JSON('database')
const Discord = require('discord.js')
module.exports = {
  config: {
    names: ["ekonomi-satın-al", "satın-al", "ekonomisatınal"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "everyone"
  },
  run: async(client, message, args) => {

    let user = message.author;

    let author = db.fetch(`para_${message.guild.id}_${user.id}`)

    if (args[0] == 'araba') {
      if (author < 100000) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Araba almak için 100000 paraya ihtiyacın var!`).setColor(message.guild.me.displayColor));


      db.fetch(`araba_${message.guild.id}_${user.id}`);
      db.add(`araba_${message.guild.id}_${user.id}`, 1)

      db.subtract(`para_${message.guild.id}_${user.id}`, 100000)
      message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** 100.000 paraya araba alındı!`).setColor(message.guild.me.displayColor));

    } else if(args[0] == 'ev') {
      if (author < 120000) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Ev alabilmen için 120.000 paraya ihtiyacın var!`).setColor(message.guild.me.displayColor));


      db.fetch(`ev_${message.guild.id}_${user.id}`)
      db.add(`ev_${message.guild.id}_${user.id}`, 1)

      db.subtract(`para_${message.guild.id}_${user.id}`, 120000)
      return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** 120.000 paraya ev alındı!`).setColor(message.guild.me.displayColor));
    } else if(args[0] == 'saray') {
      if (author < 100000000) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Saray alabilmen için 100.000.000 paraya ihtiyacın var!`).setColor(message.guild.me.displayColor));


      db.fetch(`saray_${message.guild.id}_${user.id}`)
      db.add(`saray_${message.guild.id}_${user.id}`, 1)

      db.subtract(`para_${message.guild.id}_${user.id}`, 100000000)
      return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** 100.000.000 paraya saray alındı!`).setColor(message.guild.me.displayColor));
    } else if(args[0] == 'normal-pc') {
      if (author < 3.500) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Normal PC alabilmen için 3.500 paraya ihtiyacın var!`).setColor(message.guild.me.displayColor));


      db.fetch(`normalPc_${message.guild.id}_${user.id}`)
      db.add(`normalPc_${message.guild.id}_${user.id}`, 1)

      db.subtract(`para_${message.guild.id}_${user.id}`, 3500)
      return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** 3.500 paraya normal pc alındı!`).setColor(message.guild.me.displayColor));
    } else if(args[0] == 'gamer-pc') {
      if (author < 12500) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** gamer pc alabilmen için 12.500 paraya ihtiyacın var!`).setColor(message.guild.me.displayColor));


      db.fetch(`gamerPc_${message.guild.id}_${user.id}`)
      db.add(`gamerPc_${message.guild.id}_${user.id}`, 1)

      db.subtract(`para_${message.guild.id}_${user.id}`, 12500)
      return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** 12500 paraya gamer pc alındı!`).setColor(message.guild.me.displayColor));
    }else if(args[0] == 'telefon') {
      if (author < 10000) return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** telefon alabilmen için 10.000 paraya ihtiyacın var!`).setColor(message.guild.me.displayColor));


      db.fetch(`telefon_${message.guild.id}_${user.id}`)
      db.add(`telefon_${message.guild.id}_${user.id}`, 1)

      db.subtract(`para_${message.guild.id}_${user.id}`, 10000)
      return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** 10.000 paraya telefon alındı!`).setColor(message.guild.me.displayColor));
    }
    else {
      return message.channel.send(new Discord.MessageEmbed().setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Alacağın eşyayı belirtmelisin!`).setColor(message.guild.me.displayColor));

    }
  }
}
