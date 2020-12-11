const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
   if(!message.member.roles.cache.has('738665156522934303')) return message.channel.send('Bu komutu kullanabilmek için <@&738665156522934303> Rolüne Sahıp Olmalısınız')
   let member = message.mentions.users.first() 
   if(!member) {
       return message.channel.send('Bir kişi etiketlemelisin')
   }
   let erkek = message.guild.roles.cache.find(s => s.name === 'Kız')
   
   
   
   let kayıtsız = message.guild.roles.cache.find(r => r.name === 'Kayıtsız')
   let tag = args[1]
   let kayıt = message.guild.member(member)
   let isim = args[2]
   let yas = args[3]

   if(!isim) return message.channel.send('İsim belirtmelisin')
   if(isNaN(yas)) return message.channel.send('Yaş belirtmelisin')

   kayıt.setNickname(`${isim} ・ ${yas}`)
  
   kayıt.roles.add(erkek)
  
   kayıt.roles.remove(kayıtsız)
  
   let embed = new Discord.MessageEmbed()
   .setColor('PİNK')
   .setTitle('Kayıt Başarılı')
   .addField('Kayıt edilen kullanıcı',member)
   .addField('Adı ;', isim)
   .addField('Yaşı ;', yas)
   .addField('Kayıt eden yetkili', message.author)
  message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['k'],
    permlevel: 0
};

exports.help = {
    name: "kız"
}