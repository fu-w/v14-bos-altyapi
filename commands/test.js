const {EmbedBuilder} = require("discord.js");


module.exports.run = async(client, message, args) => {


let embed =new EmbedBuilder()
.setColor("Red")
.setDescription(`Komut Çalışıyor`)


message.reply({embeds :[embed]})
}
exports.conf = {
    aliases: ["test", "bu şekilde ekleyerk daha fazla komut koyabilirsiniz"],
    permLevel: 0,
  };
  exports.help = {
    name: 'test',
     description: 'test',
    usage: 'test'
  };