module.exports = {
    name: "filter",
    cooldown: 3,
    description: `*Filters for all the songs the bot can play. You can choose from **3d, bassboost, echo, karaoke, nightcore and vaporwave!***`,
    aliases: ["f"],
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
            if (!args.length) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `Please type the filter name after the command!
                        *Filters:*
                         ***3d** | **bassboost** | **echo** |  **karaoke** | **nightcore** | **vaporwave***`,
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
            distube.setFilter(message, args[0]);
            message.channel.send(
                new MessageEmbed()
                .setAuthor(`🎭 | Filters`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                .setColor('#0505e7')
                .setDescription(`🎭 | filter has been changed to \`${args[0]}\``)
                .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            )
        } catch (err) {
            console.log(err)
        }
    }
};