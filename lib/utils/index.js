import fs from 'node:fs';
import ora from 'ora';
import chalk from 'chalk';
import config from '././config/index';

const {deployConfigPath} = config;

export default {
   // 检查部署配置文件是否存在
   checkDeployConfigExists: () => {
    return fs.existsSync(deployConfigPath)
  },
  // 日志信息
  log: (message) => {
    console.log(message)
  },
  // 成功信息
  succeed: (...message) => {
    ora().succeed(chalk.greenBright.bold(message))
  },
  // 提示信息
  info: (...message) => {
    ora().info(chalk.blueBright.bold(message))
  },
  // 错误信息
  error: (...message) => {
    ora().fail(chalk.redBright.bold(message))
  },
  // 下划线重点信息
  underline: (message) => {
    return chalk.underline.blueBright.bold(message)
  }
}