module.exports = {
    name: "leave",
    cooldown: 3,
    description: '*Leaves the Voice Channel.*',
    aliases: [],
    run: async function(client, message, args, user) {
        try {
            const distube = client.distube;
            const { MessageEmbed } = require('discord.js');
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `you have to be in a voice channel to use this command`,
                        color: 0xF70000
                    }
                });
                return
            }
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `The bot needs the same permissions to play a music like \`CONNECT\`, \`SPEAK\``,
                        color: 0xF70000
                    }
                });
                return
            }
            voiceChannel.leave();
            message.channel.send(
                new MessageEmbed()
                .setColor('#0505e7')
                .setDescription(`🗃️ | I have left <#${voiceChannel.id}>`)
            )
        } catch (err) {
            console.log(err)
        }
    }
};