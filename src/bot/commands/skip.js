module.exports = {
        name: "skip",
        cooldown: 3,
        description: '*Skips the current song in the queue.*',
        aliases: ["s"],
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
                    distube.skip(message);
                    message.channel.send(
                            new MessageEmbed()
                            .setColor('#0505e7')
                            .setDescription(`⏭ | ${queue.songs.map((song, id) =>
        `**[${song.name}](${song.url})**`).slice(0, 1).join("\n")} has skiped to ${queue.songs.map((song, id) =>
        `**[${song.name}](${song.url})**`).slice(1, 2).join("\n")}`)
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
        )
    } catch (err) {
        console.log(err)
    }
}
}