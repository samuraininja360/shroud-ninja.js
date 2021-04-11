const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const Database = require("@replit/database")
const db = new Database()
const client = new Discord.Client()
const config = require('./config.json')


const auth = "https://discord.com/oauth2/authorize?client_id=826698290312904715&permissions=4282379511&scope=bot"
var prefix = "n! "
var luck = Math.floor(Math.random()*10)
var coins = [100000000,100,100]
var userArray = []

db.get("users").then(users => {
  if (!users || users.length < 1) {
    db.set("users", userArray)
  }
})
function updateUsers(user) {
  db.get("users").then(users =>{
    users.push([user])
    db.set("users", users)
  }) 
}
function resetData() {
  db.set("users", userArray)
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", msg => {
  if (msg.author.bot) {
    return
  }
  if (msg.content.startsWith(prefix)) {
    const params = msg.content.slice(prefix.length).trim().split(/ +/)
    const command = params.shift().toLowerCase()
    console.log(command)
    console.log(params)
    if (command === "help") {
      msg.reply("Welcome to The Shroud Ninja\'s Arena!")
      msg.channel.send(`This game is still under development but you can still play!\nUse ${prefix}beg to beg for money so you can purchase items and invest\nUse ${prefix}joblist to search for a job\nUse ${prefix}rob to rob someone\nUse ${prefix}buy to buy something from the shop`)
    } else if (command === "hello") {
      if (params.length === 0) {
        msg.reply("Hello!")
      } else if (params[0] === "there") {
        msg.reply("Hello there!\nAre you still there?")
      }
    } else if (command === "yeet") {
      msg.reply("Yeeeeet that!")
    } else if (command === "beg") {
      luck = Math.floor(Math.random()*10)
      if (luck === 0) {
        msg.reply(`LOL! You got no coins. Imagine begging.`)
      } else if (luck === 1) {
        msg.reply(`You only got ${luck} coin`)
      } else {
        msg.reply(`You got ${luck} coins`)
      }
      for (i=0;i<users.length;i++) {
        if (msg.author === users[i]) {
          coins[i]+=luck
          console.log(coins)
        }
      }
    } else if (command === "users") {
      msg.reply(`Users:`)
      db.get("users").then(users => {
        if (true) {
          msg.reply(users)
        }
      })
    } else if (command === "avatar") {
      if (!msg.mentions.users.size) {
		    return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
	    }
      const avatarList =  msg.mentions.users.map(user => {
        return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
      });

      // send the entire array of strings as a message
      // by default, discord.js will `.join()` the array with `\n`
      msg.channel.send(avatarList);
    } else if (command === "init") {
      db.get("users").then(users => {
        console.log(users.includes(msg.author.tag))
        if (users.includes(msg.author.tag)) {
          msg.reply(`You have already synchronized your account`)
        } else {
          updateUsers(msg.author.tag)
        }
      })
    } else if (command === "reset") {
      resetData()
    }
  }
})

keepAlive()
client.login(process.env.TOKEN)
