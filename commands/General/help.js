const djs = require("@discordjs/collection")
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../../config')
let { fancytext,botpic,tlang,tiny } = require("../../lib");
 
module.exports = {
    name: "help",
    alias: ["h", "cmd", "menu"],
    category: "general",
    async exec(citel, Void, args) {
        if (args.join(' ')) {
            const data = [];
            const name = args[0].toLowerCase();
            const { commands, prefix } = djs;
            console.log(name)
            const cmd = commands.get(name) || commands.find((cmd) => cmd.alias && cmd.alias.includes(name));
            if (!cmd || cmd.category === "private") return await citel.reply("*❌No Such commands.*");
            else data.push(`*🍁Command:* ${cmd.name}`);
            if (cmd.alias) data.push(`*🔰Alias:* ${cmd.alias.join(', ')}`);
            if (cmd.desc) data.push(`*🧩Description:* ${cmd.desc}`);
            if (cmd.use) data.push(`*〽️Usage:* \`\`\`${prefix}${cmd.name} ${cmd.use}\`\`\`\n\nNote: [] = optional, | = or, <> = must filled`);

            return await citel.reply(data.join('\n'));
        } else {
            const { prefix, commands } = djs;
            const cmds = commands.keys()
            let category = [];

            for (let cmd of cmds) {
                let info = commands.get(cmd);
                if (!cmd) continue;
                if (!info.category || info.category === 'private') continue;
                if (Object.keys(category).includes(info.category)) category[info.category].push(info);
                else {
                    category[info.category] = [];
                    category[info.category].push(info);
                }
            }
let str = `╔══✤ ❲ `+ fancytext(Config.ownername.split(' ')[0],58) +` ❳ ═══✤`     
str+=
`
║ *Hello, ${citel.pushName}*
║ *This is ${tlang().title}*
║ *A whatsapp bot developed*
║ *by ${Config.ownername}*
║ 𝙼𝚢 𝚞𝚜𝚊𝚋𝚕𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜 𝚊𝚛𝚎
║ 𝚕𝚒𝚜𝚝𝚎𝚍 𝚋𝚎𝚕𝚘𝚠
╚══════════════✤\n`
            const keys = Object.keys(category);
 str += `╔══✤『 `+ fancytext('Commands',57)+`』══◆`
for (const key of keys) {       
str += `
║┌─────────────◆
║│ ⦿---- ${tiny(key)} ----⦿
║└┬────────────◆
║┌┤ ${category[key].map((cmd, idx) =>`
║│ ✠ ${idx + 1}. `+`${cmd.name}`)}
║└─────────────◆`
            }
str += `\n╚══════════════✤\n`
str += `_🔖Send ${prefix}help <command name> to get detailed information of specific command._\n*📍Eg:* _${prefix}help anime_`;
            let generatebutton = [{
					buttonId: `${prefix}owner`,
					buttonText: {
						displayText: 'Owner'
					},
					type: 1
				},{
					buttonId: `${prefix}list`,
					buttonText: {
						displayText: 'List Menu'
					},
					type: 1
				}
				]
				let buttonMessaged = {
					image: { url: await botpic() },
					caption: str,
					footer: tlang().title,
					headerType: 4,
				 buttons: generatebutton
				};
				await Void.sendMessage(citel.chat, buttonMessaged, {
					quoted: citel,
				});
        }
    }
}
