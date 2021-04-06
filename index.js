const Discord = require("discord.js")
const client = new Discord.Client()
var prefix = "ninja."
var luck = Math.floor(Math.random()*10)
var inventory = [[100000000,["sniper","katana","nuclear bomb","id"]],[0,["id",]]]
var users = ["samuraininja360#",]

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === `${prefix}hello`) {
    msg.reply("Hello!")
  }
  if (msg.content === `${prefix}yeet`) {
    msg.reply("Yeeeeet that!")
  }
  if (msg.content === `${prefix}beg`) {
    luck = Math.floor(Math.random()*10)
    if (luck === 0) {
      msg.reply(`LOL! You got no coins. Imagine begging.`)
    } else if (luck === 1) {
      msg.reply(`You only got ${luck} coin`)
    } else {
      msg.reply(`You got ${luck} coins`)
    }
  }
  if (msg.content === `${prefix}help`) {
    msg.reply("Welcome to The Shroud Ninja\'s Arena!")
    msg.channel.send("This game is still under development but you can still play!")
    msg.channel.send(`Use ${prefix}beg to beg for money so you can purchase items and invest`)
    msg.channel.send(`Use ${prefix}joblist to search for a job`)
    msg.channel.send(`Use ${prefix}rob to rob someone`)
    msg.channel.send(`Use ${prefix}buy to buy something from the shop`)
  }
})

client.login(process.env.TOKEN)
