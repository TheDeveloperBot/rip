exports.run = async (beta, message, args, level) => {
  const { Canvas } = require('canvas-constructor')
  const snek = require('snekfetch')
  const fsn = require('fs-nextra')

  const getBeautiful = async (person) => {
    const plate = await fsn.readFile('./assests/images/rip.png')
    const png = person.replace(/\.gif.+/g, '.png')
    const { body } = await snek.get(png)
    return new Canvas(634, 675)
        .setColor("#000000")
        .addRect(0, 0, 634, 675)
        .addImage(body, 423, 45, 168, 168)
        .addImage(body, 426, 382, 168, 168)
        .addImage(plate, 0, 0, 634, 675)
        .toBuffer()
  }

  try {
    const beautiful = message.mentions.users.first()
    const msg = await message.channel.send('Admiring the painting... ``[make sure that you tag someone or it will not work]``')
    const result = await getBeautiful(beautiful.avatarURL)
    await message.channel.send({ files: [{ attachment: result, name: 'rip.jpg' }] }).then(file => console.log(file))
    await msg.delete()

    await msg.delete()
  } catch (error) {
    console.log(error)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['?beauty', '?bt'],
  permLevel: 'User'
}

exports.help = {
  name: '?rip',
  category: 'Fun',
  description: 'tell someone his beautiful',
  usage: 'beautiful <mention | user id> '
}
