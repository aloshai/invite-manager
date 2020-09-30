const Discord = require("discord.js");
const Database = require("../Helpers/Database");

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {
    const db = new Database("./Servers/" + message.guild.id, "Invites");
    var victim = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    var data = db.get(`invites.${victim.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 };
    var embed = new Discord.MessageEmbed()
    .setDescription(`You have **${(data.total || 0) + (data.bonus || 0)}** invites! (**${data.regular || 0}** regular, **${data.bonus || 0}** bonus, **${data.leave || 0}** leaves, **${data.fake || 0}** fake)`)
    .setColor("RANDOM");
    message.channel.send(embed);
};

exports.conf = {
    commands: ["me"],
    usage: "[p]me",
    enabled: true,
    guildOnly: true
};
