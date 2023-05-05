/*
 * @Author: qiye
 * @LastEditors: qiye
 * @description: page description
 * @Date: 2023-04-24 16:10:24
 * @LastEditTime: 2023-05-05 16:44:49
 */
import fs from 'node:fs'
import program from 'commander';
import config from './config/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 设置默认命令
const setupDefaultCommands = () => {
  program.version(config.packageInfo.version, '-v, --version', '输出当前版本号')
  program.helpOption('-h, --help', '获取帮助')
  program.addHelpCommand(false)
}

// 注册命令
const registerCommands = async () => {
  const commandsPath = `${__dirname}/commands`
  console.log('registerCommands ....');

  const idToPlugin = async (id) => {
    

    let command = null;
    try {
      command = (await import(`file://${commandsPath}/${id}`)).default;
      console.log('command.default ', command);
      const commandName = id.split('.')[0];
      const alias = id.charAt(0);
    
      if (commandName === 'deploy') {
        program
          .command(commandName)
          .alias(alias)
          .option('-m, --mode <mode>', 'setup deploy mode')
          .action((options) => {
           
            command.apply(options.mode)
          })
          .description(command.description)
      } else {
        program
          .command(commandName)
          .alias(alias)
          .action(() => {
            command.apply()
          })
          .description(command.description)
      }


      console.log('idToPlugin finish ');
    } catch (error) {
      console.log('idToPlugin error ', error);
    }
  }
  const files = fs.readdirSync(`${commandsPath}`);
  for(const file of files){
    await idToPlugin(file);
  }
}
class Service {
  async init(){
    setupDefaultCommands()
    await registerCommands()
  }
  async run(_id, _args = {}, rawArgv = []) {
    await this.init();

    // console.log('program ', program);

    // console.log('rawArgv ', rawArgv);
    program.parse(rawArgv, { from: 'user' })
  }

}
export default Service;


