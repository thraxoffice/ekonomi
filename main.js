const Discord = require('discord.js')
const { JSON } = require('odies.database');
const db = new JSON('database')
const client = new Discord.Client()
const { DiscordClient } = require('odies.handlers');


client.emojiler = {
    // KULLANIMI `${client.emojis.cache.get(client.emojiler.tik)}`

    // GENEL EMOJİLER //
    tik: "774039712679198722", //Tik işareti
    x: "774006790282674198", //Çarpı işareti
}

let dosyaKomut = './komutlar'
let dosyaEvent = false
let prefix = '!'
let ownerIDs = ["691409317714198559"]
let token = ''

const odies = new DiscordClient(client, dosyaKomut, prefix, ownerIDs ,{ dosyaEvent })
odies.DiscordLoginFunction()

let etiketPrefix = true;

client.on("message", async (message) => {
    odies.messages(message, { etiketPrefix })
})

client.login(token)