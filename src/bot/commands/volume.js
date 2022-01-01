module.exports = {
    name: "volume",
    cooldown: 3,
    description: '*Adjust the music volume.*',
    aliases: ["vol", "v"],
    run: async function(client, message, args, user) {
        try {
            const distube = client.distube;
            const { MessageEmbed } = require('discord.js');
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `You have to be in a voice channel to use this command!`,
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
            if (!args.length) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `Please type the volume level.`,
                        color: 0xF70000
                    }
                });
                return
            }
            if (isNaN(args[0])) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `The volume level must be a number!`,
                        color: 0xF70000
                    }
                });
                return
            }
            let queue = distube.getQueue(message);
            if (!queue) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `The server queue is empty, please play a song first.`,
                        color: 0xF70000
                    }
                });
                return
            }
            distube.setVolume(message, args[0]);
            message.channel.send(
                new MessageEmbed()
                .setColor('#0505e7')
                .setTitle(`🔊 | Volume level has been set to \`${args[0]}\``)
            )
        } catch (err) {
            console.log(err)
        }
    }
};