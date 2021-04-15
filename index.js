const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const Database = require("@replit/database")
const db = new Database()
const client = new Discord.Client()
const config = require('./config.json')


const auth = "https://discord.com/oauth2/authorize?client_id=826698290312904715&permissions=4282379511&scope=bot"
var prefix = "n!" || "ninja"
var luck = Math.floor(Math.random()*10)
var coinArray = []
var userArray = []
var admin = ["samuraininja360#3847", "Ninja Spect#0959"]

function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
}

db.get("coins").then(coins => {
  if (!coins || coins.length < 1) {
    db.set("coins", coinArray)
  }
  for (i=0;i<coins.length;i++) {
    coinArray[i] = filterInt(coins[i])
  }
})
db.get("users").then(users => {
  if (!users || users.length < 1) {
    db.set("users", userArray)
  }
  userArray = users
})
function updateUsers(user) {
  db.get("users").then(users =>{
    users.push(user)
    db.set("users", users)
  }) 
}
function resetData() {
  coinArray = []
  db.set("coins", coinArray)
  userArray = []
  db.set("users", userArray)
}
function setUsers(array) {
  db.get("users").then(users => {
    db.set("users", array)
  })
}
function setCoins(array) {
  db.get("coins").then(coins => {
    db.set("coins", array)
  })
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
    db.get("coins").then(coins => {
      for (i=0;i<coins.length;i++) {
        //coinArray[i] = filterInt(coins[i])
      }
    })
    /*db.get("users").then(users => {
      userArray = users
    })*/
    if (command === "help") {
      msg.reply("Welcome to The Shroud Ninja\'s Arena!")
      msg.channel.send(`This game is still under development but you can still play!\nUse ${prefix}init to open your account; it saves your progress!\n\nUse ${prefix}beg to beg for money so you can purchase items and invest\nUse ${prefix}joblist to search for a job\nUse ${prefix}rob to rob someone\nUse ${prefix}buy to buy something from the shop\nThere are other fun Easter Egg commands for geeks ${prefix}avatar`)
    } else if (command === "hello") {
      if (params.length === 0) {
        msg.reply("Hello!")
      } else if (params[0] === "there") {
        msg.reply("Hello there!\nAre you still there?")
      } else if (params[0] === "jedi") {
        msg.reply("Hello young padawan, May the force be with you!\nActually I want to keep it to myself...")
      }
    } else if (command === "yeet") {
      msg.reply("Yeeeeet that!")
    } else if (command === "beg") {
      if (userArray.includes(msg.author.tag)) {
        luck = Math.floor(Math.random()*10)
      if (luck === 0) {
        msg.reply(`LOL! You got no coins. Imagine begging.`)
      } else if (luck === 1) {
        msg.reply(`You only got ${luck} coin`)
      } else {
        msg.reply(`You got ${luck} coins`)
      }
      for (i=0;i<userArray.length;i++) {
        if (msg.author.tag === userArray[i]) {
          coinArray[i]+=luck
          console.log(coinArray)
        }
      }
      setCoins(coinArray)
      db.get("coins").then(coins => {
        console.log(coins)
      })
      } else {
        msg.reply("You need to open an account with init")
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
      /*db.get("users").then(users => {
        if (!userArray.includes(msg.author.tag)) {
          updateUsers(msg.author.tag)
        }
      })*/
        if (!userArray.includes(msg.author.tag)) {
          userArray.push(msg.author.tag)
          msg.reply(userArray)
          setUsers(userArray)
          coinArray.push(100)
          setCoins(coinArray)
        } else {
          msg.reply("You're account has already been opened")
        }
    
      
    } else if (command === "reset") {
      if (msg.author.tag === admin[0]) {
        resetData()
      }
    } else if (command === "balance") {
      msg.reply(`Your wallet: ${coinArray[userArray.indexOf(msg.author.tag)]}`)
      if (!userArray.includes(msg.author.tag)) {
        msg.channel.send(`You probably need to use ${prefix}init to save your money`)
      }
    } else if (command === "money") {
      msg.reply(`${coinArray}`)
    } else if (command === "ligma") {
      msg.channel.send(`Ligma ${params[0]}! Imagine being ${params[0]} XD...`)
    } else if (command === "moneyrain") {
      if (msg.author.tag === admin[0]) {
        db.get("coins").then(coins => {
          if (!coins || coins.length < 1) {
            db.set("coins", coinArray)
          }
          for (i=0;i<coins.length;i++) {
            coinArray[i] = filterInt(coins[i])
          }
        })
        for (i=0;i<userArray.length;i++) {
          if (msg.author.tag === userArray[i]) {

            if (params.lenth<1) {
              return
            } else {
              coinArray[i] = filterInt(params[0])
            }
          }
        }
      }
      msg.reply(`${coinArray}`)
    } else if (command === "joblist") {
      msg.reply(`These are the available jobs: `)
      const joblist = new Discord.MessageEmbed()
        .setColor("#0064ff")
        .setTitle("Available Jobs")
        .setDescription("Pick one of the following jobs to start working and get a salary\nHigher paying jobs ususally have harder tasks to accompany\nthem! So choose wisely")
      msg.channel.send(joblist)
    }
    
  }
})

keepAlive()
client.login(process.env.TOKEN)
