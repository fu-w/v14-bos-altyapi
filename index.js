//Mainimiz Bura Bura Olmazsa Bot Çalışmaz
//discord.gg/turkiyecode

const {ButtonBuilder ,EmbedBuilder, SelectMenuBuilder, AttachmentBuilder , Client, GatewayIntentBits , Collection , Partials  } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment")
const fs = require("fs")
const path = require('path')
const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });
const {token} = require("./tokenler.json");
const ayarlar = require("./config.json");
require('./eventler')(client);
//------- Hazır Kısmı ------//
client.on("ready", ()=>{

console.log("Bot Başarıyla Aktif Oldu Kanka")
client.user.setActivity("f?komutyok daha")
client.user.setStatus("idle")

})


//------- Komut İşleme ---------//

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  };
  
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
      let props = require(`./commands/${f}`);
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
        delete require.cache[require.resolve(`./commands/${command}`)];
        let cmd = require(`./commands/${command}`);
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
        let cmd = require(`./commands/${command}`);
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
        delete require.cache[require.resolve(`./commands/${command}`)];
        let cmd = require(`./commands/${command}`);
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



client.login(token);