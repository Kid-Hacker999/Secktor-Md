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
            if (!cmd || cmd.category === "private") return await citel.reply("*βNo Such commands.*");
            else data.push(`*πCommand:* ${cmd.name}`);
            if (cmd.alias) data.push(`*π°Alias:* ${cmd.alias.join(', ')}`);
            if (cmd.desc) data.push(`*π§©Description:* ${cmd.desc}`);
            if (cmd.use) data.push(`*γ½οΈUsage:* \`\`\`${prefix}${cmd.name} ${cmd.use}\`\`\`\n\nNote: [] = optional, | = or, <> = must filled`);

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
let str = `ββββ€ β² `+ fancytext(Config.ownername.split(' ')[0],58) +` β³ ββββ€`     
str+=
`
β *Hello, ${citel.pushName}*
β *This is ${tlang().title}*
β *A whatsapp bot developed*
β *by ${Config.ownername}*
β πΌπ’ ππππππ ππππππππ πππ
β ππππππ πππππ 
ββββββββββββββββ€\n`
            const keys = Object.keys(category);
 str += `ββββ€γ `+ fancytext('Commands',57)+`γβββ`
for (const key of keys) {       
str += `
ββββββββββββββββ
ββ β¦Ώ---- ${tiny(key)} ----β¦Ώ
βββ¬βββββββββββββ
βββ€ ${category[key].map((cmd, idx) =>`
ββ β  ${idx + 1}. `+`${cmd.name}`)}
ββββββββββββββββ`
            }
str += `\nββββββββββββββββ€\n`
str += `_πSend ${prefix}help <command name> to get detailed information of specific command._\n*πEg:* _${prefix}help anime_`;
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
