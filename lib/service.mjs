// import fs from 'node:fs'
// import program from 'commander'
// import config from './config/index';
// import { fileURLToPath } from 'node:url';
// import { dirname as pathDirname } from 'node:path';


// export function filename(importMeta) {
//   return importMeta.url ? fileURLToPath(importMeta.url) : '';
// }

// export function dirname(importMeta) {
//   return pathDirname(filename(importMeta));
// }


// console.log('filename ', filename);

// // 设置默认命令
// const setupDefaultCommands = () => {
//   program.version(config.packageInfo.version, '-v, --version', '输出当前版本号')
//   program.helpOption('-h, --help', '获取帮助')
//   program.addHelpCommand(false)
// }

// // 注册命令
// const registerCommands = () => {
//   const commandsPath = `${dirname()}/commands`

//   const idToPlugin = (id) => {
//     const command = import(`${commandsPath}/${id}`)
//     const commandName = id.split('.')[0]
//     const alias = id.charAt(0)

//     if (commandName === 'deploy') {
//       program
//         .command(commandName)
//         .description(command.description)
//         .alias(alias)
//         .option('-m, --mode <mode>', 'setup deploy mode')
//         .action((options) => {
//           command.apply(options.mode)
//         })
//     } else {
//       program
//         .command(commandName)
//         .description(command.description)
//         .alias(alias)
//         .action(() => {
//           command.apply()
//         })
//     }
//   }

//   fs.readdirSync(`${commandsPath}`).forEach(idToPlugin)
// }


export default {
  name: '123'
}


// export default class Service {
  
// }

// export default  {
//   int: ()=> {
//     setupDefaultCommands()
//     registerCommands()
//   },

//   run: (_id, _args = {}, rawArgv = []) =>{

//     program.parse(rawArgv, { from: 'user' })
//   }
// }
