"use strict"
const Discord = require('discord.js')
const { JSON } = require('odies.database');
const db = new JSON('database')
module.exports = {
    config: {
        names: ["ekonomi-şirket", "şirket", "ekonomişirket"],
        description: "Odies Development - Ekonomi Sistemi.",
        usage: "",
        permAuthor: "everyone"
    },
    run: async(client, message, args) => {
        const user = message.author
        const veri = await db.fetch(`şirket_${message.guild.id}`)
        const altin = await db.fetch(`altın_${message.guild.id}_${user.id}`)
        if(veri == null ||veri === 0) {
            return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Henüz bir şirket oluşturmadınız!`)
                .setColor(message.guild.me.displayColor));
            if(args[0] === 'al') {
                const altin = await db.fetch(`altın_${message.guild.id}_${user.id}`)
                if(altin < 5000) return message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Şirket almak için min 5.000 altınınız olmalı!`)
                    .setColor(message.guild.me.displayColor));
                await db.set(`şirket_${message.guild.id}`, 1)
                const user = message.author
                db.subtract(`altın_${message.guild.id}_${user.id}`, 5000)
                message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** 5.000 altın karşılığında şirket aldınız!`)
                    .setColor(message.guild.me.displayColor));
            }
        } else if(args[0] === 'büyüt') {
            if(altin < veri * 5000 + 5000) return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`${client.emojis.cache.get(client.emojiler.x)} | **Hata:** Şirketinizi büyütebilmeniz için ${veri * 5000 + 5000} altınınız olmalı!`)
                .setColor(message.guild.me.displayColor));
            else {
                await db.add(`altın_${message.guild.id}`)
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`${client.emojis.cache.get(client.emojiler.tik)} | **Başarılı:** Şirketinizi ${veri * 5000 + 5000} altın karşılığı büyüttünüz!`)
                .setColor(message.guild.me.displayColor));
            }

        }
    }
}
