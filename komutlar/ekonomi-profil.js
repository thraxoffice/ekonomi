"use strict"
const { JSON } = require('odies.database');
const db = new JSON('database')
const Discord = require('discord.js')
module.exports = {
  config: {
    names: ["ekonomi-profil", "profil", "ekonomiprofil"],
    description: "Odies Development - Ekonomi Sistemi.",
    usage: "",
    permAuthor: "everyone"
  },
  run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author;

    let altın = await db.fetch(`altın_${message.guild.id}_${user.id}`)
    if (altın === null) altın = 0;

    let çip = await db.fetch(`çip_${message.guild.id}_${user.id}`)
    if (çip === null) çip = 0;


    let newcar = await db.fetch(`araba_${message.guild.id}_${user.id}`)
    if(newcar === null) newcar = '0'

    let newhouse = await db.fetch(`ev_${message.guild.id}_${user.id}`)
    if(newhouse === null) newhouse = '0'

    let newsaray = await db.fetch(`saray_${message.guild.id}_${user.id}`)
    if(newsaray === null) newsaray = '0'

    let newnormalPc = await db.fetch(`normalPc_${message.guild.id}_${user.id}`)
    if(newnormalPc === null) newnormalPc = '0'

    let newgamerPc = await db.fetch(`gamerPc_${message.guild.id}_${user.id}`)
    if(newgamerPc === null) newgamerPc = '0'

    let newtelefon = await db.fetch(`telefon_${message.guild.id}_${user.id}`)
    if(newtelefon === null) newtelefon = '0'




    let moneyEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayColor)
        .setThumbnail(user.displayAvatarURL())
        .setDescription(`**${user} Profili**\n\nAltını: ${altın}\nÇipi: ${çip}\n\n**Envanter**\n\nArabası: ${newcar} tane var\nEvi: ${newhouse} tane var\nSarayı: ${newsaray} tane var\nNormal PC'si: ${newnormalPc} tane var\nGamer PC'si: ${newgamerPc} tane var\nTelefonu: ${newtelefon} tane var`);
    message.channel.send(moneyEmbed)
  }
}
