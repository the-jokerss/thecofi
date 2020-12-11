const Discord = require('discord.js');//sa marabalar
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const YouTube = require("simple-youtube-api");
const queue = new Map();
const ffmpeg = require("ffmpeg"); //bura
const express = require("express");

const ytdl = require("ytdl-core");
const db = require('quick.db');
const http = require('http');

require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');



const app = express();
var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
  let permlvl = 0;
  if (message.member.permissions.has("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner) permlvl = 4;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });


client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


//-------------KOMUTLAR-------\\

client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})

//reklam


//kick


///spamke


//_____________________________

client.on("message", async (message, guild) => {
if(message.author.bot === true) return
  var miranafk = db.get(`kullanicilar.${message.author.id}.afk`);
  if (!miranafk) return;
  var afkb = JSON.parse(miranafk);
  if (new Date().getTime() - afkb.zaman < 1000) return;
  db.delete(`kullanicilar.${message.author.id}.afk`);
  var süre = new Date().getTime() - afkb.zaman;

    var sürem = moment
      .duration(süre)
      .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
    message.channel.send(
      " | AFK modundan ayrıldınız. <@" +
        message.author.id +
        ">. Afk kaldığın süre:** " +
        sürem +
        "**"
    );

});
//
client.on("message", async (message, guild) => {
  let etiket = message.mentions.users.first();
  if (!etiket) return;
  var afaka = db.fetch(`kullanicilar.${etiket.id}.afk`);
  if (!afaka) return;
  var afk = JSON.parse(afaka);
  if (!afk) return;
  var süre = new Date().getTime() - afk.zaman;
    var sürem = moment
      .duration(süre)
      .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
    if (afk) {
      return message.channel.send(
        `**${etiket.tag}** adlı kullanıcı **${sürem}**dir **${afk.sebep}** sebebiyle afk!`
      );
    }
  

});
//////////////////////////////BotAtack/////////////////////////////////////////////////

client.on('guildMemberAdd', async (member) => {
  let a = await db.fetch(`r_${member.guild.id}`)
  if (a) {
    const guild = member.guild;


 let channels = member.guild.channels.cache.find(c => c.name === 'kanal adı')

    if(member.user.bot !==true){

    } 
    else {

    channels.send(`Sunucumza Bot Geldıgı Icın Banlandı`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
    }
  }  
  });
//// KÜFÜR
client.on("message", async message => {
  
  const lus = await db.fetch(`küfür_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["amk", "oç", "orrrrrrrrrrr"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('Hey Dur! Bu Sunucuda Küfür Engelliyorum').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});
client.on("messageUpdate", async message => {
  
  const lus = await db.fetch(`küfür_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["amk", "oç", "orrrrrrrrrrr"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('Hey Dur! Bu Sunucuda Küfürü Engelliyorum').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});
//modlog 
client.on("messageDelete", async message => {
  let a = await db.fetch(`modlog_${message.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Mesaj Silindi')
    .setDescription(` **${message.author.tag}** a ait **${message.content}** adlı mesajı silindi`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})
client.on("channelDelete", async channel => {
  let a = await db.fetch(`modlog_${channel.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Kanal Silindi')
    .setDescription(`**${channel.name}** Adlı Kanal Silindi!`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})
client.on("channelCreate", async channel => {
  let a = await db.fetch(`modlog_${channel.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Kanal Oluşturuldu')
    .setDescription(`**${channel.name}** Adlı Kanal Oluşturuldu!`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})
//sa as
client.on("message", async message => {
  let a = await db.fetch(`saas_${message.guild.id}`)
  if (a) {
      if (message.content.toLowerCase() === "sa") {
        message.channel.send(
new Discord.MessageEmbed()
          .setDescription(`Aleyküm Selam Hoşgeldin!`)
)
      }
  }
  
  
})
/////Rol Koruma


client.on("guildMemberAdd", async member => {
  const miktar = await db.fetch(`sayacMiktar_${member.guild.id}`);
  const kanalID = await db.fetch(`sayacKanal_${member.guild.id}`);
  if (!miktar || miktar == null) return;
  if (!kanalID || kanalID == null) return;
  const kanal = member.guild.channels.cache.get(kanalID);
  const guildMemberSize = member.guild.members.cache.size;
  if (guildMemberSize >= miktar) {
    await db.delete(`sayacMiktar_${member.guild.id}`);
    await db.delete(`sayacKanal_${member.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        `Tebrikler ${member.user.tag} ile sunucudaki hedefimiz olan ${miktar} Üyeyi geçtik.`
      )
      .setFooter(
        `${client.user.username} Sayaç sistemi.`,
        member.guild.iconURL({ dynamic: true })
      )
      .setTimestamp();
    kanal.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        ` ${
          member.user.tag
        } Sunucumuza Hoş Geldin.Geldiğine Çok Sevindik :slight-smile: Seninle Birlikte Tam ${guildMemberSize} Kişi Olduk. ${miktar} Kişi Olmaya  ${miktar -
          guildMemberSize} Kişi Kaldı. `
      )
      .setFooter(
        `${client.user.username} Sayaç sistemi.`,
        member.guild.iconURL({ dynamic: true })
      )
      .setTimestamp();
    kanal.send(embed);
  }
});
client.on("guildMemberRemove", async member => {
  const miktar = await db.fetch(`sayacMiktar_${member.guild.id}`);
  const kanalID = await db.fetch(`sayacKanal_${member.guild.id}`);
  if (!miktar || miktar == null) return;
  if (!kanalID || kanalID == null) return;
  const kanal = member.guild.channels.cache.get(kanalID);
  const guildMemberSize = member.guild.members.cache.size;

  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(
      `${
        member.user.tag
      } Sunucumuzdan ayrıldığını Gördük :slight_frown: . Toplam ${guildMemberSize} Kişi Kaldık. ${miktar} Kişi Olmaya ${miktar -
        guildMemberSize} Kişi Kaldı . `
    )
    .setFooter(
      `${client.user.username} Sayaç sistemi.`,
      member.guild.iconURL({ dynamic: true })
    )
    .setTimestamp();
  kanal.send(embed);
});

  
client.on("guildCreate", guild => {
  let ber1_kanal = client.channels.get("781937669105385582")

 const ber1 = new Discord.RichEmbed()
.setTitle("SUNUCUYA EKLENDİM")
.setColor("GREEN")
.addField(':black_small_square: Sunucu İsmi', `\`${guild.name}\``)
.addField(':black_small_square: Üye Sayısı', `\`${guild.members.size}\``)
.addField(':black_small_square: Kurucu', `\`${guild.owner.user.tag}\``)
ber1_kanal.send(ber1_kanal)
});

client.on("guildDelete", guild => {
  let ber1_kanal = client.channels.get("781937669105385582")

 const ber1 = new Discord.RichEmbed()
.setTitle("SUNUCUDAN AYRILDIM")
.setColor("RED")
.addField(':black_small_square: Sunucu İsmi', `\`${guild.name}\``)
.addField(':black_small_square: Üye Sayısı', `\`${guild.members.size}\``)
.addField(':black_small_square: Kurucu', `\`${guild.owner.user.tag}\``)
ber1_kanal.send(ber1)
});

//////////////afk
client.on("message", async message => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  let kullanıcı = message.mentions.users.first() || message.author;
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`);
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`);
  let sebep = afkkullanıcı;

  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.reply(``);
      db.delete(`afk_${message.author.id}`);
      message.member.setNickname("");
      message.reply(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`);
    }
    if (afkkullanıcı)
      return message.channel.send(
        `**${kullanıcı.tag}** \`${sebep}\` Sebebiyle Afk!`
      );
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.reply(`Artık AFK Değilsin <a:dikkat:707520390242631804>`);
      db.delete(`afk_${message.author.id}`);
      message.member.setNickname("");
    }
  }
});
client.on("message", async (msg, user) => {
  const request = require("node-superfetch");
  const db = require("quick.db");
  const ms = require("parse-ms");
  let zaman = db.fetch(`${msg.guild.id}.slowmode`);
  if (zaman === undefined) zaman = 0;
  let timeout = zaman;
  let darkcode = await db.fetch(`slowmodee_${msg.author.id}`);

  if (darkcode !== null && timeout - (Date.now() - darkcode) > 0) {
    let time = ms(timeout - (Date.now() - darkcode));
    msg.delete();
    msg.channel
      .send("**Bu kanalda yavaş mod açık mesaj atmadan beklemen gerek!**")
      .then(message => message.delete(2000));
  } else {
    if (msg.content.length > 0) {
      db.set(`slowmodee_${msg.author.id}`, Date.now());
    }
  }
});
client.on("guildMemberAdd", async member => {
  let isim = db.fetch(`otoisim_${member.guild.id}`)
if (!isim) return;
member.setNickname(isim)
})
client.on('ready', ()=>{
client.channels.cache.get('738660198310477845').startTyping()
}) //CodeWork @MEKANIN SAHİBİ
client.on('ready', ()=>{
client.channels.cache.get('779040786368430120').startTyping()
}) //CodeWork @MEKANIN SAHİBİ
client.on('ready', ()=>{
client.channels.cache.get('779709928675868714').startTyping()
}) //CodeWork @MEKANIN SAHİBİ