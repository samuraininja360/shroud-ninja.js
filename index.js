const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const Database = require("@replit/database")
const db = new Database()
const client = new Discord.Client()
const config = require('./config.json')


const auth = "https://discord.com/oauth2/authorize?client_id=826698290312904715&permissions=4282379511&scope=bot"
var prefix = "n."
var luck = Math.floor(Math.random()*10)
var coinArray = []
var userArray = []
var xpArray = []
var extraArray = [[],[],[],[],[],[],[],]
var admin = ["samuraininja360#3847", "Ninja Spect#0959"]
var multiplier = 50
var jobs = [["Bartender",0,50,5],["Salesman",0,75,20],]
var stuff = ["alcoholic", "aarya is amazing", "pink phallics", "obnoxious", "psuedonym", "argumentative", "racecar", "answer", "sllab amgil i", "lactose"]
var word = undefined
var answer = undefined
var tick = 0

function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
}

function update() {
  tick+=1
  setTimeout(update, 1000)
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
db.get("xp").then(xp => {
  if (!xp || xp.length < 1) {
    db.set("xp", xpArray)
  }
  xpArray = xp
})
db.get("extra").then(extra => {
  if (!extra || extra.length < 1) {
    db.set("extra", extraArray)
  }
  extraArray = extra
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
  xpArray = []
  db.set("xp", xpArray)
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
function setXp(array) {
  db.get("xp").then(xp => {
    db.set("xp", array)
  })
}
function setExtra(array) {
  db.get("extra").then(extra => {
    db.set("extra", array)
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
    if (word) {
      if (false) {
        
      }
    }
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
      multiplier = Math.round(xpArray[userArray.indexOf(msg.author.tag)]/10)
      console.log(multiplier)
      if (userArray.includes(msg.author.tag)) {
        luck = Math.floor(Math.random()*multiplier)
      if (luck === 0) {
        const bad = new Discord.MessageEmbed()
          .setColor("#ff0032")
          .setTitle("Ha Shame!")
          .setDescription(`You got no coins. Imagine Begging LOL`)
        msg.reply(bad)
      } else if (luck === 1) {
        const ok = new Discord.MessageEmbed()
          .setColor("#0064ff")
          .setTitle("Better than nothing...")
          .setDescription(`You only got ${luck} coin\nThis is your new balance ${coinArray[userArray.indexOf(msg.author.tag)]+luck}`)
        msg.reply(ok)
      } else {
        const success = new Discord.MessageEmbed()
          .setColor("#00b428")
          .setTitle("What a miracle!")
          .setDescription(`You got ${luck} coins\nThis is your new balance: ${coinArray[userArray.indexOf(msg.author.tag)]+luck}`)
        msg.reply(success)
      }
      for (i=0;i<userArray.length;i++) {
        if (msg.author.tag === userArray[i]) {
          coinArray[i]+=luck
          console.log(coinArray)
        }
      }
      xpArray[userArray.indexOf(msg.author.tag)] += (Math.floor(Math.random()*10))-5
      setCoins(coinArray)
      db.get("coins").then(coins => {
        console.log(coins)
      })
      console.log(luck)
      } else {
        msg.reply("You need to open an account with init")
      }
    } else if (command === "users") {
      db.get("users").then(users => {
        if (true) {
          msg.reply(`Users: ${users}`)
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
          const success = new Discord.MessageEmbed()
            .setColor("#00b428")
            .setTitle("Success!")
            .setDescription(`Your account was successfuly created!\nNow you can save your coins and use all commands!`)
          msg.reply(success)
          setUsers(userArray)
          coinArray.push(100)
          setCoins(coinArray)
          xpArray.push(100)
          setXp(xpArray)
          extraArray.push([])
          setExtra(extraArray)
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
        .setDescription("Pick one of the following jobs to start working and get a salary\nHigher paying jobs ususally have harder tasks to accompany\nthem! So choose wisely...")
        .addField("How to work", `Use ${prefix}work to collect your work salary!`)
        .setFooter("Get that blue collar on!")
      for (i=0;i<jobs.length;i++) {
          let temp = jobs[i]
          joblist.addField(temp[0],`Daily salary: ${temp[1]}, Work salary: ${temp[2]}`)
      }
      msg.channel.send(joblist)
      for (i=0;i<jobs.length;i++) {
        let temp = jobs[i]
        if (temp[0] === params[0]) {
          let target = extraArray[userArray.indexOf(msg.author.tag)]
          target[0] = params[0]
          setExtra(extraArray)
        }
      }
    } else if (command === "xp") {
      msg.reply(`Player experience points: ${xpArray}`)
      db.get("xp").then(xp => {
        console.log(xp)
      })
    } else if (command === "work") {
      word = stuff[Math.floor(Math.random()*10)]
      answer = word.split(" ").reverse().join(" ")
      let info = extraArray[userArray.indexOf(msg.author.tag)]
      let job = 0
      if (info[0]) {  
        msg.reply(`Type this word backwards: ${word}`)
      }
      msg.reply(`Here is your hourly payment:`)
      coinArray[userArray.indexOf(msg.author.tag)] += 0
    } else if (command === "profile") {
      let target = extraArray[userArray.indexOf(msg.author.tag)]
      let experience = xpArray[userArray.indexOf(msg.author.tag)]
      let username = userArray[userArray.indexOf(msg.author.tag)]
      const profile = new Discord.MessageEmbed()
        .setColor("#0064ff")
        .setTitle(`${username.substr(0,username.length-5)}`)
        .setDescription(`Occupation: ${target[0]}\nLevel: ${experience}xp`)
      msg.reply(profile)
    } else if (command === "ids") {
      msg.reply(extraArray)
    }
    
  }
})

update()
keepAlive()
client.login(process.env.TOKEN)
