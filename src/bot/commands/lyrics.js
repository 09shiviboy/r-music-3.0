module.exports = {
    name: "lyrics",
    cooldown: 3,
    description: '*Get the lyrics for the current song.*',
    aliases: ["l"],
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
            let name = queue.songs.map((song, id) => song.name).slice(0, 1).join("\n");
            let thumbnail = queue.songs.map((song, id) => song.thumbnail).slice(0, 1).join("\n");
            let url = queue.songs.map((song, id) => song.url).slice(0, 1).join("\n");
            var lyrics = await require('lyrics-finder')("", name) || "None Found!";
            message.channel.send(
                new MessageEmbed()
                .setAuthor(`📑 | Lyrics`, thumbnail, url)
                .setColor('#0505e7')
                .setThumbnail(thumbnail)
                .setDescription(lyrics)
                .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            )
        } catch (err) {
            console.log(err)
        }
    }
};